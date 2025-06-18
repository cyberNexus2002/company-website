"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const Footer = () => {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <footer ref={ref} className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements with mouse interaction */}
      <div className="absolute inset-0 z-0">
        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-blue-200/15 via-purple-200/15 to-cyan-200/15 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 144,
            y: mousePosition.y - 144,
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
          }}
        />

        {/* Secondary mouse follower */}
        <motion.div
          className="absolute w-48 h-48 bg-gradient-to-r from-cyan-300/10 via-blue-300/10 to-purple-300/10 rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 96,
            y: mousePosition.y - 96,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
          }}
        />

        <motion.div
          style={{ y }}
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-25"
        />

        {/* Floating footer elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              bottom: `${20 + i * 8}%`,
              left: `${15 + i * 12}%`,
            }}
            animate={{
              y: [-6, 10, -6],
              opacity: [0.4, 1, 0.4],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <motion.div
              className="flex items-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mr-3"
                whileHover={{
                  rotate: 360,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)",
                }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white text-xl font-bold">⚙️</span>
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Optitech
              </h3>
            </motion.div>
            <motion.p
              className="text-gray-600 leading-relaxed mb-6 max-w-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Empowering businesses with cutting-edge IT solutions, innovative web development, and AI-driven
              technologies that drive digital transformation and success.
            </motion.p>
            <div className="flex space-x-4">
              {[
                { name: "Facebook", icon: "📘", url: "https://facebook.com" },
                { name: "Twitter", icon: "🐦", url: "https://twitter.com" },
                { name: "Instagram", icon: "📷", url: "https://instagram.com" },
                { name: "LinkedIn", icon: "💼", url: "https://linkedin.com" },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  variants={socialVariants}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 flex items-center justify-center text-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {social.icon}
                  {/* Social icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Contact"].map((link, index) => (
                <motion.li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 block relative"
                    whileHover={{
                      x: 5,
                      scale: 1.05,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link}
                    {/* Link underline effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Services</h4>
            <ul className="space-y-3">
              {["Web Development", "App Development", "AI Solutions", "UI/UX Design"].map((service, index) => (
                <motion.li key={service}>
                  <motion.span
                    className="text-gray-600 block cursor-pointer relative"
                    whileHover={{
                      x: 5,
                      color: "#2563eb",
                      scale: 1.05,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {service}
                    {/* Service underline effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.p
            className="text-gray-600 text-sm mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            © 2025 Optitech. All rights reserved. Built with ❤️ for innovation.
          </motion.p>
          <motion.div className="flex space-x-6 text-sm" variants={itemVariants}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 relative"
                whileHover={{
                  y: -2,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {link}
                {/* Policy link underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
