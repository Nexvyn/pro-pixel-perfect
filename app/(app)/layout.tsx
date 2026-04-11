import { Navbar } from "@/components/features/home/navbar"
import { Footer } from "@/components/features/home/footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
