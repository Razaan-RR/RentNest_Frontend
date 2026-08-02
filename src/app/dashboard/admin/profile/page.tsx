'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import ImageUpload from '@/components/shared/ImageUpload'
import { getProfile, updateProfile } from '@/services/profile.service'

export default function AdminProfilePage() {
  const [form, setForm] = useState({
    phone: '',
    avatar: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    bio: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const profile = await getProfile()

      if (!profile) return

      setForm({
        phone: profile.phone ?? '',
        avatar: profile.avatar ?? '',
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split('T')[0]
          : '',
        address: profile.address ?? '',
        city: profile.city ?? '',
        state: profile.state ?? '',
        country: profile.country ?? '',
        postalCode: profile.postalCode ?? '',
        bio: profile.bio ?? '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await updateProfile(form)

      toast.success('Profile updated successfully')

      await loadProfile()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Profile</h1>

        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <form onSubmit={handleSubmit} className="border rounded-xl p-6 space-y-5">
        <ImageUpload
          value={form.avatar}
          onChange={(url) =>
            setForm((prev) => ({
              ...prev,
              avatar: url,
            }))
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
          className="border rounded-lg p-3 w-full"
        />

        <input
          type="date"
          value={form.dateOfBirth}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              dateOfBirth: e.target.value,
            }))
          }
          className="border rounded-lg p-3 w-full"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          className="border rounded-lg p-3 w-full"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            className="border rounded-lg p-3"
          />

          <input
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
            className="border rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                country: e.target.value,
              }))
            }
            className="border rounded-lg p-3"
          />

          <input
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                postalCode: e.target.value,
              }))
            }
            className="border rounded-lg p-3"
          />
        </div>

        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              bio: e.target.value,
            }))
          }
          className="border rounded-lg p-3 w-full min-h-32"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}
