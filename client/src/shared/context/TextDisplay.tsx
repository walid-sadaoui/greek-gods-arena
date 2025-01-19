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
    if (turnStatus.currentIndex < turnStatus.description.length) {
      setTurnStatus((prev) => ({
        ...prev,
        displayedText:
          prev.displayedText +
          turnStatus.description[turnStatus.currentIndex] +
          " ",
        currentIndex: prev.currentIndex + 1,
      }));
      // for (
      //   let i = 0;
      //   i < turnStatus.description[turnStatus.currentIndex].length;
      //   i++
      // ) {
      //   setTimeout(() => {
      //     setTurnStatus((prev) => ({
      //       ...prev,
      //       displayedText:
      //         prev.displayedText +
      //         turnStatus.description[turnStatus.currentIndex][i],
      //     }));
      //   }, i * 50);
      // }
    } else {
      setTurnStatus((prev) => ({
        ...prev,
        currentIndex: 0,
      }));
    }
  };

  useEffect(() => {
    if (turnStatus.description.length === 0) return;
    showNextText();
  }, [turnStatus.description]);

  return (
    <TextDisplayContext.Provider
      value={{ turnStatus, showNextText, setTurnStatus }}
    >
      {children}
    </TextDisplayContext.Provider>
  );
};
