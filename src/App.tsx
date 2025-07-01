import Aside from '@/components/layouts/Aside/Aside'
import { SidebarProvider } from "@/components/ui/sidebar"
import { ToastProvider } from "@/components/ui/toast"
import { ModalProvider } from "@/components/ui/modal"
import Header from '@/components/layouts/Header/Header'
import DataTable from '@/components/layouts/Products/Products_Table'

// Main application component with global providers
function App() {
  
  return (
    <ModalProvider>
      <ToastProvider>
    <SidebarProvider>
      <Aside />
      <main className='w-full'>
        <Header section='Productos'/>
        <DataTable/>
      </main>
        </SidebarProvider>
      </ToastProvider>
    </ModalProvider>
  )
}

export default App