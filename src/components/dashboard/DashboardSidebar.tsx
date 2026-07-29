"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { dashboardMenu } from "@/config/dashboardMenu";


export default function DashboardSidebar() {

  const { user } = useAuth();


  if (!user) {
    return null;
  }


  const menus =
    dashboardMenu[user.role];


  return (
    <aside className="w-64 min-h-screen border-r bg-background p-5">


      <h2 className="text-2xl font-bold mb-8">
        RentNest 🏠
      </h2>



      <nav className="space-y-2">


        {menus.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className="
              block
              rounded-md
              px-4
              py-2
              hover:bg-accent
            "
          >
            {item.title}
          </Link>

        ))}


      </nav>


    </aside>
  );
}