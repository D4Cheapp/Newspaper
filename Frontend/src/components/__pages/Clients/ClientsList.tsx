import { Button } from '@heroui/react';
import { Client } from '@/modules/types';

interface ClientsListProps {
  clients: Client[];
  isLoading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export const ClientsList = ({ clients, isLoading, onEdit, onDelete }: ClientsListProps) => {
  if (isLoading) {
    return <div>Загрузка клиентов...</div>;
  }

  if (clients.length === 0) {
    return <div>Клиенты не найдены</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ФИО
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Телефон
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Адрес
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {`${client.lastName} ${client.firstName} ${client.middleName || ''}`.trim()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {client.phoneNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {client.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  variant="light"
                  className="text-blue-600 hover:text-blue-900"
                  onPress={() => onEdit(client)}
                >
                  Редактировать
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
