import { CSSProperties, ReactNode } from 'react';
import { Icon } from 'tgui-core/components';
import { classes } from 'tgui-core/react';

type ButtonProps = Partial<{
  children: ReactNode;
  fluid: boolean;
  icon: string;
  style?: CSSProperties;
  onClick: () => void;
}>;

export function Button(props: ButtonProps) {
  const { children, style, fluid, icon, onClick } = props;
  return (
    <button className={classes(['Button', fluid && 'Button--fluid'])} style={style} onClick={onClick}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}
