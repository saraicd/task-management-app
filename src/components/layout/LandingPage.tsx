import { AnimatePresence, motion } from "framer-motion";
import { LinkItem } from "../../data/Navigation";

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
          className="min-w-lg px-4 pt-12 mx-auto"
          role="main"
          aria-labelledby="page-title"
        >
          {currentPage.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
