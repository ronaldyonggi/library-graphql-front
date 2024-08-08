import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '../graphql/mutations';

export default function LoginForm({ show, setError, setToken, setPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    skip: !show,
  });

  useEffect(() => {
    if (data) {
      const token = data.login.value;
      const favoriteGenre = data.login.favoriteGenre;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      localStorage.setItem('library-user-favoriteGenre', favoriteGenre);
    }
  }, [data]);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const res = await login({ variables: { username, password } });
    if (res.data) {
      setPage('authors');
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
}
