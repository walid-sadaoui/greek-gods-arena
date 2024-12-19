import React, { SetStateAction, useEffect } from 'react';
import { Universe } from 'models/Universe';
import { getUniverses } from 'api/universes';

type UniverseContextProps = {
  universes: Universe[];
  universeSelected: Universe | undefined;
  setUniverses: React.Dispatch<SetStateAction<Universe[]>>;
  setUniverseSelected: React.Dispatch<SetStateAction<Universe | undefined>>;
};

const UniverseContext = React.createContext<UniverseContextProps | undefined>(
  undefined
);

const useUniverse = (): UniverseContextProps => {
  const universeContext = React.useContext(UniverseContext);
  if (universeContext === undefined)
    throw new Error('useUniverse must be used within an UniverseProvider');
  return universeContext;
};

const UniverseProvider: React.FC = ({ children }) => {
  const [universes, setUniverses] = React.useState<Universe[]>([]);
  const [universeSelected, setUniverseSelected] = React.useState<
    Universe | undefined
  >(undefined);

  useEffect(() => {
    const fetchUniverses = async (): Promise<void> => {
      const { data } = await getUniverses();
      if (data && data.universes.length > 0) {
        setUniverses(data.universes);
        setUniverseSelected(data.universes[0]);
      }
    };
    fetchUniverses();
  }, []);

  return (
    <UniverseContext.Provider
      value={{ universes, setUniverses, universeSelected, setUniverseSelected }}
    >
      {children}
    </UniverseContext.Provider>
  );
};

export { UniverseProvider, useUniverse };
