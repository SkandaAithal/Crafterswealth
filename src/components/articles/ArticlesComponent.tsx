import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/lib/queries/articles.query";
import { Post, PostsData, PostsVars } from "@/lib/types/articles";
import { Skeleton } from "../ui/skeleton";
import LazyImage from "../ui/lazy-image";
import Link from "next/link";
import AnimateOnce from "../common/AnimateOnce";

const ArticlesComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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

        const newPosts = fetchMoreResult.posts.edges;
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

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 layout md:pt-6">
      {loading && posts.length === 0
        ? renderLoaders()
        : posts.map(({ node }) => (
            <Link key={node.slug} href={node.link} target="_blank">
              <AnimateOnce>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid h-[420px]">
                  <LazyImage
                    height={300}
                    width={200}
                    src={node.featuredImage.node.sourceUrl}
                    alt={node.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 justify-between flex flex-col">
                    <h2 className="text-xl font-bold mb-2">{node.title}</h2>
                    <p
                      className="line-clamp-3 text-gray-600 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: node.excerpt.replace(/\[&hellip;\]/g, "..."),
                      }}
                    />
                    <p className="text-sm italic">
                      posted at&nbsp;
                      <span className="font-semibold">
                        {formatDateToReadable(node.date)}
                      </span>
                    </p>
                  </div>
                </div>
              </AnimateOnce>
            </Link>
          ))}
      {isFetching && renderLoaders()}
    </section>
  );
};

export default ArticlesComponent;
