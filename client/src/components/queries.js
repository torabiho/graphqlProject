import { gql } from "@apollo/client";

const PRODUCTS_FRAGMENT = gql`
  fragment ProductsData on Product {
    id
    description
    name
    url
    numberOfVotes
    publishedAt
    author {
      id
      userName
      fullName
    }
    categories {
      id
      slug
      name
    }
  }
`;

// Query

export const GET_ALL_PRODUCTS = gql`
  ${PRODUCTS_FRAGMENT}
  query {
    allProducts {
      ...ProductsData
    }
  }
`;

export const GET_PRODUCTS_BY_AUTHOR = gql`
  ${PRODUCTS_FRAGMENT}
  query ($authorName: String!) {
    productsByAuthor(authorName: $authorName) {
      ...ProductsData
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query {
    allCategories {
      id
      slug
      name
    }
  }
`;

// Mutations

export const CREATE_PRODUCT = gql`
  mutation Mutation($input: NewProduct!) {
    createProduct(input: $input) {
      id
      name
      description
      url
      numberOfVotes
      publishedAt
      author {
        id
        userName
        fullName
      }
      categories {
        id
        slug
        name
      }
    }
  }
`;

export const UPVOTE_PRODUCT = gql`
  mutation Mutation($productId: String!) {
    upvoteProduct(productId: $productId) {
      numberOfVotes
    }
  }
`;
