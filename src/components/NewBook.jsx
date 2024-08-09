import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';
import { CREATE_BOOK } from '../graphql/mutations';
import { updateCache } from '../App';

export default function NewBook({ show, setError }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      setError(messages);
    },
    update: (cache, response) => {
      updateCache(
        cache,
        { query: ALL_BOOKS, variables: { genreFilter: null } },
        response.data.addBook
      );
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log('Added book...');

    await createBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres,
      },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            Add genre
          </button>
        </div>
        <div>genres: {genres.join(', ')}</div>
        <button type='submit'>Create book</button>
      </form>
    </div>
  );
}
