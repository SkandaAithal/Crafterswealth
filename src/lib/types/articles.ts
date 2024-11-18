export interface Post {
  node: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    link: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

export interface PostsData {
  posts: {
    edges: Post[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

export interface PostsVars {
  first: number;
  after: string | null;
}
