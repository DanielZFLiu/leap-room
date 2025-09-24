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
// components
import ToolBar from "@/components/ToolBar";
import Carousel from "@/components/Carousel";

// style
import styles from "./page.module.css";

// types
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

const sampleImages = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
]


export default function Home() {
  const [mode, setMode] = useState<"main" | "carousel">("main");
  return (
    <main className={styles.main}>
      <ToolBar
        buttons={mode === "main" ? mainViewButtons : carouselViewButtons}
      />
      <Carousel images={sampleImages} />
    </main>
  );
}
