import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 10 
    },
    animate: { 
      opacity: 1, 
      y: 0 
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -10 
    }
  }

  return (
    <motion.div
      key={location.pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.2 
      }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  )
}
