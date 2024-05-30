import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import { useApolloClient } from '@apollo/client';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

export default function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  const notificationHelper = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>Add new book</button>
            <button onClick={() => setPage('recommend')}>Recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        token={token}
        setError={notificationHelper}
      />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm
        show={page === 'login'}
        setError={notificationHelper}
        setToken={setToken}
        setPage={setPage}
      />
      <Recommendations show={page === 'recommend'} />
    </div>
  );
}
