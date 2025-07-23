import { classes } from "tgui-core/react";

type HideButtonProps = {
  checked: boolean;
  onClick: () => void;
};

export function HideButton(props: HideButtonProps) {
  const { checked, onClick } = props;

  return (
    <button className={classes(["HideButton", checked && "HideButton--checked"])} onClick={onClick}>
      <div />
      <div />
      <div />
    </button>
  );
}
