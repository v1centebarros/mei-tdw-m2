"use client";

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettingsStore } from "@/lib/stores/settingsStore";

export default function SettingsDropdown() {
  const { language, currency, setLanguage,setCurrency } = useSettingsStore();

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Settings</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <span>Language</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="de">Deutsch</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="it">Italiano</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pt">Português</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <span>Currency</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={currency}
            onValueChange={(value) => setCurrency(value)}
          >
            <DropdownMenuRadioItem value="usd">USD ($)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="eur">EUR (€)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tix">TIX (MTG)</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  );
}
