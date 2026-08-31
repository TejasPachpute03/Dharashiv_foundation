import { EntrepreneurProfileView } from "@/components/views/EntrepreneurProfileView";

export default async function EntrepreneurProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <EntrepreneurProfileView id={resolvedParams.id} />;
}
