import { PublicationForm } from '@/components/__pages/Publications/PublicationForm';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EditPublicationPage({ params }: PageProps) {
  const publicationId = await params.id;
  return (
    <div className="container mx-auto px-4 py-8">
      <PublicationForm publicationId={publicationId} />
    </div>
  );
}
