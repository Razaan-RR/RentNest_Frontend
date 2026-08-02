'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'

import { loginSchema, LoginFormData } from '@/schemas/auth.schema'
import { loginUser } from '@/lib/auth'

import { saveAuthData } from '@/lib/storage'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/AuthProvider'

export default function LoginForm() {
  const router = useRouter()

  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data)

      saveAuthData(result.accessToken, result.user)

      setUser(result.user)

      toast.success('Login successful!')

      // Redirect based on role
      switch (result.user.role) {
        case 'ADMIN':
          router.push('/dashboard/admin')
          break

        case 'LANDLORD':
          router.push('/dashboard/landlord')
          break

        default:
          router.push('/dashboard/tenant')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>

        <CardDescription>Login to your RentNest account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register('password')}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Dont have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
