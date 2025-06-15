import { PublicationForm } from '@/components/__pages/Publications/PublicationForm';

export default function CreatePublicationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PublicationForm publicationId={undefined} />
    </div>
  );
}
