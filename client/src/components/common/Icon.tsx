import React, { FunctionComponent, SVGProps } from 'react';
import { ReactComponent as Heart } from 'assets/img/icons/heart-f.svg';
import { ReactComponent as Shield } from 'assets/img/icons/shield-f.svg';
import { ReactComponent as Sword } from 'assets/img/icons/sword-f.svg';
import { ReactComponent as Magic } from 'assets/img/icons/magic-f.svg';
import { ReactComponent as ChevronRight } from 'assets/img/icons/chevron-right.svg';
import { ReactComponent as Pencil } from 'assets/img/icons/pen-f.svg';
import { ReactComponent as Check } from 'assets/img/icons/check.svg';
import { ReactComponent as Close } from 'assets/img/icons/close.svg';
import { ReactComponent as VolumeMute } from 'assets/img/icons/volume-mute.svg';
import { ReactComponent as VolumeUp } from 'assets/img/icons/volume-up.svg';
import { ReactComponent as Crown } from 'assets/img/icons/crown-f.svg';

export enum IconName {
  HEART = 'heart',
  SHIELD = 'shield',
  SWORD = 'sword',
  MAGIC = 'magic',
  CHEVRON_RIGHT = 'chevron-right',
  PENCIL = 'pencil',
  CHECK = 'check',
  CLOSE = 'close',
  VOLUME_MUTE = 'volume-mute',
  VOLUME_UP = 'volume-up',
  CROWN = 'crown',
}

export enum IconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large',
}

const IconComponent: Record<
  string,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  [IconName.HEART]: Heart,
  [IconName.SHIELD]: Shield,
  [IconName.SWORD]: Sword,
  [IconName.MAGIC]: Magic,
  [IconName.CHEVRON_RIGHT]: ChevronRight,
  [IconName.PENCIL]: Pencil,
  [IconName.CHECK]: Check,
  [IconName.CLOSE]: Close,
  [IconName.VOLUME_MUTE]: VolumeMute,
  [IconName.VOLUME_UP]: VolumeUp,
  [IconName.CROWN]: Crown,
};

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: FunctionComponent<IconProps> = ({ icon, className }) => {
  const Svg = IconComponent[icon];

  return Svg ? <Svg className={className} /> : null;
};

export default Icon;
