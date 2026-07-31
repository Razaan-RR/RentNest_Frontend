import { apiRequest } from "@/lib/api"


export const getCategories = async()=>{

 return apiRequest(
   "/categories",
   {
     method:"GET"
   }
 )

}