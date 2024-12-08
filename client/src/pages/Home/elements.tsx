import Icon, { IconName } from 'components/common/Icon';
import { GreekGodsArray } from 'models/Character';
import React from 'react';
import { Link } from 'react-router-dom';
// import Button from 'components/common/Button';

export const HowToPlay: React.FC = () => {
  return (
    <article className='flex flex-col items-center justify-center h-full'>
      <h3 className='pb-4 text-xl font-greek'>How To Play</h3>
      <div className='w-full p-4 overflow-y-auto text-justify'>
        <p className='pb-4'>
          You can add Greek Gods to your characters list or improve the Greek
          Gods you already own by clicking on "Manage your Greek Gods". You
          cannot own more than 10 Greek Gods.
        </p>
        <p className='pb-4'>
          Click on "Play". Select your Greek God, improve its skills if you want
          and click on "Start The Fight". An opponent will be automatically
          chosen based on your selected Greek God level.
        </p>
        <p className='pb-4'>
          You can now process the fight and discover if your Greek God can reach
          the top of The Olympus !
        </p>
      </div>
    </article>
  );
};

export const Menu: React.FC = () => {
  return (
    <article className='flex flex-col items-center justify-center flex-1 w-full h-full gap-10 p-4'>
      <h1 className='text-white text-8xl font-greek text-outline'>
        Greek Gods Arena
      </h1>
      <div className='flex items-center'>
        {GreekGodsArray.map((god) => {
          return (
            <img
              src={`/greek-gods/${god}.svg`}
              alt={`${god}`}
              className='h-20'
            />
          );
        })}
      </div>
      <Link className='mx-auto' to='/lobby'>
        {/* <Button type='button' className='py-2 text-6xl'>
          Play
        </Button> */}
        <button className='flex items-center px-5 py-5 text-3xl font-extrabold tracking-wide text-white uppercase transition-all duration-300 transform bg-yellow-400 border-4 border-black rounded-full shadow-lg hover:bg-yellow-500 hover:translate-y-1'>
          {/* <span className='text-6xl text-black'>⚡</span> */}
          Play
          {/* <span className='text-6xl text-black'>🌩️</span> */}
        </button>
      </Link>
    </article>
  );
};
