import PropertyForm from '@/components/property/PropertyForm'

export default function CreatePropertyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Property</h1>

        <p className="text-muted-foreground mt-2">
          List your property for tenants
        </p>
      </div>

      <PropertyForm />
    </div>
  )
}
