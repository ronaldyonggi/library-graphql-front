import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  #graphql
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
      born
    }
    genres
  }
`;
