import { SidebarTrigger } from "@/components/ui/sidebar"

// Props del componente Header
interface HeaderProps {
  section: string;
}

// Componente de encabezado con trigger del sidebar
const Header = ({ section }: HeaderProps) => { 
  return (    
    <div className="flex items-center justify-between p-4 border-b">
      <SidebarTrigger/>
      <h2>{section}</h2>
      <div className="flex items-center space-x-4">
      </div>
    </div>
  )
}

export default Header