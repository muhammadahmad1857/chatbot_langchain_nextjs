"use client";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/Button";
import Loader from "@/components/loader";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import Dropdown from "@/components/DropDown";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CallPage: React.FC = () => {
  const basicFeatures = [
    {
      key: "task",
      type: "textarea",
      label: "Task",
      placeholder: "Enter task",
      defaultValue: "",
    },
    {
      key: "phone_number",
      type: "text",
      label: "Phone Number",
      placeholder: "Enter phone number",
      defaultValue: "",
    },
    {
      key: "voice",
      type: "dropdown",
      label: "Voice",
      options: ["Josh", "Florian", "Derek", "June", "Nat", "Paige"],
      defaultValue: "Nat",
    },
    {
      key: "background_track",
      type: "dropdown",
      label: "Background Track",
      options: ["null", "office", "cafe", "restaurant", "none"],
      defaultValue: "office",
    },
    {
      key: "language",
      type: "dropdown",
      label: "Language",
      options: [
        "en",
        "en-US",
        "en-GB",
        "en-AU",
        "en-NZ",
        "en-IN",
        "zh",
        "zh-CN",
        "zh-Hans",
        "es",
        "es-419",
        "fr",
        "fr-CA",
        "de",
        "hi",
        "ja",
        "ar",
        "pt",
        "pt-BR",
      ],
      defaultValue: "en-US",
    },
  ];

  const advancedFeatures = [
    {
      key: "interruption_threshold",
      type: "text",
      label: "Interruption Threshold",
      placeholder: "Enter interruption threshold",
      defaultValue: "100",
    },
    {
      key: "temperature",
      type: "text",
      label: "Temperature",
      placeholder: "Enter temperature (e.g., 0.7)",
      defaultValue: "0.7",
    },
    {
      key: "block_interruptions",
      type: "dropdown",
      label: "Block Interruptions",
      options: ["true", "false"],
      defaultValue: "false",
    },
    {
      key: "tools",
      type: "text",
      label: "Tools",
      placeholder: "Enter tools (comma-separated)",
      defaultValue: "",
    },
    {
      key: "ignore_button_press",
      type: "dropdown",
      label: "Ignore Button Press",
      options: ["true", "false"],
      defaultValue: "true",
    },
    {
      key: "keywords",
      type: "text",
      label: "Keywords",
      placeholder: "Enter keywords (comma-separated)",
      defaultValue: "",
    },
    {
      key: "model",
      type: "text",
      label: "Model",
      placeholder: "Enter model",
      defaultValue: "enhanced",
    },
  ];

  const [formState, setFormState] = useState<Record<string, string>>({
    ...Object.fromEntries(
      basicFeatures.map((field) => [field.key, field.defaultValue || ""])
    ),
    ...Object.fromEntries(
      advancedFeatures.map((field) => [field.key, field.defaultValue || ""])
    ),
  });

  const [loading, setLoading] = useState(false);
  const [showBasic, setShowBasic] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

//   const handleSubmit = async () => {

//     if (!formState.phone_number.trim() || !formState.task.trim()) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch("https://bland.abubakarkhalid.com/send_call", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formState),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit the form");
//       }

//       const result = await res.json();
      
//       toast.success("Call details submitted successfully!");
//       setShowBasic(false);
//       setShowAdvanced(false);
//       setShowResponse(true);
//     } catch (error) {
//       toast.error("An error occurred while submitting the call.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };


const handleSubmit = async () => {
  if (!formState.phone_number.trim() || !formState.task.trim()) {
    toast.error("Please fill in all required fields.");
    return;
  }

  try {
    setLoading(true);

    // Initial API call to send the call details
    const { data: callResponse } = await axios.post(
      "https://bland.abubakarkhalid.com/send_call",
      formState,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const callId = callResponse.callId;

    if (!callId) {
      throw new Error("Call ID not received from the API.");
    }

    toast.success("Call details submitted successfully!");

    // Call the second API to fetch the call transcript
    const { data: transcriptResponse } = await axios.get(
      `https://bland.abubakarkhalid.com/call_transcript/${callId}`
    );

    setResponse(transcriptResponse); // Assuming the response contains the transcript

    setShowBasic(false);
    setShowAdvanced(false);
    setShowResponse(true);
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "An error occurred while processing the request."
    );
    console.error("Error:", error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Make a Call</h1>

      {/* Basic Features Section */}
      <div>
        <div
          onClick={() => setShowBasic(!showBasic)}
          className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md flex justify-between items-center"
        >
          <span>Basic Features</span>
          <FontAwesomeIcon icon={showBasic ? faChevronUp : faChevronDown} />
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showBasic ? "auto" : 0,
            opacity: showBasic ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {basicFeatures.map((field) => (
              <div
                key={field.key}
                className={
                  field.type === "textarea" ? "md:col-span-2" : "col-span-1"
                }
              >
                {field.type === "text" && (
                  <Input
                    id={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    setText={(value) => handleChange(field.key, value)}
                    value={formState[field.key]}
                    disabled={loading}
                  />
                )}
                {field.type === "textarea" && (
                  <TextArea
                    id={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    setText={(value) => handleChange(field.key, value)}
                    value={formState[field.key]}
                    disabled={loading}
                  />
                )}
                {field.type === "dropdown" && (
                  <Dropdown
                    label={field.label}
                    options={field.options || []}
                    selectedOption={formState[field.key]}
                    setSelectedOption={(value) =>
                      handleChange(field.key, value)
                    }
                    disabled={loading}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Advanced Features Section */}
      <div className="mt-6">
        <div
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md flex justify-between items-center"
        >
          <span>Advanced Features</span>
          <FontAwesomeIcon icon={showAdvanced ? faChevronUp : faChevronDown} />
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showAdvanced ? "auto" : 0,
            opacity: showAdvanced ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {advancedFeatures.map((field) => (
              <div key={field.key}>
                {field.type === "text" && (
                  <Input
                    id={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    setText={(value) => handleChange(field.key, value)}
                    value={formState[field.key]}
                    disabled={loading}
                  />
                )}
                {field.type === "dropdown" && (
                  <Dropdown
                    label={field.label}
                    options={field.options || []}
                    selectedOption={formState[field.key]}
                    setSelectedOption={(value) =>
                      handleChange(field.key, value)
                    }
                    disabled={loading}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="h-[52px]"
          block
        >
          {loading ? <Loader /> : "Submit"}
        </Button>
      </div>

      {/* Response Section */}
      {showResponse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-gray-900 text-white p-4 rounded-md"
        >
          <h2 className="text-xl font-bold">Response:</h2>
          <p>{response || "No response available."}</p>
        </motion.div>
      )}
    </div>
  );
};

export default CallPage;
