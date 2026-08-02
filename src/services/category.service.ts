import { apiRequest } from '@/lib/api'

export const getCategories = async () => {
  return apiRequest('/categories', {
    method: 'GET',
  })
}

export const createCategory = async (data: {
  name: string
  description?: string
}) => {
  return apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const updateCategory = async (id: string, data: any) => {
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
