import React, { createContext, useContext, useEffect, useState } from "react";

interface TextDisplayContextProps {
  turnStatus: {
    description: string[];
    currentIndex: number;
    displayedText: string;
  };
  showNextText: () => void;
  setTurnStatus: (turnStatus: {
    description: string[];
    currentIndex: number;
    displayedText: string;
  }) => void;
}

const TextDisplayContext = createContext<TextDisplayContextProps | undefined>(
  undefined
);

export const useTextDisplay = (): TextDisplayContextProps => {
  const context = useContext(TextDisplayContext);
  if (!context) {
    throw new Error("useTextDisplay must be used within a TextDisplayProvider");
  }
  return context;
};

export const TextDisplayProvider: React.FC = ({ children }) => {
  // const [displayedText, setDisplayedText] = useState<string>("");
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [turnDescription, setTurnDescription] = useState<string[]>([]);
  const [turnStatus, setTurnStatus] = useState<{
    description: string[];
    currentIndex: number;
    displayedText: string;
  }>({
    description: [],
    currentIndex: 0,
    displayedText: "",
  });

  const showNextText = (): void => {
    // tableau de turn description. J'arrive sur le fightRing je remplis le tableau pour depart
    // Et j'affiche le texte
    // Je clique sur begin, je remplis le tableau pour le 1er tour (currentIndex + 1)
    // J'affiche le premier message du tableau
    console.error("showNextText");
    console.error({ currentIndex: turnStatus.currentIndex });
    console.error({
      turnDescriptionIndex: turnStatus.description[turnStatus.currentIndex],
    });
    if (turnStatus.currentIndex < turnStatus.description.length) {
      for (
        let i = 0;
        i < turnStatus.description[turnStatus.currentIndex].length;
        i++
      ) {
        setTimeout(() => {
          // setDisplayedText((prev) => prev + turnStatus.description[turnStatus.currentIndex][i]);
          setTurnStatus((prev) => ({
            ...prev,
            displayedText:
              prev.displayedText +
              turnStatus.description[turnStatus.currentIndex][i],
          }));
        }, 20);
      }
      setTurnStatus((prev) => ({
        ...prev,
        displayedText: prev.displayedText + " ",
        currentIndex: prev.currentIndex + 1,
      }));
      // setDisplayedText((prev) => prev + " ");
      // setCurrentIndex((prev) => prev + 1);
    } else {
      setTurnStatus((prev) => ({
        ...prev,
        currentIndex: 0,
      }));
      // setCurrentIndex(0);
    }
    console.error({ displayedText: turnStatus.displayedText });
  };

  useEffect(() => {
    if (turnStatus.description.length === 0) return;
    console.error({ turnDescription: turnStatus.description });
    // setDisplayedText("");
    // setCurrentIndex(0);
    setTimeout(() => {
      showNextText();
    }, 500);
  }, [turnStatus.description]);

  // useEffect(() => {
  //   if (turnDescription.length === 0) return;
  //   console.error({ turnDescription });
  //   setDisplayedText("");
  //   setCurrentIndex(0);
  //   showNextText();
  // }, [turnDescription]);

  return (
    <TextDisplayContext.Provider
      value={{ turnStatus, showNextText, setTurnStatus }}
    >
      {children}
    </TextDisplayContext.Provider>
  );
};
