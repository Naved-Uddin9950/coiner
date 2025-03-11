import React, { createContext, useContext, useState, useEffect } from "react";
import { SETTINGS } from "../utils/settings";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(SETTINGS);

  useEffect(() => {
    const savedGame = localStorage.getItem("gameData");
    if (savedGame) {
      setGameStarted(true);
    }
    const savedSettings = localStorage.getItem("gameSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleNewGame = () => {
    localStorage.setItem("gameData", JSON.stringify({ coins: 0 }));
    setGameStarted(true);
  };

  const handleSettingsChange = (e) => {
    const newSettings = {
      ...settings,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    setSettings(newSettings);
    localStorage.setItem("gameSettings", JSON.stringify(newSettings));
  };

  const reset = () => {
    localStorage.clear();
    setGameStarted(false);
    setSettings(SETTINGS);
    setShowSettings(false);
  };

  return (
    <AppContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        showSettings,
        setShowSettings,
        settings,
        setSettings,
        handleNewGame,
        handleSettingsChange,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
