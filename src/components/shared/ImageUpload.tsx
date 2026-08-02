'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

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

      if (!res.ok) {
        throw new Error(data.error?.message || 'Upload failed')
      }

      onChange(data.secure_url)

      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <Image
          src={value}
          alt="Profile"
          width={150}
          height={150}
          className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
        />
      ) : (
        <div className="w-[140px] h-[140px] rounded-full border flex items-center justify-center text-sm text-muted-foreground">
          No Image
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full border rounded-lg p-2"
      />

      {uploading && (
        <p className="text-sm text-muted-foreground">Uploading image...</p>
      )}
    </div>
  )
}
