'use client';

import { Author } from '@/modules/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

interface AuthorsListProps {
  authors: Author[];
  isLoading: boolean;
  onEdit: (author: Author) => void;
}

export const AuthorsList = ({ authors, isLoading, onEdit }: AuthorsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (authors.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Авторы не найдены
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table aria-label="Authors table">
        <TableHeader>
          <TableColumn>ФИО</TableColumn>
          <TableColumn>Дата создания</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>
                <div className="font-medium">
                  {`${author.lastName} ${author.firstName} ${author.middleName || ''}`.trim()}
                </div>
              </TableCell>
              <TableCell>
                {new Date(author.createdAt).toLocaleDateString('ru-RU')}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => onEdit(author)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Редактировать
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuthorsList;
