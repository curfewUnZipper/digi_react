import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Live from "./pages/Live";
import Analytics from "./pages/Analytics";
import Residuals from "./pages/Residuals";
import Forecast from "./pages/Forecast";
import Metrics from "./pages/Metrics";
import Logs from "./pages/Logs";
import MobileNav from "./components/MobileNav";

export default function App() {

  const [activeTab, setActiveTab] = useState("Live");

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {

    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    document.body.className = newTheme;
  };

  const renderPage = () => {

    switch(activeTab) {

      case "Analytics":
        return <Analytics />;

      case "Residuals":
        return <Residuals />;

      case "Forecast":
        return <Forecast />;

      case "Metrics":
        return <Metrics />;

      case "Logs":
        return <Logs />;

      default:
        return <Live />;
    }
  };

  return (

    <div className="min-h-screen flex grid-bg">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 p-4 md:p-8">

        <Topbar toggleTheme={toggleTheme} />

        {renderPage()}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      </main>

    </div>
  );
}