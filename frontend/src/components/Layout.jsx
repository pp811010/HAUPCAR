import AppSidebar from "./app-sidebar"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"


export default function Layout(){
    return(
        <SidebarProvider>
            <AppSidebar/>
            <main className="flex-1 min-w-0 flex flex-col h-screen">
                <div className="flex items-center gap-3 border-b border-gray-200 py-2 px-5 shrink-0">
                    <SidebarTrigger/> 
                    <p className="text-sm font-semibold text-black">ข้อมูลรถยนต์</p>
                </div>
                <div className="flex-1 bg-zinc-50 p-5 overflow-auto">
                    <Outlet/>
                </div>
            </main>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </SidebarProvider>
    )
}