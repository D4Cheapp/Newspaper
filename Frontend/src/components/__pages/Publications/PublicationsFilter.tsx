'use client';

import { useAuthContext } from '@/app/authContext';
import { Button, Input } from '@heroui/react';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';

export const PublicationsFilter = () => {
  const { role } = useAuthContext();

  const canManage = role === Roles.editor || role === Roles.chiefEditor;

  return (
    <div className="w-full grid grid-cols-4 gap-3 items-center">
      <Input
        label="Поиск"
        size="sm"
        variant="bordered"
        className={canManage ? 'col-span-3' : 'col-span-4'}
      />
      {canManage && (
        <Button color="primary" variant="solid" onPress={() => {}} href={Routes.createPublication}>
          Создать публикацию
        </Button>
      )}
    </div>
  );
};
