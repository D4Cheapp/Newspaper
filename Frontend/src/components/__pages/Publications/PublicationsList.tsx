'use client';

import { Publication } from '@/modules/types';
import { Spinner } from '@heroui/react';
import { PublicationTypes } from 'constants/entity-types';
import { PublicationStatus } from 'constants/statuses';

import { useEffect, useState } from 'react';

import { PublicationListItem } from './PublicationListItem';

const mockPublications: Publication[] = [
  {
    id: '1',
    name: 'Ежедневная газета',
    publicationType: { id: '1', name: PublicationTypes.mainNews },
    publicationStatus: { id: '1', name: PublicationStatus.working },
    description: 'Ежедневное издание с последними новостями и аналитикой',
    price: 50,
    circulation: 10000,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-06-15T10:30:00.000Z',
  },
  {
    id: '2',
    name: 'Еженедельный журнал',
    publicationType: { id: '2', name: PublicationTypes.currencyCourses },
    publicationStatus: { id: '1', name: PublicationStatus.working },
    description: 'Еженедельный журнал о технологиях и инновациях',
    price: 300,
    circulation: 5000,
    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: '2023-06-10T14:20:00.000Z',
  },
];

const fetchPublications = async (): Promise<Publication[]> => {
  // Simulate API call with a delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockPublications]);
    }, 500);
  });
};

export const PublicationsList = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPublications();
        setPublications(data);
        setError(null);
      } catch (err) {
        console.error('Error loading publications:', err);
        setError('Не удалось загрузить публикации. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPublications();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

  if (publications.length === 0) {
    return <div className="text-center py-8 text-gray-500">Публикации не найдены</div>;
  }

  return (
    <div className="grid gap-4 mt-6">
      {publications.map(publication => (
        <PublicationListItem key={publication.id} publication={publication} />
      ))}
    </div>
  );
};
