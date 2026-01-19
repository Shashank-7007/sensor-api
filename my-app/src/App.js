import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import ThemeSelector from "./components/ThemeSelector";
import "./styles/theme.css";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <Dashboard />
    </>
  );
}
