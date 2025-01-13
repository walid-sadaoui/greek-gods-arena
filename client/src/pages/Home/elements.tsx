import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-gga.svg";

export const HowToPlay: React.FC = () => {
  return (
    <article className="flex flex-col items-center justify-center h-full">
      <h3 className="pb-4 text-xl font-greek">How To Play</h3>
      <div className="w-full p-4 overflow-y-auto text-justify">
        <p className="pb-4">
          You can add Greek Gods to your characters list or improve the Greek
          Gods you already own by clicking on "Manage your Greek Gods". You
          cannot own more than 10 Greek Gods.
        </p>
        <p className="pb-4">
          Click on "Play". Select your Greek God, improve its skills if you want
          and click on "Start The Fight". An opponent will be automatically
          chosen based on your selected Greek God level.
        </p>
        <p className="pb-4">
          You can now process the fight and discover if your Greek God can reach
          the top of The Olympus !
        </p>
      </div>
    </article>
  );
};

export const Menu: React.FC = () => {
  return (
    <article className="flex flex-col items-center justify-center flex-1 w-full h-full gap-10 p-4">
      <img src={logo} alt={`gga-logo`} className="h-1/4" />
      <Link
        className="relative group w-64 h-28 text-white font-bold text-lg transition-transform duration-300 hover:scale-105"
        to="/lobby"
      >
        {/* Bordure sombre */}
        <div
          className="absolute inset-0 bg-yellow-800"
          style={{
            clipPath: "polygon(0 11%, 100% 0, 96% 93%, 10% 99%)",
          }}
        ></div>
        {/* Bouton principal */}
        <div
          className="absolute flex items-center justify-center inset-1 bg-gradient-to-b from-yellow-500 to-yellow-700"
          style={{
            clipPath: "polygon(0 11%, 100% 0, 96% 93%, 10% 99%)",
          }}
        >
          {/* Contenu du bouton */}
          <span className="z-10 font-greek text-6xl text-outline">Play</span>
        </div>
      </Link>
    </article>
  );
};
