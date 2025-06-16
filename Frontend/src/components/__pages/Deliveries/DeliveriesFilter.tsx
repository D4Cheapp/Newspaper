'use client';

import { Input, Select, SelectItem } from '@heroui/react';
import { DeliveryStatus } from 'constants/statuses';

import { useEffect, useState } from 'react';

interface StatusOption {
  key: string;
  label: string;
  value: string;
}

interface DeliveriesFilterProps {
  search: string;
  statusId: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (statusId: string) => void;
}

export const DeliveriesFilter = ({
  search,
  statusId,
  onSearchChange,
  onStatusChange,
}: DeliveriesFilterProps) => {
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);

  useEffect(() => {
    const options = Object.entries(DeliveryStatus).map(([key, value]) => ({
      key,
      label: value,
      value: key,
    }));

    setStatusOptions(options);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="col-span-1 md:col-span-2">
        <Input
          label="Поиск доставок"
          placeholder="Поиск по клиенту или изданию..."
          value={search}
          variant="bordered"
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <Select
          label="Статус доставки"
          selectedKeys={statusId ? [statusId] : []}
          onSelectionChange={keys => {
            const selectedKey = Array.from(keys)[0] as string;
            onStatusChange(selectedKey);
          }}
          variant="bordered"
          items={statusOptions}>
          {status => <SelectItem key={status.key}>{status.label}</SelectItem>}
        </Select>
      </div>
    </div>
  );
};

export default DeliveriesFilter;
