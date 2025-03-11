import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import player from "../assets/player.gif";
import { useApp } from "../contexts/AppContext";

const Game = () => {
  const [coinEffects, setCoinEffects] = useState([]);

  const { data, updateData } = useApp();

  const handleTap = () => {
    const newCoins = data.coins + 1;
    updateData({ coins: newCoins });
    const newEffect = { id: Date.now() };
    setCoinEffects([...coinEffects, newEffect]);

    setTimeout(() => {
      setCoinEffects((effects) =>
        effects.filter((effect) => effect.id !== newEffect.id)
      );
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white relative">
      {coinEffects.map((effect) => (
        <motion.div
          key={effect.id}
          className="absolute text-yellow-400 text-2xl font-bold"
          initial={{ opacity: 1, y: 0, rotate: 0 }}
          animate={{ opacity: 0, y: -300, rotate: 360 }}
          transition={{ duration: 1 }}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          🪙
        </motion.div>
      ))}

      <motion.button
        className="w-48 h-48 bg-yellow-500 rounded-full flex items-center justify-center text-black text-2xl font-bold shadow-lg cursor-pointer"
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
      >
        <img src={player} alt="Player" />
      </motion.button>
    </div>
  );
};

export default Game;
