import React, { FunctionComponent, SVGProps } from "react";
import { ReactComponent as Heart } from "assets/images/icons/heart-f.svg";
import { ReactComponent as Shield } from "assets/images/icons/shield-f.svg";
import { ReactComponent as Sword } from "assets/images/icons/sword-f.svg";
import { ReactComponent as Magic } from "assets/images/icons/magic-f.svg";
import { ReactComponent as ChevronRight } from "assets/images/icons/chevron-right.svg";
import { ReactComponent as Pencil } from "assets/images/icons/pen-f.svg";
import { ReactComponent as Check } from "assets/images/icons/check.svg";
import { ReactComponent as Close } from "assets/images/icons/close.svg";
import { ReactComponent as VolumeMute } from "assets/images/icons/volume-mute.svg";
import { ReactComponent as VolumeUp } from "assets/images/icons/volume-up.svg";
import { ReactComponent as Back } from "assets/images/icons/back.svg";
import { ReactComponent as Github } from "assets/images/icons/github.svg";
import { ReactComponent as LaurelCrown } from "assets/images/icons/laurel-crown.svg";
import { ReactComponent as Acropolis } from "assets/images/icons/acropolis.svg";

export enum IconName {
  HEART = "heart",
  SHIELD = "shield",
  SWORD = "sword",
  MAGIC = "magic",
  CHEVRON_RIGHT = "chevron-right",
  PENCIL = "pencil",
  CHECK = "check",
  CLOSE = "close",
  VOLUME_MUTE = "volume-mute",
  VOLUME_UP = "volume-up",
  BACK = "back",
  GITHUB = "github",
  LAUREL_CROWN = "laurel-crown",
  ACROPOLIS = "acropolis",
}

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  X_LARGE = "x-large",
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
  [IconName.BACK]: Back,
  [IconName.GITHUB]: Github,
  [IconName.LAUREL_CROWN]: LaurelCrown,
  [IconName.ACROPOLIS]: Acropolis,
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
