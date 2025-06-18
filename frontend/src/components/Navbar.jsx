"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TrueFocus from './TrueFocus.jsx'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl shadow-black/20"
          : "bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl"
      }`}
    >
      <motion.div
        className="absolute w-32 h-32 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-xl pointer-events-none"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              whileHover={{
                rotate: 15,
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg mr-3 backdrop-blur-sm"
            >
              <span className="text-white text-lg font-bold">⚙️</span>
            </motion.div>
            <TrueFocus 
              sentence="Cyber Nexus"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
              className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"
            />
          </motion.div>

          <div className="hidden lg:flex items-center space-x-1">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
                whileHover={{
                  y: -1,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">{item}</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gray-700/30 backdrop-blur-sm rounded-lg -z-10 border border-gray-600/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}

            <div className="ml-6 flex items-center space-x-3">
              <Link to="/signin">
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
                >
                  <span className="relative z-10">Sign In</span>
                  <motion.div
                    className="absolute inset-0 bg-gray-700/30 backdrop-blur-sm rounded-lg -z-10 border border-gray-600/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              </Link>

              <Link to="/signup">
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
                >
                  <span className="relative z-10">Sign Up</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-700/10 backdrop-blur-sm rounded-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </Link>

              <motion.a
                href="#quote"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                  y: -1,
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 bg-gray-800/70 backdrop-blur-sm border border-gray-600/30 text-gray-200 text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Quote</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.a>
            </div>
          </div>

          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-700/50 backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-200 focus:outline-none border border-gray-600/20"
            >
              <motion.svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden mt-4 pb-4"
            >
              <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/20 shadow-2xl p-4 space-y-2">
                {["Home", "About", "Services", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      x: 5,
                      scale: 1.02,
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {item}
                  </motion.a>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-700/20 space-y-2">
                  <Link to="/signin">
                    <motion.a
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm text-center"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      Sign In
                    </motion.a>
                  </Link>
                  <Link to="/signup">
                    <motion.a
                      className="block px-4 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-center rounded-xl font-semibold shadow-lg backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                    </motion.a>
                  </Link>
                  <motion.a
                    href="#quote"
                    className="block px-4 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-600/30 text-gray-200 text-center rounded-xl font-medium shadow-md"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Quote
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar