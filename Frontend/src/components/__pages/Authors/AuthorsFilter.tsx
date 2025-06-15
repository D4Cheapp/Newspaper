'use client';

import { Input } from '@heroui/react';

interface AuthorsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const AuthorsFilter = ({ search, onSearchChange }: AuthorsFilterProps) => {
  return (
    <div className="w-full">
      <Input
        label="Поиск авторов"
        placeholder="Поиск по ФИО..."
        value={search}
        variant="bordered"
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default AuthorsFilter;
