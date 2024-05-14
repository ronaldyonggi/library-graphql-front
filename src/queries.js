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

export const CREATE_BOOK = gql`
  #graphql
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
    }
  }
`;
