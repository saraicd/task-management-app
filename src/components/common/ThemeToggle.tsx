import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Input } from "../ui/input";

export const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label
      className="relative inline-flex items-center cursor-pointer"
      htmlFor="theme-toggle"
    >
      <Input
        id="theme-toggle"
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-checked={theme === "dark"}
        aria-label="Toggle dark mode"
      />
      <div
        className="w-11 h-6 bg-secondary rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 flex items-center justify-between px-1"
        role="switch"
        aria-checked={theme === "dark"}
      >
        <Sun className="w-4 h-4 text-brand" data-testid="sun" />
        <Moon className="w-4 h-4 text-gray-500" data-testid="moon" />
      </div>
      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
    </label>
  );
};
