import { Input } from '@heroui/react';

interface ClientsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const ClientsFilter = ({ search, onSearchChange }: ClientsFilterProps) => {
  return (
    <Input
      placeholder="Поиск по ФИО, телефону или email..."
      value={search}
      variant="bordered"
      onChange={e => onSearchChange(e.target.value)}
      className="w-full"
    />
  );
};
