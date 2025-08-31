import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminPage from "./components/dashboard/AdminPage"
import AllRooms from "./components/bookings/AllRooms"


export default async function Home() {
  const session = await auth()
  console.log("line 6",session)

  if (!session) {
    redirect("/login")
  }

  return (
    <div>
     {
      session?.user?.role==="admin" ? (<div>
        <h1>Admin Dashboard</h1>
        <AdminPage/>
        </div> ): (<div>
          <AllRooms/>
        </div>)
     }
    </div>
  )
}
