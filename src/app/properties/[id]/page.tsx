import RentalRequestForm from '@/components/property/RentalRequestForm'
import PropertyReviews from '@/components/review/PropertyReviews'
import { getPropertyById } from '@/services/property.service'

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const response = await getPropertyById(id)

  const property = response.property

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold">{property.title}</h1>

      <p className="mt-2 text-muted-foreground">{property.location}</p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div
          className="
          h-80
          rounded-xl
          bg-muted
          flex
          items-center
          justify-center
        "
        >
          Property Image
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            ৳ {property.rentAmount}/month
          </h2>

          <p>{property.description}</p>

          <div className="flex gap-5">
            <span>🛏 {property.bedrooms} Beds</span>

            <span>🚿 {property.bathrooms} Baths</span>

            <span>📐 {property.area} sqft</span>
          </div>

          <div>
            <strong>Type:</strong> {property.propertyType}
          </div>

          <div>
            <strong>Amenities:</strong> {property.amenities}
          </div>

          {property.availability === 'AVAILABLE' ? (
            <RentalRequestForm propertyId={property.id} />
          ) : (
            <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4">
              <h3 className="font-semibold text-green-700">
                This property has already been rented.
              </h3>

              <p className="mt-1 text-sm text-green-600">
                Rental requests are no longer available for this property.
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Landlord Information</h2>

        <p>{property.landlord.name}</p>

        <p>{property.landlord.email}</p>
      </section>

      <PropertyReviews propertyId={property.id} />
    </main>
  )
}
