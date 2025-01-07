import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Fight } from "models/Fight";
import { Character } from "models/Character";

const Opponent: React.FC<{ oppponent: Character }> = ({ oppponent }) => {
  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      <img
        src={`/greek-gods/${oppponent.name}.svg`}
        alt={`${oppponent.name}`}
        className="m-4 h-96"
      />
      <span className="text-3xl font-black text-white font-greek">
        {oppponent.name}
      </span>
    </div>
  );
};

const Room: React.FC = () => {
  const { state } = useLocation<{ fight: Fight }>();
  const { fight } = state;

  return (
    <section className="flex flex-col items-center justify-end w-full h-full p-4">
      <Link
        className="flex items-center px-12 py-5 mx-auto text-6xl font-extrabold tracking-wide text-white uppercase transition-all duration-300 transform bg-yellow-400 border-4 border-black rounded-full shadow-lg hover:bg-yellow-500 hover:translate-y-1"
        to={`/arena/${fight._id}`}
      >
        Fight
      </Link>
      <div className="flex items-center justify-center p-4">
        <Opponent oppponent={fight.firstOpponent} />
        <span className="text-6xl font-greek">VS</span>
        <Opponent oppponent={fight.secondOpponent} />
      </div>
    </section>
  );
};

export default Room;
