'use client';

import { Requests } from '@/modules/types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

interface RequestsListProps {
  requests: Requests[];
  onEdit: (request: Requests) => void;
  onDelete: (request: Requests) => void;
  isLoading: boolean;
}

export const RequestsList = ({ requests, onEdit, onDelete, isLoading }: RequestsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Нет заявок</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className="overflow-x-auto">
      <Table aria-label="Список заявок">
        <TableHeader>
          <TableColumn>Клиент</TableColumn>
          <TableColumn>Статус заявки</TableColumn>
          <TableColumn>Тип услуги</TableColumn>
          <TableColumn>Дата создания</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {requests.map(request => (
            <TableRow key={request.id}>
              <TableCell>
                {request.client
                  ? `${request.client.lastName} ${request.client.firstName}`
                  : 'Неизвестный клиент'}
              </TableCell>
              <TableCell>{request.status?.name || 'Нет статуса'}</TableCell>
              <TableCell>{request.serviceType?.name || 'Не указано'}</TableCell>
              <TableCell>{formatDate(request.createdAt)}</TableCell>
              <TableCell>
                <Button
                  variant="light"
                  size="sm"
                  onPress={() => onEdit(request)}
                  className="text-blue-600 hover:text-blue-800 hover:underline p-0 h-auto min-h-0">
                  Редактировать
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestsList;
