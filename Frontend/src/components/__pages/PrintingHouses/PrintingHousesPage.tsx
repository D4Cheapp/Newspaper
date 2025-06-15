'use client';

import { PrintingHouses } from '@/modules/types';
import { UpsertPrintingHouseDto } from '@/modules/printing-houses/types';
import { createPrintingHouse, getPrintingHouses, updatePrintingHouse } from '@/modules/printing-houses/api';
import { Button } from '@heroui/react';
import { useCallback, useEffect, useState } from 'react';

import { PrintingHouseForm } from './PrintingHouseForm';
import { PrintingHousesFilter } from './PrintingHousesFilter';
import { PrintingHousesList } from './PrintingHousesList';

export const PrintingHousesPage = () => {
  const [printingHouses, setPrintingHouses] = useState<PrintingHouses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrintingHouse, setEditingPrintingHouse] = useState<PrintingHouses | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const fetchPrintingHouses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getPrintingHouses({ search });
      setPrintingHouses(response || []);
    } catch (error) {
      console.error('Error fetching printing houses:', error);
      setPrintingHouses([]);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchPrintingHouses();
  }, [fetchPrintingHouses]);

  const handleOpenModal = (printingHouse: PrintingHouses | null = null) => {
    setEditingPrintingHouse(printingHouse);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPrintingHouse(null);
  };

  const handleSubmit = async (data: UpsertPrintingHouseDto) => {
    setIsSubmitting(true);
    try {
      if (editingPrintingHouse) {
        await updatePrintingHouse(editingPrintingHouse.id, data);
      } else {
        await createPrintingHouse(data);
      }
      await fetchPrintingHouses();
    } catch (error) {
      console.error('Error saving printing house:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold my-7">Типографии</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <PrintingHousesFilter search={search} onSearchChange={setSearch} />
          </div>
          <Button color="primary" onPress={() => handleOpenModal()}>
            Добавить типографию
          </Button>
        </div>
      </div>

      <PrintingHousesList 
        printingHouses={printingHouses} 
        isLoading={isLoading} 
        onEdit={handleOpenModal} 
      />

      <PrintingHouseForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        printingHouse={editingPrintingHouse}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PrintingHousesPage;
