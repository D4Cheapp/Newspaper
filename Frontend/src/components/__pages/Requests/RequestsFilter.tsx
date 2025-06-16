'use client';

import { Button, Input, Select, SelectItem } from '@heroui/react';

import { useState } from 'react';

type FilterValues = {
  search: string;
  status: string;
  [key: string]: string;
};

interface RequestsFilterProps {
  onFilterChange: (filters: Partial<FilterValues>) => void;
  onReset: () => void;
  onCreate: () => void;
}

export const RequestsFilter = ({ onFilterChange, onReset, onCreate }: RequestsFilterProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    status: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      search: e.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      status: e.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-4 mb-4 items-center">
        <Input
          label="Поиск"
          placeholder="Поиск по названию"
          value={filters.search}
          onChange={handleSearchChange}
        />

        <Select
          value={filters.status}
          onChange={handleStatusChange}
          label="Статус"
          placeholder="Все статусы">
          <SelectItem key="">Все статусы</SelectItem>
          <SelectItem key="new">Новые</SelectItem>
          <SelectItem key="in_progress">В работе</SelectItem>
          <SelectItem key="completed">Завершенные</SelectItem>
        </Select>

        <Button onPress={onCreate} className="min-w-max" color="primary">
          Создать заявку
        </Button>
      </div>
    </div>
  );
};

export default RequestsFilter;
