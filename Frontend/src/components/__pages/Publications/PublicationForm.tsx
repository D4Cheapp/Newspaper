'use client';

import { getAuthors } from '@/modules/authors/api/getAuthors';
import { getPrintingHouses } from '@/modules/printing-houses/api/getPrintingHouses';
import {
  createPublication,
  deletePublication,
  getPublication,
  updatePublication,
} from '@/modules/publications/api';
import { getPublicationStatuses } from '@/modules/publications/api/getPublicationStatuses';
import { getPublicationTypes } from '@/modules/publications/api/getPublicationTypes';
import { UpsertPublicationDto } from '@/modules/publications/types';
import { Author, Publication } from '@/modules/types';
import { Button, Chip, Input, Select, SelectItem, Spinner, Textarea } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

interface PublicationFormProps {
  publicationId: string | undefined;
}

export const PublicationForm = (props: PublicationFormProps) => {
  const { publicationId } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!!publicationId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface FormData extends Omit<UpsertPublicationDto, 'printingHouseId'> {
    typographyId: string;
    printingHouseId: string;
  }

  const [formData, setFormData] = useState<FormData>(() => ({
    name: '',
    description: '',
    price: 0,
    circulation: 0,
    publicationTypeId: '',
    typographyId: '',
    authorIds: [],
    publicationStatusId: '',
    printingHouseId: '1',
  }));

  const [publicationTypes, setPublicationTypes] = useState<{ id: string; name: string }[]>([]);
  const [publicationStatuses, setPublicationStatuses] = useState<
    Array<{
      id: string;
      name: string;
      numericId: number;
    }>
  >([]);
  const [typographies, setTypographies] = useState<{ id: string; name: string }[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setIsLoadingData(true);

        const [typesResponse, statusesResponse, printingHousesResponse, authorsResponse] =
          await Promise.all([
            getPublicationTypes(),
            getPublicationStatuses(),
            getPrintingHouses(),
            getAuthors(),
          ]);

        if (!isMounted) return;

        if (!typesResponse || !statusesResponse || !printingHousesResponse || !authorsResponse) {
          throw new Error('Failed to load required data');
        }

        const mappedTypes = typesResponse.map(({ id, name }) => ({
          id,
          name: String(name),
        }));

        const mappedStatuses = (
          statusesResponse as unknown as Array<{ id: number; name: string }>
        ).map(({ id, name }) => ({
          id: String(id),
          name: String(name),
          numericId: id,
        }));

        const mappedPrintingHouses = printingHousesResponse.map(ph => ({
          id: ph.id,
          name: ph.name,
        }));

        setPublicationTypes(mappedTypes);
        setPublicationStatuses(mappedStatuses);
        setTypographies(mappedPrintingHouses);
        setAuthors(authorsResponse);

        if (publicationId) {
          const pubData = await getPublication(publicationId);
          if (!isMounted || !pubData) return;

          const pub = pubData as unknown as Publication & {
            typography?: { id: string };
            authors?: Array<{ id: string }>;
          };

          setFormData(prev => ({
            ...prev,
            name: pubData.name,
            description: pubData.description || '',
            price: pubData.price,
            circulation: pubData.circulation,
            publicationTypeId: pubData.publicationType?.id || '',
            typographyId: pub.typography?.id || '',
            authorIds: pub.authors?.map(a => a.id) || [],
            publicationStatusId: pubData.publicationStatus?.id || '',
          }));
        }
      } catch (err) {
        console.error('Error loading initial data:', err);
        if (isMounted) {
          setError('Не удалось загрузить необходимые данные');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsLoadingData(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [publicationId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'publicationStatusId') {
      handleStatusChange(value);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'circulation' ? Number(value) : value,
    }));
  };

  const handleStatusChange = (statusId: string) => {
    const status = publicationStatuses.find(s => s.id === statusId);
    setFormData(prev => ({
      ...prev,
      publicationStatusId: status ? String(status.numericId) : '',
    }));
  };

  const handleAuthorSelect = (authorId: string) => {
    if (!authorId) return;

    setFormData(prev => ({
      ...prev,
      authorIds: prev.authorIds.includes(authorId)
        ? prev.authorIds.filter(id => id !== authorId)
        : [...prev.authorIds, authorId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { typographyId, ...restFormData } = formData;
      const publicationData: UpsertPublicationDto = {
        ...restFormData,
        printingHouseId: formData.printingHouseId,
        authorIds: formData.authorIds || [],
        publicationTypeId: formData.publicationTypeId,
        publicationStatusId: formData.publicationStatusId,
      };

      if (publicationId) {
        await updatePublication(publicationId, publicationData);
      } else {
        await createPublication(publicationData);
      }

      router.push('/publications');
      router.refresh();
    } catch (err) {
      console.error('Error saving publication:', err);
      setError('Не удалось сохранить издание');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!publicationId) return;

    if (
      window.confirm('Вы уверены, что хотите удалить эту публикацию? Это действие нельзя отменить.')
    ) {
      try {
        await deletePublication(publicationId);
        router.push('/publications');
        router.refresh();
      } catch (error) {
        console.error('Error deleting publication:', error);
        setError('Не удалось удалить публикацию. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">
        {publicationId ? 'Редактировать публикацию' : 'Создать новую публикацию'}
      </h1>

      {error && <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <Input
            id="name"
            name="name"
            type="text"
            label="Название"
            variant="bordered"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full"
          />

          <Textarea
            id="description"
            name="description"
            label="Описание"
            variant="bordered"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="price"
              name="price"
              type="number"
              label="Цена"
              variant="bordered"
              required
              min="0"
              step="0.01"
              value={formData.price.toString()}
              onChange={handleChange}
              className="w-full"
            />
            <Input
              id="circulation"
              name="circulation"
              type="number"
              label="Тираж"
              variant="bordered"
              required
              min="0"
              value={formData.circulation.toString()}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="publicationTypeId"
              name="publicationTypeId"
              label="Тип публикации"
              variant="bordered"
              required
              value={formData.publicationTypeId}
              onChange={handleChange}
              className="w-full">
              {publicationTypes.map(type => (
                <SelectItem key={type.id}>{type.name}</SelectItem>
              ))}
            </Select>

            <Select
              id="publicationStatusId"
              name="publicationStatusId"
              label="Статус издания"
              variant="bordered"
              required
              value={formData.publicationStatusId}
              onChange={handleChange}
              className="w-full">
              {publicationStatuses.map(status => (
                <SelectItem key={status.id}>{status.name}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="typographyId"
              name="typographyId"
              label="Типография"
              variant="bordered"
              required
              value={formData.typographyId}
              onChange={handleChange}
              className="w-full">
              {typographies.map(typography => (
                <SelectItem key={typography.id}>{typography.name}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Авторы</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.authorIds.map(authorId => {
                const author = authors.find(a => a.id === authorId);
                return author ? (
                  <Chip
                    key={author.id}
                    onClose={() => handleAuthorSelect(author.id)}
                    variant="flat"
                    className="mr-2 mb-2">
                    {`${author.firstName} ${author.lastName}`}
                  </Chip>
                ) : null;
              })}
            </div>
            <Select
              id="authorSelect"
              label="Добавить автора"
              variant="bordered"
              className="w-full"
              onChange={e => {
                const selectedAuthor = authors.find(
                  a => `${a.firstName} ${a.lastName}` === e.target.value
                );
                if (selectedAuthor) {
                  handleAuthorSelect(selectedAuthor.id);
                }
              }}
              value=""
              placeholder="Выберите автора"
              defaultSelectedKeys={[]}>
              {authors
                .filter(author => !formData.authorIds.includes(author.id))
                .map(author => (
                  <SelectItem key={`${author.firstName} ${author.lastName}`}>
                    {`${author.firstName} ${author.lastName}`}
                  </SelectItem>
                ))}
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            {publicationId && (
              <Button
                type="button"
                color="danger"
                onPress={handleDelete}
                disabled={isSubmitting}
                className="mr-2">
                Удалить
              </Button>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              type="button"
              onPress={() => router.push('/publications')}
              disabled={isSubmitting}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting} color="primary">
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
