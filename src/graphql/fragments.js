import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  #graphql
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
    }
    genres
  }
`;