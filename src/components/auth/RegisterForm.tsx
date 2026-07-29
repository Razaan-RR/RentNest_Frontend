"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  registerSchema,
  RegisterFormData,
} from "@/schemas/auth.schema";

import { registerUser } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterForm() {

  const router = useRouter();


  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });



  const onSubmit = async (
    data: RegisterFormData
  ) => {

    try {

      await registerUser(data);


      toast.success(
        "Registration successful!"
      );


      router.push("/login");


    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );

    }

  };



  return (
    <Card className="w-full max-w-md shadow-lg">

      <CardHeader className="text-center">

        <CardTitle className="text-3xl font-bold">
          Create Account
        </CardTitle>

        <CardDescription>
          Join RentNest today
        </CardDescription>

      </CardHeader>


      <CardContent>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >


          {/* Name */}
          <div className="space-y-2">

            <Label>
              Full Name
            </Label>


            <Input
              placeholder="John Doe"
              {...register("name")}
            />


            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}

          </div>



          {/* Email */}
          <div className="space-y-2">

            <Label>
              Email
            </Label>


            <Input
              type="email"
              placeholder="john@gmail.com"
              {...register("email")}
            />


            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>




          {/* Password */}
          <div className="space-y-2">

            <Label>
              Password
            </Label>


            <Input
              type="password"
              placeholder="******"
              {...register("password")}
            />


            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>




          {/* Confirm Password */}
          <div className="space-y-2">

            <Label>
              Confirm Password
            </Label>


            <Input
              type="password"
              placeholder="******"
              {...register("confirmPassword")}
            />


            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

          </div>




          {/* Role */}
          <div className="space-y-2">

            <Label>
              Role
            </Label>


            <Select
              onValueChange={(value) =>
                setValue(
                  "role",
                  value as "TENANT" | "LANDLORD"
                )
              }
            >

              <SelectTrigger>

                <SelectValue
                  placeholder="Select role"
                />

              </SelectTrigger>


              <SelectContent>


                <SelectItem value="TENANT">
                  Tenant
                </SelectItem>


                <SelectItem value="LANDLORD">
                  Landlord
                </SelectItem>


              </SelectContent>


            </Select>


            {errors.role && (
              <p className="text-sm text-red-500">
                {errors.role.message}
              </p>
            )}

          </div>





          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >

            {
              isSubmitting
                ? "Creating account..."
                : "Register"
            }

          </Button>




          <p className="text-center text-sm text-muted-foreground">

            Already have an account?{" "}

            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>

          </p>



        </form>


      </CardContent>


    </Card>
  );
}