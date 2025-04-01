
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Toggle 
      pressed={theme === "dark"} 
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full p-2"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
}
