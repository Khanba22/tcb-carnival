"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Users, Briefcase, Phone, ChevronRight } from "lucide-react";
import "../styles/loader.css";
import { useRegister } from "@/contexts/RegisterContext";

interface TeamMember {
  member_name: string;
  member_contact: string;
}

interface FormData {
  team_name: string;
  leader_name: string;
  leader_contact: string;
  team_members: TeamMember[];
}

interface ValidationErrors {
  team_name?: string;
  leader_name?: string;
  leader_contact?: string;
  team_members: { member_name?: string; member_contact?: string }[];
}

export default function TeamRegistrationForm() {
  const router = useRouter();

  const validateForm = () => {
    const newErrors: ValidationErrors = {
      team_name: formData.team_name ? undefined : "Please enter team name",
      leader_name: formData.leader_name.split(" ").length >= 2
        ? undefined
        : "Enter Full Name",
      leader_contact: validatePhoneNumber(formData.leader_contact),
      team_members: formData.team_members.map((member) => ({
        member_name: member.member_name.split(" ").length >= 2
          ? undefined
          : "Enter Full Name",
        member_contact: validatePhoneNumber(member.member_contact),
      })),
    };
    console.log(newErrors);
    setErrors(newErrors);
    if (
      newErrors.team_name !== undefined ||
      newErrors.leader_name !== undefined ||
      newErrors.leader_contact !== undefined ||
      newErrors.team_members.some(
        (member) =>
          member.member_name !== undefined ||
          member.member_contact !== undefined
      )
    ) {
      return false; // Don't submit if there are errors
    }
    return true;
  };

  const [formData, setFormData] = useState<FormData>({
    team_name: "",
    leader_name: "",
    leader_contact: "",
    team_members: [
      { member_name: "", member_contact: "" },
      { member_name: "", member_contact: "" },
    ],
  });
  const [errors, setErrors] = useState<ValidationErrors>({
    team_members: [{}, {}],
  });
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone: string): string | undefined => {
    if (!/^\+?[0-9]{10}$/.test(phone.replace(/[\s()-]/g, ""))) {
      return "Please enter a valid phone number";
    }
    return undefined;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error: string | undefined;
    if (name === "leader_contact") {
      error = validatePhoneNumber(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleMemberChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.team_members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      team_members: updatedMembers,
    }));

    let error: string | undefined;
    if (name === "member_contact") {
      error = validatePhoneNumber(value);
    }

    setErrors((prev) => ({
      ...prev,
      team_members: prev.team_members.map((member, i) =>
        i === index ? { ...member, [name]: error } : member
      ),
    }));
  };
  const register = useRegister()
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const memberMap = new Set();
    const phoneMap = new Set();
    memberMap.add(formData.leader_name);
    phoneMap.add(formData.leader_contact);
    for (let i = 0; i < formData.team_members.length; i++) {
      if (memberMap.has(formData.team_members[i].member_name)) {
        alert(`Member ${i + 1} has the same name as another member`);
        return;
      }
      memberMap.add(formData.team_members[i].member_name);

      if (phoneMap.has(formData.team_members[i].member_contact)) {
        alert(`Member ${i + 1} has the same contact as another member`);
        return;
      }
      phoneMap.add(formData.team_members[i].member_contact);
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/register-team", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        register.setIsRegistered(true);
        router.push("/success");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to register team: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 ease-in-out text-black placeholder-gray-400";
  const labelClasses = "block text-gray-700 font-medium mb-1";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white sm:p-8 p-4 sm:rounded-xl shadow-2xl w-full h-full sm:h-auto sm:max-w-2xl border border-gray-200 overflow-y-auto"
    >
      {isLoading && (
        <div className="flex justify-center items-center h-full w-screen z-10 backdrop-blur-md bg-black left-0 top-0 fixed">
          <span className="loader absolute"></span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
        Campus Carousel Registration
      </h2>

      <form onSubmit={submitForm} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
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

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
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
          {errors.leader_name && (
            <p className={errorClasses}>{errors.leader_name}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
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
          {errors.leader_contact && (
            <p className={errorClasses}>{errors.leader_contact}</p>
          )}
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
                {errors.team_members[index]?.member_name && (
                  <p className={errorClasses}>
                    {errors.team_members[index].member_name}
                  </p>
                )}
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
                {errors.team_members[index]?.member_contact && (
                  <p className={errorClasses}>
                    {errors.team_members[index].member_contact}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all duration-200 ease-in-out flex items-center justify-center relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loader absolute"></span>
              <span className="opacity-0">Submit Registration</span>
            </>
          ) : (
            <>
              Submit Registration
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
