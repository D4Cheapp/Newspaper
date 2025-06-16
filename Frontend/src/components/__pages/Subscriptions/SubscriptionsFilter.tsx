'use client';

import { Client, Publication } from '@/modules/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';

import { useState } from 'react';

type FilterValues = {
  search: string;
  clientId: string;
  publicationTypeId: string;
  [key: string]: string;
};

type SubscriptionsFilterProps = {
  clients: Client[];
  publicationTypes: { id: string; name: string }[];
  onFilterChange: (filters: Partial<FilterValues>) => void;
  onReset: () => void;
  onCreate: () => void;
};

export const SubscriptionsFilter = ({
  clients,
  publicationTypes,
  onFilterChange,
  onReset,
  onCreate,
}: SubscriptionsFilterProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    clientId: '',
    publicationTypeId: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilters = {
      ...filters,
      search: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClientChange = (keys: any) => {
    const clientId = (Array.from(keys)[0] as string) || '';
    const newFilters = {
      ...filters,
      clientId,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePublicationTypeChange = (keys: any) => {
    const publicationTypeId = Array.from(keys)[0] as string || '';
    const newFilters = {
      ...filters,
      publicationTypeId,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      clientId: '',
      publicationTypeId: '',
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          label="Поиск"
          name="search"
          placeholder="Поиск..."
          value={filters.search}
          onChange={handleSearchChange}
        />

        <Select
          label="Клиент"
          selectedKeys={filters.clientId ? [filters.clientId] : []}
          onSelectionChange={handleClientChange}
          placeholder="Все клиенты">
          {clients.map(client => (
            <SelectItem key={client.id}>{`${client.lastName} ${client.firstName}`}</SelectItem>
          ))}
        </Select>

        <Select
          label="Тип издания"
          selectedKeys={filters.publicationTypeId ? [filters.publicationTypeId] : []}
          onSelectionChange={handlePublicationTypeChange}
          placeholder="Все типы изданий"
        >
          {publicationTypes.map(type => (
            <SelectItem key={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </Select>

        <div className="flex items-end gap-2">
          <Button onPress={onCreate} color="primary" className="flex-1">
            Добавить подписку
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsFilter;
