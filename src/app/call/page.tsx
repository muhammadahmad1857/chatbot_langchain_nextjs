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
import {
  faChevronDown,
  faChevronUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { basicFeatures, advancedFeatures } from "@/app/data/data";
const CallPage: React.FC = () => {
  const [formState, setFormState] = useState<Record<string, any>>({
    ...Object.fromEntries(
      basicFeatures.map((field) => [field.key, field.defaultValue || ""])
    ),
    ...Object.fromEntries(
      advancedFeatures.map((field) =>
        Array.isArray(field.defaultValue)
          ? [field.key, [...field.defaultValue]]
          : [field.key, field.defaultValue || ""]
      )
    ),
  });

  const [loading, setLoading] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [isTranscriptDisabled, setTranscriptDisabled] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [concatenatedTranscript, setConcatenatedTranscript] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBasic, setShowBasic] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formState.phone_number.trim() || !formState.task.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    console.log(formState);

    try {
      setLoading(true);

      const payload = {
        ...formState,
        interruption_threshold: Number(formState.interruption_threshold),
        temperature: Number(formState.temperature),
        wait_for_greeting:
          formState.wait_for_greeting === "true" ||
          formState.wait_for_greeting === "false",
        block_interruptions:
          formState.block_interruptions === "true" ||
          formState.block_interruptions === "false",
        noise_cancellation:
          formState.noise_cancellation === "true" ||
          formState.noise_cancellation === "false",
        ignore_button_press:
          formState.ignore_button_press === "true" ||
          formState.ignore_button_press === "false",
        tools: Array.isArray(formState.tools) ? formState.tools : [],
        keywords: Array.isArray(formState.keywords) ? formState.keywords : [],
      };

      console.log(payload);
      const response = await axios.post(
        "https://bland.abubakarkhalid.com/send_call",
        payload
      );

      console.log(payload);

      const data = JSON.parse(response.data);
      const callId = data.call_id;

      if (!callId) {
        throw new Error("Call ID not received from the API.");
      }

      setCallId(callId);
      toast.success("Call details submitted successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while processing the request."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTranscript = async () => {
    if (!callId) {
      toast.error("Call ID is not available.");
      return;
    }

    try {
      setTranscriptLoading(true);
      setTranscriptDisabled(true);

      const response = await axios.get(
        `https://bland.abubakarkhalid.com/call_transcript/${callId}`
      );

      const { status, summary, concatenated_transcript } = JSON.parse(
        response.data
      );
      console.log(status);

      if (status === "queued") {
        toast.info("Call is not initialized yet.");
        setTimeout(() => setTranscriptDisabled(false), 10000);
      }
      else if (status === "in-progress") {
        toast.info("Call is in progress.");
        setTimeout(() => setTranscriptDisabled(false), 10000);
      } else if (status === "ringing") {
        toast.info("Call is not initialized yet.");
        setTimeout(() => setTranscriptDisabled(false), 10000);
      } else if (status === "no-answer") {
        toast.error("Call was not answered.");
        setTranscriptDisabled(false);
      } else if (status === "busy") {
        toast.error("User declined the call.");
        setTranscriptDisabled(false);
      } else if (status === "completed") {
        toast.success("Transcript generated successfully!");
        setResponse(summary);
        setConcatenatedTranscript(concatenated_transcript);
        setTranscriptDisabled(false);
      } else {
        toast.error("Unknown status received.");
        setTranscriptDisabled(false);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error fetching call transcript."
      );
    } finally {
      setTranscriptLoading(false);
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
          // className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {basicFeatures.map((field) => {
              return (
                <div
                  key={field.key}
                  className={
                    field.type === "textarea"
                      ? "md:col-span-2  col-span-1"
                      : "col-span-1"
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
                      className="w-full md:max-w-5xl"
                    />
                  )}
                  {field.type === "dropdown" && (
                    <Dropdown
                      label={field.label}
                      options={field.options || []}
                      selectedOption={formState[field.key]}
                      setSelectedOption={(value) => {
                        console.log(value);
                        handleChange(field.key, value);
                      }}
                      disabled={loading}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Advanced Features Section */}
      <div className="mt-6">
        <div
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="cursor-pointer relative z-20 bg-gray-800 text-white px-4 py-2 rounded-md flex justify-between items-center"
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
      <div className="text-center mt-8 relative z-20">
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="h-[52px]"
          block
        >
          {loading ? <Loader /> : "Submit"}
        </Button>
      </div>

      {/* Get Transcript Button */}
      {callId && (
        <div className="text-center mt-4 relative z-20">
          <Button
            onClick={handleGetTranscript}
            variant="secondary"
            className={`h-[52px] ${
              isTranscriptDisabled ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            block
            disabled={transcriptLoading || isTranscriptDisabled}
          >
            {transcriptLoading ? <Loader /> : "Get Transcript"}
          </Button>
        </div>
      )}

      {/* Response Section */}
      {response && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-gray-900 text-white p-4 rounded-md"
        >
          <h2 className="text-xl font-bold">Transcript Summary:</h2>
          <p>{response}</p>
          {concatenatedTranscript && (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="mt-4 relative z-20"
            >
              View Full Transcript
            </Button>
          )}
        </motion.div>
      )}

      {/* Modal for Full Transcript */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black  p-6 rounded-lg max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Full Transcript</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="overflow-y-auto max-h-96">
              <pre className="whitespace-pre-wrap">
                {concatenatedTranscript}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallPage;
