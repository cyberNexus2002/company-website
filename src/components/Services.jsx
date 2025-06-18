"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const Services = ({ services }) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section ref={ref} id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements with mouse interaction */}
      <div className="absolute inset-0 z-0">
        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-200/25 via-purple-200/25 to-cyan-200/25 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
          }}
        />

        {/* Secondary mouse follower */}
        <motion.div
          className="absolute w-48 h-48 bg-gradient-to-r from-cyan-300/20 via-blue-300/20 to-purple-300/20 rounded-full blur-2xl pointer-events-none"
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
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-25"
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              top: `${15 + i * 10}%`,
              left: `${5 + i * 11}%`,
            }}
            animate={{
              y: [-5, 15, -5],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 relative">
            Services
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl rounded-lg"
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
        </motion.h2>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Comprehensive IT solutions tailored to transform your business and drive digital success.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  y: -15,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
                  rotateY: 5,
                }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glassmorphism overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59,130,246,0.05), rgba(147,51,234,0.05), rgba(6,182,212,0.05))",
                      "linear-gradient(135deg, rgba(147,51,234,0.05), rgba(6,182,212,0.05), rgba(59,130,246,0.05))",
                      "linear-gradient(225deg, rgba(6,182,212,0.05), rgba(59,130,246,0.05), rgba(147,51,234,0.05))",
                      "linear-gradient(315deg, rgba(59,130,246,0.05), rgba(147,51,234,0.05), rgba(6,182,212,0.05))",
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                {service.image && (
                  <motion.div
                    className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Image overlay */}
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                )}

                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10"
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {index + 1}
                  {/* Number glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-0 group-hover:opacity-50"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                <motion.span
                  className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium rounded-full relative z-10"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)",
                  }}
                >
                  {service.category}
                </motion.span>

                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="col-span-full text-center py-16">
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-4xl mx-auto mb-6"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                }}
                transition={{ duration: 0.6 }}
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working hard to bring you amazing services. Stay tuned for updates!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
