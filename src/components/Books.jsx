import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';
import { useState } from 'react';

export default function Books({ show }) {
  const [genreFilter, setGenreFilter] = useState(null);
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genreFilter },
    skip: !show,
  });

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;

  let allGenres = [];
  // Get all genres from all books
  books.map((b) => {
    b.genres.map((g) => {
      if (!allGenres.includes(g)) {
        allGenres.push(g);
      }
    });
  });

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {allGenres.map((g, index) => (
          <button key={index} onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
}
