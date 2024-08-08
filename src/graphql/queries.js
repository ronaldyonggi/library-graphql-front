import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments';

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
  query allBooks($genreFilter: String) {
    allBooks(genre: $genreFilter) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;