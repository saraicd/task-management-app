import { AnimatePresence, motion } from "framer-motion";
import { LinkItem } from "../../data/Navigation";
import { Heading } from "../common/Heading";

interface LandingPageProps {
  currentPage: LinkItem;
}

const LandingPage = ({ currentPage }: LandingPageProps) => {
  return (
    <div className="landing-page relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="min-w-lg px-4 mx-auto"
        >
          {/* <div className="text-left px-2">
            <Heading level={2}>{currentPage.label}</Heading>
          </div> */}
          {currentPage.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
