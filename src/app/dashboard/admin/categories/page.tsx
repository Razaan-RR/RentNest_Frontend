'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  getCategories,
  createCategory,
  deleteCategory,
} from '@/services/category.service'

interface Category {
  id: string
  name: string
  description?: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])

  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: '',
    description: '',
  })

  const loadCategories = useCallback(async () => {
    try {
      const response = (await getCategories()) as {
        categories: Category[]
      }

      setCategories(response.categories || [])
    } catch {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchCategories = async () => {
      try {
        const response = (await getCategories()) as {
          categories: Category[]
        }

        if (!cancelled) {
          setCategories(response.categories || [])
        }
      } catch {
        if (!cancelled) {
          toast.error('Failed to load categories')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchCategories()

    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createCategory(form)

      toast.success('Category created')

      setForm({
        name: '',
        description: '',
      })

      loadCategories()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id)

      toast.success('Category deleted')

      loadCategories()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Cannot delete category',
      )
    }
  }

  if (loading) {
    return <div>Loading categories...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Category Management</h1>

        <p className="text-muted-foreground">
          Create and manage property categories
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
                border
                rounded-xl
                p-6
                space-y-4
                "
      >
        <input
          placeholder="Category name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="
                    border
                    rounded-lg
                    p-3
                    w-full
                    "
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="
                    border
                    rounded-lg
                    p-3
                    w-full
                    "
        />

        <button
          className="
                    bg-primary
                    text-primary-foreground
                    px-5
                    py-2
                    rounded-lg
                    "
        >
          Create Category
        </button>
      </form>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="
                            border
                            rounded-xl
                            p-5
                            flex
                            justify-between
                            items-center
                            "
          >
            <div>
              <h2 className="font-semibold text-lg">{category.name}</h2>

              <p className="text-muted-foreground">
                {category.description || 'No description'}
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger className="text-red-500 hover:text-red-700">
                Delete
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this category.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  )
}
