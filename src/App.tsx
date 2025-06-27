import Aside from '@/components/layouts/Aside/Aside'

import { SidebarProvider } from "@/components/ui/sidebar"
import Header from '@/components/layouts/Header/Header'

import { columns, type Payment } from "@/components/layouts/Products/Products_data"
import { DataTable } from "@/components/layouts/Products/Products_Table"

function App() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 1250,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "3a6c9b8d",
      amount: 7500,
      status: "success",
      email: "user123@yahoo.com",
    },
    {
      id: "c1b2a3d4",
      amount: 300,
      status: "failed",
      email: "jane.doe@outlook.com",
    },
    {
      id: "e5f6g7h8",
      amount: 99.99,
      status: "pending",
      email: "testing@mail.com",
    },
    {
      id: "f9j0k1l2",
      amount: 500.50,
      status: "success",
      email: "alpha.beta@company.org",
    },
    {
      id: "m3n4o5p6",
      amount: 120.00,
      status: "processing",
      email: "dev.null@info.net",
    },
    {
      id: "q7r8s9t0",
      amount: 888.88,
      status: "failed",
      email: "bad.email@domain.xyz",
    },
  ]

  return (
    <SidebarProvider>
      <Aside />
      <main className='w-full'>
        <Header section='Productos'/>
        <DataTable columns={columns} data={data}/>
      </main>
    </ SidebarProvider>
  )
}

export default App