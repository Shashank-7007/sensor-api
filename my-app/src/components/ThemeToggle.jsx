export default function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 16px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        background: theme === "dark" ? "#38bdf8" : "#020617",
        color: theme === "dark" ? "#020617" : "#f8fafc",
        marginBottom: "20px"
      }}
    >
      {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
