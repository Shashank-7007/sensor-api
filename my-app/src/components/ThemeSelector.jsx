export default function ThemeSelector({ theme, setTheme }) {
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark" : "☀ Light"}
    </button>
  );
}
