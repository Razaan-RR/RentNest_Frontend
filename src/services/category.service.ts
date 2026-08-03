import { apiRequest } from '@/lib/api'

interface CategoryData {
  name: string
  description?: string
}

export const getCategories = async () => {
  return apiRequest('/categories', {
    method: 'GET',
  })
}

export const createCategory = async (data: CategoryData) => {
  return apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const updateCategory = async (id: string, data: CategoryData) => {
  return apiRequest(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export const deleteCategory = async (id: string) => {
  return apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  })
}
