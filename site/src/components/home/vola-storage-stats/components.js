import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
function AnimatedContent({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedIcon({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, rotate: -180, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
        scale: { type: "spring", stiffness: 200, damping: 15 },
        rotate: { type: "spring", stiffness: 200, damping: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedValue({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatedContent, AnimatedIcon, AnimatedValue };
