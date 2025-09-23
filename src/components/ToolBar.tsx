import styles from "./ToolBar.module.css";
import { type Icon } from "@phosphor-icons/react";
export type ToolbarProps = {
  buttons: { icon: Icon; label: string; onClick: () => void }[];
};

export default function ToolBar({ buttons }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      {buttons.map((button, index) => (
        <button key={index} onClick={button.onClick}>
          <button.icon size={16} />
          {button.label}
        </button>
      ))}
    </div>
  );
}
