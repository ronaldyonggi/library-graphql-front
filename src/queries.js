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
      published
      author {
        name
        born
      }
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
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
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
    }
  }
`