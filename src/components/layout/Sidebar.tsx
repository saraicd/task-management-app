import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DarkModeToggle } from "../common/ThemeToggle";
import { Button } from "../ui/button";
import { linkList } from "../../data/Navigation";
import { cn } from "../../lib/utils";

const Sidebar = ({ onSelect }: { onSelect: (component: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState("Home");

  const handleClick = (label: string) => {
    onSelect(label);
    setSelected(label);
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ width: "220px" }}
      className="bg-tertiary dark:bg-black text-primary fixed top-0 left-0 bottom-0 flex flex-col items-center overflow-hidden z-20 dark:border-r"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <ul className="space-y-2 w-full pt-6 px-4">
        {linkList.map(({ icon: Icon, label, disabeld }) => (
          <li key={label} className="relative flex items-center group w-full">
            <Button
              variant="ghost"
              disabled={disabeld}
              onClick={() => handleClick(label)}
              aria-label={label}
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
                    className="overflow-hidden "
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-auto pb-6">
        <DarkModeToggle />
      </div>
    </motion.div>
  );
};

export default Sidebar;
