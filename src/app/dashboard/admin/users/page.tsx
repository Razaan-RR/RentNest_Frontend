'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getAdminUsers, updateUserStatus } from '@/services/admin.service'

interface User {
  id: string
  name: string
  email: string
  role: string
  activeStatus: 'ACTIVE' | 'BANNED'
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    try {
      const response = (await getAdminUsers()) as {
        users: User[]
      }

      setUsers(response.users || [])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load users',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      await loadUsers()
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()),
)

  const toggleStatus = async (user: User) => {
    try {
      const newStatus = user.activeStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE'

      await updateUserStatus(user.id, newStatus)

      toast.success(`User ${newStatus.toLowerCase()} successfully`)

      loadUsers()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update status',
      )
    }
  }

  if (loading) {
    return <div className="py-10 text-center">Loading users...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>

        <p className="mt-2 text-muted-foreground">
          Manage users and account status.
        </p>
      </div>

      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          px-4
          py-3
          bg-background
        "
      />

      <div
        className="
        overflow-x-auto
        rounded-xl
        border
      "
      >
        <table className="w-full">
          <thead className="border-b bg-muted">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">{user.role}</td>

                <td className="p-4">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-sm
                      ${
                        user.activeStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }
                    `}
                  >
                    {user.activeStatus}
                  </span>
                </td>

                <td className="p-4">
                  {user.role !== 'ADMIN' && (
                    <button
                      onClick={() => toggleStatus(user)}
                      className={`
                        rounded-lg
                        px-4
                        py-2
                        text-white
                        ${
                          user.activeStatus === 'ACTIVE'
                            ? 'bg-red-600'
                            : 'bg-green-600'
                        }
                      `}
                    >
                      {user.activeStatus === 'ACTIVE' ? 'Ban' : 'Unban'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
