"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Users, Briefcase, Phone, ChevronRight } from "lucide-react"

interface TeamMember {
  member_name: string
  member_contact: string
}

interface FormData {
  team_name: string
  leader_name: string
  leader_contact: string
  team_members: TeamMember[]
}

export default function TeamRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    team_name: "",
    leader_name: "",
    leader_contact: "",
    team_members: [
      { member_name: "", member_contact: "" },
      { member_name: "", member_contact: "" },
      { member_name: "", member_contact: "" },
    ],
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMemberChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedMembers = [...formData.team_members]
    updatedMembers[index] = { ...updatedMembers[index], [name]: value }
    setFormData((prev) => ({
      ...prev,
      team_members: updatedMembers,
    }))
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
    const response = await fetch("/api/register-team", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      router.push("/success")
    } else {
      alert("Failed to register team")
    }
  }

  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 ease-in-out text-black placeholder-gray-400"
  const labelClasses = "block text-gray-700 font-medium mb-1"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white sm:p-8 p-4 sm:rounded-xl shadow-2xl w-full h-full sm:h-auto sm:max-w-2xl border border-gray-200 overflow-y-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
        Campus Carousel Registration
      </h2>

      <form onSubmit={submitForm} className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label className={labelClasses}>
            <Briefcase className="inline-block mr-2 h-5 w-5 text-indigo-500" />
            Team Name
          </label>
          <input
            type="text"
            name="team_name"
            value={formData.team_name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Enter team name"
            required
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <label className={labelClasses}>
            <User className="inline-block mr-2 h-5 w-5 text-indigo-500" />
            Leader Name
          </label>
          <input
            type="text"
            name="leader_name"
            value={formData.leader_name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Enter leader name"
            required
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <label className={labelClasses}>
            <Phone className="inline-block mr-2 h-5 w-5 text-indigo-500" />
            Leader Contact
          </label>
          <input
            type="tel"
            name="leader_contact"
            value={formData.leader_contact}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Enter leader contact"
            required
          />
        </motion.div>

        {formData.team_members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="border-t pt-5"
          >
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Users className="inline-block mr-2 h-5 w-5 text-indigo-500" />
              Team Member {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Name</label>
                <input
                  type="text"
                  name="member_name"
                  value={member.member_name}
                  onChange={(e) => handleMemberChange(index, e)}
                  className={inputClasses}
                  placeholder={`Enter member ${index + 1} name`}
                  required
                />
              </div>
              <div>
                <label className={labelClasses}>Contact</label>
                <input
                  type="tel"
                  name="member_contact"
                  value={member.member_contact}
                  onChange={(e) => handleMemberChange(index, e)}
                  className={inputClasses}
                  placeholder={`Enter member ${index + 1} contact`}
                  required
                />
              </div>
            </div>
          </motion.div>
        ))}

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all duration-200 ease-in-out flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Registration
          <ChevronRight className="ml-2 h-5 w-5" />
        </motion.button>
      </form>
    </motion.div>
  )
}

