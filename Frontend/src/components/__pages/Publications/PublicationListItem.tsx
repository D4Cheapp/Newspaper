'use client';

import { Publication } from '@/modules/types';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Routes } from 'constants/routes';

import { useRouter } from 'next/navigation';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('ru-RU', options);
};

type PublicationListItemProps = {
  publication: Publication;
};

export const PublicationListItem = ({ publication }: PublicationListItemProps) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`${Routes.publications}/${publication.id}`);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold">{publication.name}</h3>
          <p className="text-sm text-gray-500">{publication.publicationType.name}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {publication.publicationStatus.name}
        </span>
      </CardHeader>
      <CardBody className="py-2">
        <p className="text-gray-700 line-clamp-2">{publication.description}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Цена:</span>{' '}
            <span className="font-medium">{publication.price} ₽</span>
          </div>
          <div>
            <span className="text-gray-500">Тираж:</span>{' '}
            <span className="font-medium">{publication.circulation} шт.</span>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center pt-2">
        <span className="text-xs text-gray-500">
          Обновлено: {formatDate(publication.updatedAt)}
        </span>
        <Button size="sm" variant="flat" color="primary" onPress={handleViewDetails}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};
