'use client';

import { PrintingHouses } from '@/modules/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

interface PrintingHousesListProps {
  printingHouses: PrintingHouses[];
  isLoading: boolean;
  onEdit: (printingHouse: PrintingHouses) => void;
}

export const PrintingHousesList = ({ printingHouses, isLoading, onEdit }: PrintingHousesListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (printingHouses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Типографии не найдены
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table aria-label="Printing houses table">
        <TableHeader>
          <TableColumn>Название</TableColumn>
          <TableColumn>Телефон</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {printingHouses.map((printingHouse) => (
            <TableRow key={printingHouse.id}>
              <TableCell>
                <div className="font-medium">
                  {printingHouse.name}
                </div>
              </TableCell>
              <TableCell>{printingHouse.phoneNumber}</TableCell>
              <TableCell>{printingHouse.email}</TableCell>
              <TableCell>
                <button
                  onClick={() => onEdit(printingHouse)}
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

export default PrintingHousesList;
