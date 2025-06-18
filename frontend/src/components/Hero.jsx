"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()

  // Parallax effects for modern scrolling
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Background Elements with Parallax */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs with parallax */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-cyan-100 rounded-full blur-3xl opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 rounded-full blur-3xl opacity-50"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-cyan-200/30 rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15,
          }}
        />

        {/* Secondary mouse follower for depth */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-purple-300/20 via-blue-300/20 to-cyan-300/20 rounded-full blur-xl pointer-events-none"
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

        {/* Geometric patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Floating geometric shapes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 right-20 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-64 left-32 w-3 h-3 bg-gradient-to-br from-purple-400 to-cyan-500 rotate-45 shadow-lg"
          transition={{ delay: 1 }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-48 left-20 w-6 h-6 border-2 border-blue-400 rounded-full shadow-lg"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Main Content Container with Parallax */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - Text Content */}
          <div className="text-left lg:pr-8">
            {/* Professional Badge */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 text-xs font-semibold mb-6 shadow-lg backdrop-blur-sm"
            >
              <motion.span
                className="w-2 h-2 bg-green-500 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              Trusted by 25+ Companies Worldwide
              <motion.div
                className="ml-2 w-1 h-1 bg-blue-400 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-[0.9]"
            >
              <motion.span
                className="block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Empowering Your
              </motion.span>
              <motion.span
                className="block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                Future with{" "}
              </motion.span>
              <motion.span
                className="relative block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative">
                  Cutting-Edge
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 blur-xl rounded-lg"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [0.98, 1.02, 0.98],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
                  IT Solutions
                </span>
              </motion.span>
            </motion.h1>

            {/* Enhanced Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-light"
            >
              Transform your business with innovative web development, AI-driven solutions, and seamless digital
              experiences that drive growth and success in the modern digital landscape.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* FIRST BUTTON - Explore Services */}
              <motion.a
                href="#services"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-sm overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"></div>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                />
                <span className="relative text-white flex items-center font-semibold">
                  Explore Services
                  <motion.svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </motion.a>

              {/* SECOND BUTTON - Get in Touch */}
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-sm border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-lg"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center font-semibold">
                  Get in Touch
                  <motion.svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </motion.svg>
                </span>
              </motion.a>
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              {[
                { number: "25+", label: "Projects", icon: "📊" },
                { number: "98%", label: "Satisfaction", icon: "⭐" },
                { number: "24/7", label: "Support", icon: "🚀" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-3 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <motion.div
                    className="text-xl mb-2"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div className="text-xl font-black text-gray-900 mb-1" whileHover={{ scale: 1.1 }}>
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE - Hero Image with Organic Shape */}
          <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end">
            {/* HERO IMAGE CONTAINER - Organic Shape Design */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-lg"
            >
              {/* Background Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-[3rem] blur-2xl"></div>

              {/* Main Image Container with Organic Shape */}
              <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-2">
                {/* Inner Image with Custom Organic Shape */}
                <div
                  className="relative overflow-hidden bg-white shadow-xl"
                  style={{
                    borderRadius: "2.5rem 2.5rem 2.5rem 0.5rem",
                  }}
                >
                  <motion.img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3EL8N3oghh32CKlazfxSiA5NkdSV1R.png"
                    alt="Professional team working together on IT solutions"
                    className="w-full h-auto object-cover rounded-[2.5rem]"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                  />

                  {/* Overlay Gradient for Professional Look */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 rounded-[2.5rem]"></div>
                </div>

                {/* Decorative Elements Around Image */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-cyan-500 to-blue-500 rotate-45 shadow-lg"
                  animate={{ rotate: [45, 90, 45] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>

              {/* Floating Elements Around Image */}
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-sm opacity-60"
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-full blur-sm opacity-60"
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div className="flex flex-col items-center text-gray-400 cursor-pointer" whileHover={{ scale: 1.1 }}>
          <span className="text-sm mb-3 uppercase tracking-wider font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center relative overflow-hidden"
          >
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Page Transition Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{ transformOrigin: "left" }}
      />
    </section>
  )
}

export default Hero
