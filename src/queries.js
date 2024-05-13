import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  #graphql
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  #graphql
  query {
    allBooks {
      title
      author
      published
    }
  }
`;
