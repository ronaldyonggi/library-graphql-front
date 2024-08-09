import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../graphql/mutations';

const useDeleteBook = () => {
  const [mutate, result] = useMutation(DELETE_BOOK);

  const deleteBook = async (id) => {
    const { data } = await mutate({ variables: { id } });
    return data;
  };

  return [deleteBook, result];
};

export default useDeleteBook;
