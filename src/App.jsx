import React from "react";
import { Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { useApp } from "./contexts/AppContext";

const App = () => {
  const {
    showSettings,
    setShowSettings,
    settings,
    handleSettingsChange,
    reset,
  } = useApp();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white relative">
      <button
        className="absolute top-4 right-4 text-2xl text-white"
        aria-label="Settings"
        onClick={() => setShowSettings(true)}
      >
        <FiSettings />
      </button>

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
    </div>
  );
};

export default App;
