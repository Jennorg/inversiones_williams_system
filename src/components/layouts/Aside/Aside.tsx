import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

const Aside = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        Inventario
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
          Productos
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default Aside