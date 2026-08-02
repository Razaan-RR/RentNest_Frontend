'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PropertyImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="h-80 rounded-xl bg-muted flex items-center justify-center">
        Property Image
      </div>
    )
  }

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <div className="relative h-80 overflow-hidden rounded-xl">
        <Image
          src={images[current]}
          alt="Property image"
          fill
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full px-3 py-1"
            >
              ←
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full px-3 py-1"
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative h-20 rounded-lg overflow-hidden border ${
                current === index ? 'border-primary' : ''
              }`}
            >
              <Image
                src={image}
                alt="Thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
