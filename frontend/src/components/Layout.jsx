import AppSidebar from "./app-sidebar"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { Outlet } from "react-router-dom"


export default function Layout(){
    return(
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger/>
                <Outlet/>
            </main>
        </SidebarProvider>
    )
}