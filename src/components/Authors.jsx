import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import SetAuthorBirth from './SetAuthorBirth';

export default function Authors({ show, token, setError }) {
  const { loading, error, data } = useQuery(ALL_AUTHORS, {
    skip: !show,
  });

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const authors = data.allAuthors;

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SetAuthorBirth authors={authors} token={token} setError={setError} />
    </div>
  );
}
