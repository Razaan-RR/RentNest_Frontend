'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

export default function MultiImageUpload({
  value,
  onChange,
}: {
  value: string[]
  onChange: (urls: string[]) => void
}) {
  const [uploading, setUploading] = useState(false)

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    try {
      setUploading(true)

      const urls: string[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()

        formData.append('file', file)

        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
        )

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

          {
            method: 'POST',
            body: formData,
          },
        )

        const data = await res.json()

        urls.push(data.secure_url)
      }

      onChange([...value, ...urls])

      toast.success('Images uploaded')
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input type="file" multiple accept="image/*" onChange={uploadImages} />

      {uploading && <p>Uploading...</p>}

      <div className="grid grid-cols-3 gap-4">
        {value.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="property"
            width={200}
            height={150}
            className="
                rounded-lg
                object-cover
                h-32
                w-full
                "
          />
        ))}
      </div>
    </div>
  )
}
