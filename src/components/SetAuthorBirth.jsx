import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_AUTHORS } from '../graphql/queries';
import { EDIT_AUTHOR } from '../graphql/mutations';

export default function SetAuthorBirth({ authors, token, setError }) {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState('');

  const [editAuthor, { data, loading, error }] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    skip: !token,
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setBorn('');
  };

  useEffect(() => {
    if (data && data.editAuthor === null) {
      console.log('author not found');
    }
  }, [data]);

  if (!token) {
    return null;
  }

  return (
    <div>
      <h2>Set author birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  );
}
