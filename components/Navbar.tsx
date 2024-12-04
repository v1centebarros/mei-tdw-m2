import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { Collection } from "@/components/Collection";
import SettingsDropdown from "@/components/SettingsDropdown";
export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b-2 border-accent bg-background p-4">
      <Link href="/" className="ml-4 flex-1 text-2xl font-bold">
        <Image
          src={"/logo.png"}
          alt={"Magic The Gathering"}
          width={164}
          height={74}
        />
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/builder"
          className="text-foreground underline-offset-2 hover:underline"
        >
          Deck Builder
        </Link>
        <Link
          href="/comparison"
          className="text-foreground underline-offset-2 hover:underline"
        >
          Card Comparison
        </Link>
        <Collection />
        <Link
          href="/search"
          className="text-foreground underline-offset-2 hover:underline"
        >
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
  );
}
