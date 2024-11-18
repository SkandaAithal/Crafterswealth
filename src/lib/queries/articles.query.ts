import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        node {
          link
          date
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          title(format: RENDERED)
          slug
          excerpt(format: RENDERED)
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
