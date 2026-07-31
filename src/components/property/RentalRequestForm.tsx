"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { rentalSchema, RentalFormData } from "@/lib/validations/rental";
import { createRentalRequest } from "@/services/rental.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  propertyId: string;
}

export default function RentalRequestForm({
  propertyId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalSchema),

    defaultValues: {
      duration: 1,
      message: "",
    },
  });

  const onSubmit = async (data: RentalFormData) => {
    try {
      await createRentalRequest({
        propertyId,
        ...data,
      });

      toast.success("Rental request submitted successfully.");

      reset();

      setOpen(false);

      router.push("/dashboard/tenant");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button size="lg">
          Request to Rent
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Request to Rent
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>

            <label className="mb-2 block text-sm font-medium">
              Move-in Date
            </label>

            <Input
              type="date"
              {...register("moveInDate")}
            />

            {errors.moveInDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.moveInDate.message}
              </p>
            )}
          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Duration (Months)
            </label>

            <Input
              type="number"
              {...register("duration", {
                valueAsNumber: true,
              })}
            />

            {errors.duration && (
              <p className="mt-1 text-sm text-red-500">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Message
            </label>

            <Textarea
              rows={4}
              placeholder="Write a short message..."
              {...register("message")}
            />

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Request"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}