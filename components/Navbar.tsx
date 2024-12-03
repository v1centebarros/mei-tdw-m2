import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Settings } from 'lucide-react'
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { Collection } from "@/components/Collection";

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
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Language</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value="en">
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="de">Deutsch</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Currency</span>
                </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value="usd">
                  <DropdownMenuRadioItem value="usd">USD ($)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="eur">EUR (€)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="gbp">GBP (£)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="jpy">JPY (¥)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </nav>
  )
}

