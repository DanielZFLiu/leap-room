'use client'

// external
import {
  PauseIcon,
  SignOutIcon,
  ShareNetworkIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

// internal
import ToolBar from "@/components/ToolBar";
import type { ToolbarProps } from "@/components/ToolBar";
type ToolbarButtons = ToolbarProps["buttons"];

const mainViewButtons: ToolbarButtons = [
  { icon: SignOutIcon, label: "Exit", onClick: () => {} },
  { icon: PauseIcon, label: "My Spaces", onClick: () => {} },
  { icon: ShareNetworkIcon, label: "Share", onClick: () => {} },
];
const carouselViewButtons: ToolbarButtons = [
  { icon: CheckIcon, label: "Done", onClick: () => {} },
];

export default function Home() {
  const [mode, setMode] = useState<"main" | "carousel">("main");
  return (
    <main>
      <ToolBar
        buttons={mode === "main" ? mainViewButtons : carouselViewButtons}
      />
    </main>
  );
}
