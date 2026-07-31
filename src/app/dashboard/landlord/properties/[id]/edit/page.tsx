import EditPropertyForm from '@/components/property/EditPropertyForm'

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Property</h1>

        <p className="text-muted-foreground mt-2">
          Update your property information
        </p>
      </div>

      <EditPropertyForm id={id} />
    </div>
  )
}
