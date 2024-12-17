import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/lib/queries/articles.query";
import { Post, PostsData, PostsVars } from "@/lib/types/articles";
import { Skeleton } from "../ui/skeleton";
import LazyImage from "../ui/lazy-image";
import Link from "next/link";
import AnimateOnce from "../common/AnimateOnce";
import Title from "../common/Title";
import ArticleCard from "./ArticleCard";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import SubscribeToNewsLetter from "../common/SubscribeToNewsLetter";
import { Button } from "../ui/button";

const ArticlesComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { isMobile } = useWindowWidth();
  const POST_COUNT_LIMIT = 3;

  const { loading, fetchMore } = useQuery<PostsData, PostsVars>(GET_POSTS, {
    variables: { first: POST_COUNT_LIMIT, after: null },
    onCompleted: (data) => {
      setPosts(data.posts.edges);
      setCursor(data.posts.pageInfo.endCursor);
      setHasNextPage(data.posts.pageInfo.hasNextPage);
    },
  });

  const loadMorePosts = async () => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    await fetchMore({
      variables: { after: cursor },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousQueryResult;

        const newPosts = fetchMoreResult.posts.edges.filter(
          (newPost) =>
            !previousQueryResult.posts.edges.some(
              (existingPost) => existingPost.node.slug === newPost.node.slug
            )
        );
        setPosts((prev) => [...prev, ...newPosts]);
        setCursor(fetchMoreResult.posts.pageInfo.endCursor);
        setHasNextPage(fetchMoreResult.posts.pageInfo.hasNextPage);

        return {
          posts: {
            edges: [
              ...previousQueryResult.posts.edges,
              ...fetchMoreResult.posts.edges,
            ],
            pageInfo: fetchMoreResult.posts.pageInfo,
          },
        };
      },
    });
    setIsFetching(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      !isFetching
    ) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, hasNextPage, isFetching]);

  const formatDateToReadable = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderLoaders = () =>
    Array.from({ length: POST_COUNT_LIMIT }).map((_, index) => (
      <Skeleton key={index} className="h-[420px] w-full" />
    ));

  const renderArticlePageLoader = () => (
    <>
      <div className="space-y-4 w-full">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[40px] w-[500px]" />
        <Skeleton className="h-[40px] w-96" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-[220px] w-full" />
        <Skeleton className="h-[220px] w-full" />
        <Skeleton className="h-[220px] w-full" />
      </div>
    </>
  );

  const removeDuplicates = (posts: Post[]) => {
    const uniqueSlugs = new Set();
    return posts.filter((post) => {
      const slug = post.node.slug;
      if (uniqueSlugs.has(slug)) {
        return false;
      }
      uniqueSlugs.add(slug);
      return true;
    });
  };

  const filteredPost = removeDuplicates(posts);
  const firstPost = filteredPost[0];
  return (
    <>
      <div className="grid place-content-center text-center space-y-5">
        <h1 className="text-xl font-semibold"> Subscribe for our NewsLetter</h1>
        <SubscribeToNewsLetter />
      </div>
      <section className="max-w-screen-xl mx-auto md:pt-6 grid grid-cols-1 md:grid-cols-2 w-full col-span-3 gap-6">
        {loading && posts.length === 0 ? (
          renderArticlePageLoader()
        ) : (
          <>
            <div className="w-full">
              <Title text="Suggested Expert Article" size="H2" />
              <AnimateOnce>
                <div className="h-[400px] rounded-xl overflow-hidden">
                  <LazyImage
                    height={300}
                    width={200}
                    src={firstPost?.node.featuredImage.node.sourceUrl}
                    alt={firstPost?.node.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Title
                  text={firstPost?.node.title}
                  size="H2"
                  className="mt-6"
                />
                <p
                  className="line-clamp-3 text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: (firstPost?.node?.excerpt ?? "").replace(
                      /\[&hellip;\]/g,
                      "..."
                    ),
                  }}
                />
                <Button>
                  <Link
                    key={firstPost?.node?.slug ?? ""}
                    href={firstPost?.node?.link ?? ""}
                    target="_blank"
                  >
                    View Article
                  </Link>
                </Button>
              </AnimateOnce>
            </div>
            <div className="flex flex-col gap-6">
              <Title
                text="Recent Articles"
                size="H2"
                className="!text-2xl !mb-0"
              />
              {filteredPost.slice(1, 4).map(({ node }) => (
                <ArticleCard
                  key={node.slug}
                  node={node}
                  formatDateToReadable={formatDateToReadable}
                  inSideView
                />
              ))}
            </div>
          </>
        )}
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  md:pt-6 max-w-screen-xl mx-auto">
        {loading && posts.length === 0
          ? renderLoaders()
          : filteredPost
              .slice(4)
              .map(({ node }) => (
                <ArticleCard
                  key={node.slug}
                  node={node}
                  formatDateToReadable={formatDateToReadable}
                  inSideView={isMobile}
                />
              ))}
        {isFetching && renderLoaders()}
      </section>
    </>
  );
};

export default ArticlesComponent;
