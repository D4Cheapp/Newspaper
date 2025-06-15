'use client';

import { Deliveries } from '@/modules/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

interface DeliveriesListProps {
  deliveries: Deliveries[];
  isLoading: boolean;
  onEdit: (delivery: Deliveries) => void;
}

export const DeliveriesList = ({ deliveries, isLoading, onEdit }: DeliveriesListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (deliveries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Доставки не найдены</p>
        <p className="text-sm mt-2">Попробуйте изменить параметры поиска</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table aria-label="Deliveries table">
        <TableHeader>
          <TableColumn key="client">Клиент</TableColumn>
          <TableColumn key="publication">Издание</TableColumn>
          <TableColumn key="status">Статус</TableColumn>
          <TableColumn key="quantity">Количество</TableColumn>
          <TableColumn key="createdAt">Дата создания</TableColumn>
          <TableColumn key="actions">Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {deliveries.map(delivery => (
            <TableRow key={delivery.id}>
              <TableCell>
                <div className="font-medium">
                  {`${delivery.client.lastName} ${delivery.client.firstName} ${delivery.client.middleName || ''}`.trim()}
                </div>
                <div className="text-sm text-gray-500">{delivery.client.phoneNumber}</div>
              </TableCell>
              <TableCell>{delivery.publication.name}</TableCell>
              <TableCell>
                <span className="px-2 py-1 text-xs rounded-full">
                  {delivery.deliveryStatus.name}
                </span>
              </TableCell>
              <TableCell>{delivery.quantity}</TableCell>
              <TableCell>{new Date(delivery.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <button
                  onClick={() => onEdit(delivery)}
                  className="text-blue-600 hover:text-blue-800">
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

export default DeliveriesList;
