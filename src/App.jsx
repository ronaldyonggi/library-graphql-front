import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import { useApolloClient, useSubscription } from '@apollo/client';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED } from './graphql/subscriptions';
import { ALL_BOOKS } from './graphql/queries';

export const updateCache = (cache, query, addedBook) => {
  // Helper for eliminating duplicate books
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    const username = localStorage.getItem('library-user-username');
    if (token) {
      setToken(token);
      setUser(username);
    }
  }, [token]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data);
      const addedBook = data.data.bookAdded;
      notificationHelper(
        `book '${addedBook.title}' by ${addedBook.author.name} added`
      );
      window.alert(`book '${addedBook.title}' added`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

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
        <div>{user && `Welcome back ${user}`}</div>
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
      <Books show={page === 'books'} setError={notificationHelper} />
      <NewBook show={page === 'add'} setError={notificationHelper} />
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
