import { motion } from "framer-motion";
import { useState } from "react";
import { DarkModeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { linkList } from "../../data/Navigation";

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
      whileHover={{ width: "250px" }}
      className="bg-tertiary dark:bg-black text-primary fixed top-0 left-0 bottom-0 flex flex-col items-center py-6 overflow-hidden border-r border-secondary"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <ul className="space-y-6 w-full pt-6 px-4">
        {linkList.map(({ icon: Icon, label, disabeld }) => (
          <li
            key={label}
            className="relative flex items-center group hover:scale-103"
          >
            <Button
              variant="ghost"
              key={label}
              disabled={disabeld}
              onClick={() => handleClick(label)}
              className={`flex items-center justify-start w-full text-left px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                selected === label ? "bg-clicked text-brand" : "text-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                {isExpanded ? label : label.charAt(0)}
              </motion.span>
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <DarkModeToggle />
      </div>
    </motion.div>
  );
};

export default Sidebar;
