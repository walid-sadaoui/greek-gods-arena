import React, { createContext, useContext, useEffect, useState } from "react";

interface TextDisplayContextProps {
  displayedText: string;
  showNextText: () => void;
  setTurnDescription: (description: string[]) => void;
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
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [turnDescription, setTurnDescription] = useState<string[]>([]);

  const showNextText = () => {
    if (currentIndex < turnDescription.length) {
      console.error({ turnDescription: turnDescription[currentIndex] });
      console.error({ currentIndex });
      console.error({ currentCharIndex });
      console.error({ currentCharIndex: turnDescription[currentIndex].length });
      if (currentCharIndex < turnDescription[currentIndex].length) {
        setTimeout(() => {
          setDisplayedText(
            (prev) => prev + turnDescription[currentIndex][currentCharIndex]
          );
          setCurrentCharIndex((prev) => prev + 1);
        }, 10);
      } else {
        setDisplayedText((prev) => prev + "\n");
        setCurrentIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }
  };

  useEffect(() => {
    showNextText();
  }, [turnDescription, currentIndex, currentCharIndex]);

  return (
    <TextDisplayContext.Provider
      value={{ displayedText, showNextText, setTurnDescription }}
    >
      {children}
    </TextDisplayContext.Provider>
  );
};
