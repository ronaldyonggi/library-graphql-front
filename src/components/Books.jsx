import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

export default function Books({ show }) {

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    skip: !show
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
