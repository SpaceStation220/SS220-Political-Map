import { Icon } from 'tgui-core/components';

export function Mark(props) {
  const { icon, color, rotation, scale, position } = props;

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
      }}
    >
      <Icon name={icon || 'question'} color={color} rotation={rotation || 0} size={scale} />
    </div>
  );
}
