import React, { createContext, useContext, useState, useEffect } from "react";
import { SETTINGS } from "../utils/settings";
import { GAME } from "../utils/game";
import { ROUTES } from "../utils/routeConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [settings, setSettings] = useState(SETTINGS);
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("gameData")) || GAME;
  });
  const navigate = useNavigate();

  const handleNewGame = () => {
    localStorage.setItem("gameData", JSON.stringify(GAME));
    setGameStarted(true);
    navigate(ROUTES.GAME);
  };

  const handleContinueGame = () => {
    setGameStarted(true);
    navigate(ROUTES.GAME);
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
    setData(GAME);
    toast.success("Game reset successfully !");
  };

  const updateData = (newData) => {
    setData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      localStorage.setItem("gameData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const buyItem = (item) => {
    if (data.coins >= item.price) {
      updateData({ coins: data.coins - item.price });
      toast.success(`You bought ${item.name}!`);
    }
  };

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

  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(data));
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        showSettings,
        setShowSettings,
        showShop,
        setShowShop,
        settings,
        setSettings,
        handleContinueGame,
        handleNewGame,
        handleSettingsChange,
        reset,
        data,
        setData,
        updateData,
        buyItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
