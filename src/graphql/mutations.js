import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments';

export const CREATE_BOOK = gql`
  #graphql
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_AUTHOR = gql`
  #graphql
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  #graphql
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      username
      favoriteGenre
    }
  }
`;
export const DELETE_BOOK = gql`
  #graphql
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const DELETE_AUTHOR = gql`
  #graphql
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;
