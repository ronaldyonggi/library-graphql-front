import { useState } from 'react';
import Authors from './components/Authors';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from './queries';

export default function App() {
  const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add new book</button>
      </div>

      <Authors show={page === "authors"} authors={result.data.allAuthors} />
    </div>
  );
}
