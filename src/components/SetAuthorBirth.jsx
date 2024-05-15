import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

export default function SetAuthorBirth() {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor, { data, loading, error }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  }
  );

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName('');
    setBorn('');
  };

  useEffect(() => {
    if (data && data.editAuthor === null) {
      console.log('author not found');
    }
  }, [data]);

  return (
    <div>
      <h2>Set author birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
}
