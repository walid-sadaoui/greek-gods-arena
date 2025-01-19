import AppLink from "components/common/AppLink";
import Button from "components/common/Button";
import Icon, { IconName } from "components/common/Icon";
import React from "react";
import { useAudio } from "shared/context/audioContext";

const Header: React.FC = () => {
  const { toggleMute, isMuted } = useAudio();
  return (
    <div className="absolute top-0 right-0 flex flex-col gap-4 items-center p-2">
      <AppLink to="/">
        <Icon icon={IconName.ACROPOLIS} className="text-3xl" />
      </AppLink>
      <AppLink
        to={{ pathname: "https://github.com/walid-sadaoui/greek-gods-arena" }}
        target="_blank"
      >
        <Icon icon={IconName.GITHUB} className="text-3xl" />
      </AppLink>
      <Button onClick={toggleMute}>
        <Icon
          icon={isMuted ? IconName.VOLUME_MUTE : IconName.VOLUME_UP}
          className="text-3xl"
        />
      </Button>
    </div>
  );
};

// const Header: React.FC = () => {
//   return (
//     <header className="flex items-center justify-between w-full p-2 text-white bg-gray-900 bg-opacity-50 sm:p-2">
//       <Link
//         to="/"
//         className="px-4 py-2 rounded-container font-greek hover:bg-white hover:text-black"
//       >
//         Home
//       </Link>
//       <Link
//         to={{ pathname: "https://github.com/walid-sadaoui/greek-gods-arena" }}
//         target="_blank"
//         className="p-2 rounded-container hover:bg-white hover:text-black"
//       >
//         <Icon icon={IconName.GITHUB} className="text-3xl" />
//       </Link>
//     </header>
//   );
// };

export default Header;
