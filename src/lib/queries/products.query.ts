import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($categories: String!) {
    products(where: { category: $categories, status: "publish" }, first: 11) {
      nodes {
        name
        id
        ... on SimpleProduct {
          hsnCode
          productCategories {
            nodes {
              name
              id
              slug
              threshold
            }
          }
          stock {
            stockSymbol
            target
            description
            targetReached
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
        slug
        threshold
        image {
          sourceUrl(size: LARGE)
        }
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

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      orderId
      order {
        total(format: RAW)
        orderNumber
        status
        subtotal(format: RAW)
      }
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      order {
        status
      }
    }
  }
`;

export const GET_PRODUCTS_BY_IDS = gql`
  query GetProductsByIds($payload: [ID!]) {
    productsByIds(payload: $payload) {
      id
      buyPrice
      name
      stockName
      stockSymbol
      target
      file
      categorySlug
      targetsReached
    }
  }
`;

export const GET_ALL_PRODUCT_IDS_BY_CATEGORY = gql`
  query GetProductByCategory {
    allProductsByCategory
  }
`;

export const GET_PUBLIC_ORDERS = gql`
  query MyQuery {
    publicOrders {
      country
      datePaid
      firstName
      lastName
      state
      city
      items {
        imageUrl
        name
      }
    }
  }
`;

export const APPLY_COUPON_MUTATION = gql`
  mutation ApplyCustomDiscount($input: ApplyCustomDiscountInput!) {
    applyCustomDiscount(input: $input) {
      appliedProducts
      discountedTotal
      message
      percentageApplied
    }
  }
`;

export const INVOICE_NUMBER_QUERY = gql`
  query invoiceNumber {
    invoiceCounter
  }
`;
