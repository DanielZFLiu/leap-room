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
  return (
    <div className={styles.toolbar}>
      {buttons.map((button, index) => (
        <button key={index} onClick={button.onClick} className={styles.button}>
          <button.icon
            size={16}
            style={{
              transform: button.rotate ? `rotate(${button.rotate})` : undefined,
            }}
          />
          {button.label}
        </button>
      ))}
    </div>
  );
}
