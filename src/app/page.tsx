"use client";

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

// data
import { sampleSpaces } from "@/data/data";

// style
import styles from "./page.module.css";

// types
import type { ToolbarProps } from "@/components/ToolBar";

/* -------------------------------------------------------------------------- */
/*                             types and constants                            */
/* -------------------------------------------------------------------------- */
type ToolbarButtons = ToolbarProps["buttons"];

export default function Home() {
  // states
  const [mode, setMode] = useState<"main" | "carousel">("main");
  const [currentSpace, setCurrentSpace] = useState(0);

  // toolbar buttons
  const mainViewButtons: ToolbarButtons = [
    { icon: SignOutIcon, label: "Exit", onClick: () => {}, rotate: "180deg" },
    {
      icon: PauseIcon,
      label: "My Spaces",
      onClick: () => {
        setMode("carousel");
      },
    },
    { icon: ShareNetworkIcon, label: "Share", onClick: () => {} },
  ];
  const carouselViewButtons: ToolbarButtons = [
    {
      icon: CheckIcon,
      label: "Done",
      onClick: () => {
        setMode("main");
      },
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                   render                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <main className={styles["main-canvas"]}>
      <ToolBar
        buttons={mode === "main" ? mainViewButtons : carouselViewButtons}
      />

      {mode === "carousel" ? (
        <Carousel
          spaces={sampleSpaces}
          currentSpaceInd={currentSpace}
          setCurrentSpaceInd={setCurrentSpace}
        />
      ) : (
        <img
          src={sampleSpaces[currentSpace].src}
          alt={sampleSpaces[currentSpace].name}
          className={styles["main-img"]}
        />
      )}
    </main>
  );
}
