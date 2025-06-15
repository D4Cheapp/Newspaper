'use client';

import { Input } from '@heroui/react';

interface PrintingHousesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const PrintingHousesFilter = ({ search, onSearchChange }: PrintingHousesFilterProps) => {
  return (
    <div className="w-full">
      <Input
        label="Поиск типографий"
        placeholder="Поиск по названию..."
        value={search}
        variant="bordered"
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default PrintingHousesFilter;
