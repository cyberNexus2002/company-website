"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const About = () => {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
    <section ref={ref} id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Enhanced Background Elements with mouse interaction */}
      <div className="absolute inset-0 z-0">
        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-cyan-200/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15,
          }}
        />
        
        {/* Secondary mouse follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-purple-300/15 via-blue-300/15 to-cyan-300/15 rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
        />

        <motion.div
          style={{ y }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-40"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div style={{ opacity }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 relative">
              Optitech
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
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            At Optitech, we blend innovation with expertise to deliver transformative IT solutions, empowering
            businesses with modern technology and creative design that drives success in the digital age.
          </motion.p>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Web Development",
                desc: "Crafting responsive, high-performance websites that engage and convert.",
                icon: "🌐",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "App Development",
                desc: "Building intuitive mobile and web applications for modern businesses.",
                icon: "📱",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "AI Solutions",
                desc: "Leveraging artificial intelligence for smarter business processes.",
                icon: "🤖",
                color: "from-green-500 to-teal-500",
              },
              {
                title: "UI/UX Design",
                desc: "Designing user-centric, visually stunning digital experiences.",
                icon: "🎨",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  rotateY: 5,
                }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glassmorphism overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  animate={{
                    background: [
                      `linear-gradient(45deg, ${item.color})`,
                      `linear-gradient(135deg, ${item.color})`,
                      `linear-gradient(225deg, ${item.color})`,
                      `linear-gradient(315deg, ${item.color})`,
                      `linear-gradient(45deg, ${item.color})`,
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  whileHover={{ 
                    rotate: 360,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {item.icon}
                  {/* Icon glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} blur-lg opacity-0 group-hover:opacity-50`}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  {item.desc}
                </p>

                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
