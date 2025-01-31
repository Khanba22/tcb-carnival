"use client";
import { useRegister } from "@/contexts/RegisterContext";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page() {
  const registerContext = useRegister();

  const handleClick = () => {
    if (registerContext.isRegistered) {
      redirect("https://chat.whatsapp.com/KG3xsiEH0JlFVzDlDGVKLN");
    } else {
      alert(
        "You Think We Idiots Nigga ? Go register your ass first then join the grp"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Registration Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for registering your team. We look forward to seeing you at
          the event! As a final step, please join our WhatsApp group to receive important updates and announcements.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleClick}
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 ease-in-out hover:opacity-90"
          >
            Join WhatsApp Group
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
