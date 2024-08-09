import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../graphql/queries';
import SetAuthorBirth from './SetAuthorBirth';
import useDeleteAuthor from '../hooks/useDeleteAuthor';

export default function Authors({ show, token, setError }) {
  const { loading, error, data, refetch } = useQuery(ALL_AUTHORS, {
    skip: !show,
  });
  const [deleteAuthor] = useDeleteAuthor();

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const authors = data.allAuthors;

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      await refetch();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
                {a.bookCount > 0 ? null : (
                  <td>
                    <button onClick={() => handleDelete(a.id)}>delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SetAuthorBirth authors={authors} token={token} setError={setError} />
    </div>
  );
}
