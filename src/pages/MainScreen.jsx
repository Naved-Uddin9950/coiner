import React from "react";
import { useApp } from "../contexts/AppContext";
import Button from "../components/Button";

const MainScreen = () => {
  const { gameStarted, handleNewGame } = useApp();

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-4xl font-bold mb-8">Coiner - Main Menu</h1>
      <div className="flex items-center gap-4">
        <Button disabled={!gameStarted}>Continue</Button>
        <Button onClick={handleNewGame}>New Game</Button>
      </div>
    </div>
  );
};

export default MainScreen;
