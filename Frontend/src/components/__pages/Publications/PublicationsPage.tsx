import { PublicationsFilter } from './PublicationsFilter';
import { PublicationsList } from './PublicationsList';

export const PublicationsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-7">Публикации</h1>
      <PublicationsFilter />
      <PublicationsList />
    </div>
  );
};
