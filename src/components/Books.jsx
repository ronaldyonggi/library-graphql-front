import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';
import { useState } from 'react';
import useDeleteBook from '../hooks/useDeleteBook';

export default function Books({ show, setError }) {
  const [genreFilter, setGenreFilter] = useState(null);
  const [deleteBook] = useDeleteBook();
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genreFilter },
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

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      await refetch();
    } catch (error) {
      setError(error.message);
    }
  };

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
              <td>
                <button onClick={() => handleDelete(b.id)}>delete</button>
              </td>
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
