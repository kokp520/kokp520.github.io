import React, { createContext, useContext, useState } from "react";

const AppWindowsContext = createContext();

export const useAppWindows = () => useContext(AppWindowsContext);

export const AppWindowsProvider = ({ children }) => {
  const [openApps, setOpenApps] = useState([]); // [{id, name, icon}]

  const openApp = (app) => {
    setOpenApps((prev) => prev.find(a => a.id === app.id) ? prev : [...prev, app]);
  };

  const closeApp = (id) => {
    setOpenApps((prev) => prev.filter(app => app.id !== id));
  };

  return (
    <AppWindowsContext.Provider value={{ openApps, openApp, closeApp }}>
      {children}
    </AppWindowsContext.Provider>
  );
}; 