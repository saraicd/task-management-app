import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DarkModeToggle } from "../common/ThemeToggle";
import { Button } from "../ui/button";
import { linkList } from "../../data/Navigation";
import { cn } from "../../lib/utils";
import { Menu } from "lucide-react";

const Sidebar = ({ onSelect }: { onSelect: (component: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState("Home");

  const handleClick = (label: string) => {
    onSelect(label);
    setSelected(label);
  };

  return (
    <motion.nav
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ width: "220px" }}
      className={cn(
        "fixed top-0 left-0 bottom-0 flex flex-col items-center overflow-hidden z-20",
        "text-primary",
        "sm:bg-tertiary sm:dark:bg-black",
        isExpanded ? "bg-tertiary " : "sm:bg-black ",
        "sm:dark:border-r "
      )}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      aria-label="Sidebar Navigation"
    >
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Toggle Sidebar"
        className="flex items-center justify-center w-10 h-10 rounded hover:bg-accent hover:text-secondary transition-colors cursor-pointer sm:hidden"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <Menu className="block w-5 h-0.5 text-secondary hover:text-primary"></Menu>
        </motion.div>
      </Button>
      <ul
        className={cn(
          "space-y-1 w-full pt-6 px-4",
          !isExpanded && "hidden sm:block"
        )}
      >
        {linkList.map(({ icon: Icon, label, disabeld }) => (
          <li key={label} className="relative flex items-center group w-full">
            <Button
              variant="ghost"
              disabled={disabeld}
              onClick={() => handleClick(label)}
              aria-label={label}
              aria-current={selected === label ? "page" : undefined}
              className={cn(
                "flex items-center justify-start w-full text-left px-2 py-1 rounded hover:bg-accent hover:text-secondary transition-colors whitespace-nowrap cursor-pointer",
                selected === label ? "text-brand bg-clicked" : "text-primary",
                isExpanded ? "px-2" : "px-2 justify-center",
                "h-10"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{
                      opacity: 1,
                      width: "auto",
                      marginLeft: "0.5rem",
                    }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </li>
        ))}
      </ul>
      <div className={`mt-auto pb-6 ${!isExpanded ? "hidden sm:block" : ""}`}>
        <DarkModeToggle />
      </div>
    </motion.nav>
  );
};

export default Sidebar;
