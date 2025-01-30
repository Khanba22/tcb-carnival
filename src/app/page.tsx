"use client"

import { motion } from "framer-motion"
import TeamRegistrationForm from "@/components/RegistrationForm"

export default function TeamRegistrationPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-0 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full sm:h-auto sm:max-w-2xl"
      >
        <TeamRegistrationForm />
      </motion.div>
    </div>
  )
}

