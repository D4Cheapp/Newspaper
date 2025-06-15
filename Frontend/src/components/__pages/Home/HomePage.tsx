'use client';

import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';
import { handleRoleNames } from 'utils/handle-role-names';

import { useRouter } from 'next/navigation';

export const HomePage = () => {
  const router = useRouter();

  const handleSetRole = (role: Roles) => {
    localStorage.setItem('role', role);
    router.push(Routes.newspapers);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md py-7">
        <CardHeader className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-center text-gray-800">Добро пожаловать</h1>
          <p className="text-gray-500 text-medium">Выберите вашу роль для продолжения</p>
        </CardHeader>
        <CardBody className="w-full flex flex-row gap-4 justify-center mt-5 flex-wrap">
          <Button
            color="primary"
            variant="solid"
            className="w-[40%] py-6 text-lg"
            onPress={() => handleSetRole(Roles.manager)}>
            {handleRoleNames(Roles.manager)}
          </Button>
          <Button
            color="primary"
            variant="solid"
            className="w-[40%] py-6 text-lg"
            onPress={() => handleSetRole(Roles.editor)}>
            {handleRoleNames(Roles.editor)}
          </Button>
          <Button
            color="primary"
            variant="solid"
            className="w-[60%] py-6 text-lg"
            onPress={() => handleSetRole(Roles.chiefEditor)}>
            {handleRoleNames(Roles.chiefEditor)}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
