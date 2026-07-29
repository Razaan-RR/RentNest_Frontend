import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>

        <CardDescription>Join RentNest today</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div>
            <Label>Full Name</Label>

            <Input placeholder="John Doe" />
          </div>

          <div>
            <Label>Email</Label>

            <Input type="email" placeholder="john@gmail.com" />
          </div>

          <div>
            <Label>Password</Label>

            <Input type="password" />
          </div>

          <div>
            <Label>Role</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="tenant">Tenant</SelectItem>

                <SelectItem value="landlord">Landlord</SelectItem>

                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">Register</Button>
        </form>
      </CardContent>
    </Card>
  )
}
