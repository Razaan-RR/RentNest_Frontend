'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { updateProfile } from '@/services/profile.service'
import ImageUpload from '@/components/shared/ImageUpload'

export default function LandlordProfilePage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await updateProfile(form)

      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Landlord Profile</h1>

        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          border
          rounded-xl
          p-6
          space-y-5
        "
      >
        <ImageUpload
          value={form.avatar}
          onChange={(url) =>
            setForm({
              ...form,
              avatar: url,
            })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          className="
            border
            rounded-lg
            p-3
            w-full
          "
        />

        <input
          type="date"
          value={form.dateOfBirth}
          onChange={(e) =>
            setForm({
              ...form,
              dateOfBirth: e.target.value,
            })
          }
          className="
            border
            rounded-lg
            p-3
            w-full
          "
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
          className="
            border
            rounded-lg
            p-3
            w-full
          "
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
            className="
              border
              rounded-lg
              p-3
            "
          />

          <input
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value,
              })
            }
            className="
              border
              rounded-lg
              p-3
            "
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value,
              })
            }
            className="
              border
              rounded-lg
              p-3
            "
          />

          <input
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={(e) =>
              setForm({
                ...form,
                postalCode: e.target.value,
              })
            }
            className="
              border
              rounded-lg
              p-3
            "
          />
        </div>

        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) =>
            setForm({
              ...form,
              bio: e.target.value,
            })
          }
          className="
            border
            rounded-lg
            p-3
            w-full
            min-h-32
          "
        />

        <button
          disabled={loading}
          className="
            bg-primary
            text-primary-foreground
            px-6
            py-3
            rounded-lg
          "
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}
