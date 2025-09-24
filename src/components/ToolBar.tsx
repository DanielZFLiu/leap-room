import { useEffect, useState } from "react";
import styles from "./ToolBar.module.css";
import { type Icon } from "@phosphor-icons/react";

export type ToolbarProps = {
  buttons: {
    icon: Icon;
    label: string;
    onClick: () => void;
    rotate?: string;
  }[];
};

export default function ToolBar({ buttons }: ToolbarProps) {
  const [renderedButtons, setRenderedButtons] = useState(buttons);
  const [removing, setRemoving] = useState<number[]>([]);

  // handle new button list
  useEffect(() => {
    // find removed indexes
    const removed = renderedButtons.filter(
      (btn) => !buttons.find((b) => b.label === btn.label)
    );

    if (removed.length > 0) {
      // mark as removing
      setRemoving((prev) => [
        ...prev,
        ...removed.map((btn) =>
          renderedButtons.findIndex((b) => b.label === btn.label)
        ),
      ]);

      // actually remove after fadeOut animation
      const timeout = setTimeout(() => {
        setRenderedButtons(buttons);
        setRemoving([]);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      // update instantly if nothing removed
      setRenderedButtons(buttons);
    }
  }, [buttons]);

  return (
    <div className={styles.toolbar}>
      {renderedButtons.map((button, index) => {
        const isRemoving = removing.includes(index);
        return (
          <button
            key={button.label}
            onClick={button.onClick}
            className={`${styles.button} ${
              isRemoving ? styles.fadeOut : styles.fadeIn
            }`}
          >
            <button.icon
              size={16}
              style={{
                transform: button.rotate
                  ? `rotate(${button.rotate})`
                  : undefined,
              }}
            />
            {button.label}
          </button>
        );
      })}
    </div>
  );
}
