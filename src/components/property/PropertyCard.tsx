import Link from 'next/link'

interface Property {
  id: string
  title: string
  description: string
  location: string
  rentAmount: string
  bedrooms: number
  bathrooms: number
  area: number
  propertyType: string
  amenities: string
  availability: string
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition">
      {/* Image Placeholder */}
      <div className="h-48 rounded-lg bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Property Image</span>
      </div>

      <div className="mt-4 space-y-3">
        <h2 className="text-xl font-semibold">{property.title}</h2>

        <p className="text-muted-foreground">{property.location}</p>

        <p className="font-bold text-lg">৳ {property.rentAmount}/month</p>

        <div className="flex gap-4 text-sm">
          <span>🛏 {property.bedrooms} Beds</span>

          <span>🚿 {property.bathrooms} Baths</span>

          <span>📐 {property.area} sqft</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {property.availability}
          </span>

          <Link
            href={`/properties/${property.id}`}
            className="text-primary font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
