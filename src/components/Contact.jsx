"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent!") // Replace with actual submission logic
    setFormData({ name: "", email: "", message: "" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section ref={ref} id="contact" className="py-20 bg-white relative overflow-hidden">
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
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-300/15 via-blue-300/15 to-purple-300/15 rounded-full blur-2xl pointer-events-none"
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
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-40"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"
        />

        {/* Floating contact icons */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              top: `${20 + i * 12}%`,
              right: `${10 + i * 8}%`,
            }}
            animate={{
              y: [-8, 12, -8],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Contact Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Let's{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 relative">
                Connect
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

            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ready to transform your business with cutting-edge technology? Let's discuss how we can help you achieve
              your digital goals.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6">
              {[
                { icon: "📧", title: "Email", value: "hello@optitech.com" },
                { icon: "📞", title: "Phone", value: "+1 (555) 123-4567" },
                { icon: "📍", title: "Location", value: "San Francisco, CA" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border border-gray-200/50 shadow-lg group"
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.form
              variants={containerVariants}
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl space-y-6 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Glassmorphism overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div variants={itemVariants} className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl border border-gray-300/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                  }}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-xl border border-gray-300/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                  }}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full p-4 rounded-xl border border-gray-300/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  rows="5"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                  }}
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group z-10"
              >
                <span className="relative z-10">Send Message</span>
                {/* Liquid glass shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                {/* Glassmorphism overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
