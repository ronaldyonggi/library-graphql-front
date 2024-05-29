import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

export default function Recommendations({ show }) {
  const genreFilter = localStorage.getItem('library-user-favoriteGenre');
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

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{genreFilter}</strong>
      </p>

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
    </div>
  );
}
