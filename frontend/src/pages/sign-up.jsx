"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
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

  useEffect(() => {
    // Calculate password strength
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
  }, [formData.password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "from-red-500 to-red-600"
    if (passwordStrength < 50) return "from-orange-500 to-orange-600"
    if (passwordStrength < 75) return "from-yellow-500 to-yellow-600"
    return "from-green-500 to-green-600"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-200/20 via-blue-200/20 to-cyan-200/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        />

        {/* Secondary mouse follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-300/15 via-purple-300/15 to-blue-300/15 rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 25,
          }}
        />

        <motion.div
          style={{ y }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full blur-3xl opacity-40"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"
        />

        {/* Floating elements */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"
            style={{
              top: `${15 + i * 8}%`,
              right: `${10 + i * 9}%`,
            }}
            animate={{
              y: [-8, 12, -8],
              opacity: [0.4, 1, 0.4],
              scale: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        {/* Glassmorphism Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Card glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-3xl"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg"
              whileHover={{
                rotate: 360,
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
              }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white text-2xl">✨</span>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us and start your journey today</p>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <motion.input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="John"
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.15)",
                  }}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <motion.input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Doe"
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.15)",
                  }}
                />
              </motion.div>
            </div>

            {/* Email Field */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="john@example.com"
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(147, 51, 234, 0.15)",
                }}
              />
            </motion.div>

            {/* Password Field with Strength Indicator */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <motion.input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="Create a strong password"
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(147, 51, 234, 0.15)",
                }}
              />
              {formData.password && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span
                      className={`text-xs font-medium bg-gradient-to-r ${getPasswordStrengthColor()} bg-clip-text text-transparent`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${getPasswordStrengthColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <motion.input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="Confirm your password"
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(147, 51, 234, 0.15)",
                }}
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  Passwords do not match
                </motion.p>
              )}
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <motion.label
                className="flex items-start cursor-pointer mt-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input type="checkbox" className="sr-only" required />
                <motion.div
                  className="w-5 h-5 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md flex items-center justify-center flex-shrink-0"
                  whileHover={{ boxShadow: "0 5px 15px rgba(147, 51, 234, 0.2)" }}
                >
                  <motion.span
                    className="text-purple-600 text-xs"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                  >
                    ✓
                  </motion.span>
                </motion.div>
              </motion.label>
              <p className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <motion.a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  Terms of Service
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{" "}
                and{" "}
                <motion.a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  Privacy Policy
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading || formData.password !== formData.confirmPassword}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-70"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {isLoading ? (
                  <motion.div
                    className="flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  </motion.div>
                ) : (
                  "Create Account"
                )}
              </span>
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-4 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants} className="space-y-3">
            {[
              { name: "Google", icon: "🔍", color: "from-red-500 to-orange-500" },
              { name: "GitHub", icon: "🐙", color: "from-gray-700 to-gray-900" },
            ].map((provider) => (
              <motion.button
                key={provider.name}
                className="w-full py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl font-medium text-gray-700 hover:bg-white/70 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">{provider.icon}</span>
                <span>Continue with {provider.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Sign In Link */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <motion.a
                href="#signin"
                className="text-purple-600 hover:text-purple-700 font-medium relative"
                whileHover={{ scale: 1.05 }}
              >
                Sign in
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SignUp
