'use client';

import { Subscriptions } from '@/modules/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

interface SubscriptionsListProps {
  subscriptions: Subscriptions[];
  onEdit: (subscription: Subscriptions) => void;
  isLoading: boolean;
}

export const SubscriptionsList = ({ subscriptions, onEdit, isLoading }: SubscriptionsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return <div className="text-center py-8 text-gray-500">Нет данных о подписках</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table aria-label="Список подписок">
        <TableHeader>
          <TableColumn>Клиент</TableColumn>
          <TableColumn>Тип издания</TableColumn>
          <TableColumn>Дата окончания</TableColumn>
          <TableColumn>Дата создания</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {subscriptions.map(subscription => (
            <TableRow key={subscription.id}>
              <TableCell>
                {subscription.client
                  ? `${subscription.client.lastName} ${subscription.client.firstName}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{subscription.publicationType?.name || 'N/A'}</TableCell>
              <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(subscription.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <button
                  onClick={() => onEdit(subscription)}
                  className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none">
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

export default SubscriptionsList;
