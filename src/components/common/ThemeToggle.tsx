import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Input } from "../ui/input";

export const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <Input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="w-11 h-6 bg-secondary rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 flex items-center justify-between px-1">
        <Sun className="w-4 h-4 text-brand" />
        <Moon className="w-4 h-4 text-gray-500" />
      </div>
      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 flex items-center justify-center">
        <Sun className="w-3 h-3 text-brand" />
      </span>
      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
    </label>
  );
};
