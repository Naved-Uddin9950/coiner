import React from "react";
import { Outlet } from "react-router-dom";
import { FiSettings, FiShoppingCart, FiXCircle } from "react-icons/fi";
import { useApp } from "./contexts/AppContext";
import { shopItems } from "./utils/shop";

const App = () => {
  const {
    showSettings,
    setShowSettings,
    showShop,
    setShowShop,
    settings,
    handleSettingsChange,
    reset,
    data,
    buyItem,
  } = useApp();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white relative">
      {/* Top Right Icons */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        {/* Coins Display */}
        <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full shadow-md">
          <span className="text-yellow-400 text-xl font-bold">
            {data.coins}
          </span>
          <span className="ml-1">🪙</span>
        </div>

        {/* Shop Button */}
        <button
          className="text-2xl text-white"
          aria-label="Shop"
          onClick={() => setShowShop(true)}
        >
          <FiShoppingCart />
        </button>

        {/* Settings Button */}
        <button
          className="text-2xl text-white"
          aria-label="Settings"
          onClick={() => setShowSettings(true)}
        >
          <FiSettings />
        </button>
      </div>

      <Outlet />

      {showSettings && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-sm h-96">
            <h2 className="text-2xl mb-4">Settings</h2>
            <div className="flex flex-col items-center mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="sound"
                  checked={settings.sound}
                  onChange={handleSettingsChange}
                  className="form-checkbox h-5 w-5 text-yellow-500"
                />
                <span>Sound</span>
              </label>
              {settings.sound && (
                <input
                  type="range"
                  name="volume"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={handleSettingsChange}
                  className="w-full mt-2"
                />
              )}
              <span className="text-sm">Volume: {settings.volume}%</span>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={reset}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
              >
                Reset Game
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showShop && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-sm h-96">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl mb-4 text-white"></h2>
              <h2 className="text-2xl mb-4 text-white">Shop</h2>
              <h2 className="text-2xl mb-4 text-white cursor-pointer" onClick={() => setShowShop(false)}>
                <FiXCircle />
              </h2>
            </div>

            {/* Shop Items List */}
            <div className="flex flex-col items-center mb-4 space-y-2 h-78 overflow-y-auto">
              {shopItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-700 w-full px-4 py-2 rounded-lg"
                >
                  <span className="text-white">
                    {item.name} - {item.price} coins
                  </span>
                  <button
                    onClick={() => buyItem(item)}
                    disabled={data.coins < item.price}
                    className={`px-3 py-1 rounded-lg text-white ${
                      data.coins >= item.price
                        ? "bg-green-500 hover:bg-green-400"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
