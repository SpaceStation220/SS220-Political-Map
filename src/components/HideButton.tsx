import { classes } from "tgui-core/react";

type HideButtonProps = {
  checked: boolean;
  position?: "left" | "right";
  onClick: () => void;
};

export function HideButton(props: HideButtonProps) {
  const { checked, position = "right", onClick } = props;

  return (
    <button
      className={classes(["HideButton", `HideButton--${position}`, checked && "HideButton--checked"])}
      onClick={onClick}
    >
      <div />
      <div />
      <div />
    </button>
  );
}
