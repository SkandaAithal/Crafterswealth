import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($categories: String!) {
    products(where: { category: $categories }, first: 1) {
      nodes {
        name
        id
        ... on SimpleProduct {
          productCategories {
            nodes {
              name
              id
              slug
            }
          }
          stock {
            stockSymbol
            target
            description
          }
          plans {
            name
            plans {
              benefits
              button_text
              description
              period
              most_popular
              regular_price
              sale_price
              type
              access
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query Categories {
    productCategories {
      nodes {
        name
      }
    }
  }
`;

export const GET_PRODUCT_PLANS = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      plans {
        name
        plans {
          benefits
          button_text
          description
          period
          most_popular
          regular_price
          sale_price
          type
          access
        }
      }
    }
  }
`;
