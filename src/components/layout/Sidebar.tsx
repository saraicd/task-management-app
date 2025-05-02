import { Home, AlarmClockCheck, UsersRound, Clock8, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Text } from "../common/Text";
import { useState } from "react";

const linkList = [
  { icon: Home, label: "Home", component: <></> },
  { icon: AlarmClockCheck, label: "Tasks", component: <></> },
  { icon: UsersRound, label: "People", component: <></> },
  { icon: Clock8, label: "Time tracking", component: <></> },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ x: "-100%" }} // starts off-screen to the left
      animate={{ x: 0 }} // animates into view
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ width: "250px" }}
      className="bg-gray-900 text-white fixed top-0 left-0 bottom-0 flex flex-col items-center py-6 overflow-hidden shadow-lg"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <ul className="space-y-6 w-full pt-6 px-4">
        {linkList.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="relative flex items-center space-x-2 group hover:scale-105"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <Icon className="w-4 h-4" />
              {isExpanded && (
                <span className="whitespace-nowrap overflow-hidden ">
                  <Text fontWeight="400">{label}</Text>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button>
          <Moon></Moon>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
