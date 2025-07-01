import { SidebarTrigger } from "@/components/ui/sidebar"

interface HeaderProps {
  section: string;
}

const Header = ({ section }: HeaderProps) => { 
  return (    
    <div className="flex items-center justify-between p-4 border-b"> {/* Added some basic flex styling for layout */}
      <SidebarTrigger/>
      <h2>{section}</h2>
      <div className="flex items-center space-x-4"> {/* Group switch and avatar */}
      </div>
    </div>
  )
}

export default Header