import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { Icon, Tooltip } from 'tgui-core/components';
import { classes } from 'tgui-core/react';

export function Preferences() {
  const [circlesDisabled, setCirclesDisabled] = useLocalStorage('circles-disabled', false);
  const [spaceBackground, setSpaceBackground] = useLocalStorage('space-background', true);
  const [backdropBlur, setBackdropBlur] = useLocalStorage('backdrop-blur', true);

  useEffect(() => {
    if (backdropBlur) {
      document.documentElement.classList.remove('blur-disabled');
    } else {
      document.documentElement.classList.add('blur-disabled');
    }
  }, [backdropBlur]);

  return (
    <div className="Preferences">
      <PreferenceButton
        icon="circle-o"
        tooltip={`${circlesDisabled ? 'Включить' : 'Выключить'} круги`}
        selected={circlesDisabled}
        onClick={() => setCirclesDisabled(!circlesDisabled)}
      />
      <PreferenceButton
        icon="star"
        tooltip={`${spaceBackground ? 'Выключить' : 'Включить'} звёзды`}
        selected={!spaceBackground}
        onClick={() => setSpaceBackground(!spaceBackground)}
      />
      <PreferenceButton
        icon="droplet"
        tooltip={`${backdropBlur ? 'Выключить' : 'Включить'} эффекты размытия`}
        selected={!backdropBlur}
        onClick={() => setBackdropBlur(!backdropBlur)}
      />
    </div>
  );
}

type PreferenceButtonProps = {
  icon: string;
  tooltip: string;
  selected: boolean;
  onClick: () => void;
};

function PreferenceButton(props: PreferenceButtonProps) {
  const { icon, tooltip, selected, onClick } = props;
  return (
    <Tooltip content={tooltip}>
      <button className={classes(['PreferencesButton', selected && 'PreferencesButton--selected'])} onClick={onClick}>
        <Icon name={icon} />
        {selected && <Icon name="slash" />}
      </button>
    </Tooltip>
  );
}
