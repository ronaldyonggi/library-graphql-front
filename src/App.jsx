import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books'

export default function App() {
  const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add new book</button>
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
    </div>
  );
}
