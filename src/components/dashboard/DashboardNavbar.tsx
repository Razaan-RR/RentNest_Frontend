"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";


export default function DashboardNavbar(){

  const {
    user,
    logout
  } = useAuth();



  return (

    <header
      className="
      h-16
      border-b
      flex
      items-center
      justify-between
      px-6
      "
    >

      <div>

        <h1 className="font-semibold">
          Dashboard
        </h1>

      </div>


      <div className="flex items-center gap-4">


        <div className="text-right">

          <p className="font-medium">
            {user?.name}
          </p>

          <p className="text-sm text-muted-foreground">
            {user?.role}
          </p>

        </div>



        <Button
          variant="outline"
          onClick={logout}
        >
          Logout
        </Button>


      </div>


    </header>

  );
}