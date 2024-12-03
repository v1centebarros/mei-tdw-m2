import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from 'lucide-react'
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { Collection } from "@/components/Collection";
import SettingsDropdown from "@/components/SettingsDropdown";
export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b-2 border-accent">
      <Link href="/" className="flex-1 text-2xl font-bold ml-4">
        <Image src={"/logo.png"} alt={"Magic The Gathering"} width={164} height={74} />
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/builder" className="text-foreground hover:underline underline-offset-2">
          Deck Builder
        </Link>
        <Link href="/comparison" className="text-foreground hover:underline underline-offset-2">
          Card Comparison
        </Link>
        <Collection />
        <Link href="/search" className="text-foreground hover:underline underline-offset-2">
          Advanced Search
        </Link>

        <div className="relative">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Open settings menu</span>
            </Button>
          </DropdownMenuTrigger>
          <SettingsDropdown />
        </DropdownMenu>
        <ModeToggle />
      </div>
    </nav>
  )
}

