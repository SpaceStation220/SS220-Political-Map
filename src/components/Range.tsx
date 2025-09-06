type RangeProps = {
  minValue: number;
  value: number;
  maxValue: number;
  setValue?: (value: number) => void;
};

export function Range(props: RangeProps) {
  const { minValue, value, maxValue, setValue } = props;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="range"
        min={minValue}
        value={value}
        max={maxValue}
        onMouseDown={() => document.documentElement.classList.add('dragging')}
        onMouseUp={() => document.documentElement.classList.remove('dragging')}
        onChange={(event) => setValue?.(event.target.valueAsNumber)}
      />
      <span>{value}</span>
    </div>
  );
}
