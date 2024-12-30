"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button";
import Loader from "@/components/loader";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import TextArea from "@/components/Textarea";
import Input from "@/components/Input";
import Dropdown from "@/components/DropDown";
import { useRouter } from "next/navigation";
import { SectionBorder } from "./SectionBorder";
import { SectionContent } from "@/sections/SectionContent";

export interface FormField {
  key: string;
  type: "text" | "textarea" | "dropdown";
  label: string;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
}

interface FormSystemProps {
  title: string;
  description: string;
  fields: FormField[];
  apiEndpoint: string;
  validateForm: (state: Record<string, string>) => boolean;
  btnText: string;
  id: string;
  cols?: "grid-cols-1" | "grid-cols-2";
}

const FormSystem: React.FC<FormSystemProps> = ({
  title,
  description,
  fields,
  apiEndpoint,
  validateForm,
  btnText,
  id,
  cols = "grid-cols-2",
}) => {
  const [formState, setFormState] = useState<Record<string, string>>(
    Object.fromEntries(
      fields.map((field) => [field.key, field.defaultValue || ""])
    )
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [languageSupported, setLanguageSupported] = useState<boolean>(true);

  const handleChange = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        synth.cancel();
        setSpeaking(false);
      }

      setLoading(true);

      const response = await axios.post(apiEndpoint, formState);
      setOutput(response.data.data);

      // Check language support after response is generated
      const voices = synth.getVoices();
      const languageMap: Record<string, string> = {
        English: "en-US",
        Punjabi: "pa-IN",
        Sindhi: "sd-IN",
        Hindi: "hi-IN",
        Bengali: "bn-IN",
        Chinese: "zh-CN",
        Japanese: "ja-JP",
        Arabic: "ar-SA",
        Pashto: "ps-AF",
      };

      const selectedLanguage = formState.language || "English";
      const mappedLanguage = languageMap[selectedLanguage] || "en-US";

      const isSupported = voices.some((voice) => voice.lang === mappedLanguage);
      setLanguageSupported(isSupported);

      if (!isSupported) {
        toast.info(
          `The selected language (${selectedLanguage}) is not supported for speech synthesis.`
        );
      }

      toast.success("Response generated successfully!");
      router.push("#output");
    } catch (error) {
      toast.error("An error occurred while generating a response.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadAloud = () => {
    if (!output || !languageSupported) return;

    const text = output
      .replace(/^markdown\s+/i, "") // Removes "markdown" at the start of the string, case-insensitive
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/!\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/^#+\s?/gm, "")
      .replace(/^[*-]\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      .replace(/([_*~`])/g, "")
      .replace(/\(.*?\)/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);

    const languageMap: Record<string, string> = {
      English: "en-US",
      Punjabi: "pa-IN",
      Sindhi: "sd-IN",
      Hindi: "hi-IN",
      Bengali: "bn-IN",
      Chinese: "zh-CN",
      Japanese: "ja-JP",
      Arabic: "ar-SA",
      Pashto: "ps-AF",
    };

    const selectedLanguage = formState.language || "English";
    const mappedLanguage = languageMap[selectedLanguage] || "en-US";
    utterance.lang = mappedLanguage;

    const voices = synth.getVoices();
    const preferredVoice = voices.find(
      (voice) => voice.lang === mappedLanguage
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      utterance.lang = "en-US";
      // @ts-expect-error it is necessary because according to library this is correct but here its giving err
      utterance.voice = voices.find((voice) => voice.lang === "en-US");
    }

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    utterance.onerror = (error) => {
      console.error("Speech synthesis error:", error);
      setSpeaking(false);
    };

    synth.speak(utterance);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel(); // Stops the speech synthesis
      setSpeaking(false);
      toast.info("Speech synthesis stopped.");
    }
  };

  return (
    <section id={id}>
      <div className="container px-4 py-10">
        <SectionBorder borderTop>
          <SectionContent className="md:px-20 lg:px-40">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                {title}
              </h2>
              <p className="text-center font-semibold text-gray-300">
                {description}
              </p>
              <div className={`grid w-full grid-cols-1 md:${cols} gap-6`}>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={
                      field.type === "textarea" && cols === "grid-cols-2"
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    {field.type === "textarea" ? (
                      <TextArea
                        id={field.key}
                        label={field.label}
                        placeholder={field.placeholder}
                        setText={(value) => handleChange(field.key, value)}
                        value={formState[field.key]}
                        disabled={loading}
                        className={
                          cols === "grid-cols-2"
                            ? "col-span-1 md:col-span-2 md:min-w-full md:max-w-3xl"
                            : ""
                        }
                      />
                    ) : field.type === "text" ? (
                      <Input
                        id={field.key}
                        label={field.label}
                        placeholder={field.placeholder}
                        setText={(value) => handleChange(field.key, value)}
                        value={formState[field.key]}
                        disabled={loading}
                      />
                    ) : (
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
              <div className="text-center mt-6 w-full max-w-md mx-auto">
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  className={`h-[52px] ${
                    loading ||
                    (!validateForm(formState) &&
                      "opacity-50 cursor-not-allowed pointer-events-none")
                  }`}
                  block
                >
                  {loading ? <Loader /> : btnText}
                </Button>
                {fields.some(
                  (field) => formState[field.key] !== (field.defaultValue || "")
                ) && (
                  <Button
                    onClick={() =>
                      setFormState(
                        Object.fromEntries(
                          fields.map((field) => [
                            field.key,
                            field.defaultValue || "",
                          ])
                        )
                      )
                    }
                    variant="primary"
                    className={`h-[52px] mt-4 ${
                      loading &&
                      "opacity-50 cursor-not-allowed pointer-events-none"
                    }`}
                    block
                  >
                    Clear Form
                  </Button>
                )}
              </div>
              {output && (
                <motion.div
                  id="output"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold my-8 text-gray-100 text-center leading-tight">
                    Output:
                  </h2>
                  <MarkdownPreview
                    source={output}
                    style={{
                      backgroundColor: "#300E20",
                      marginBlock: "1.25rem",
                      color: " #d1d5db ",
                      width: "100%",
                      padding: "1.5rem",
                      borderRadius: "0.5rem",
                      lineHeight: "1.5",
                      fontSize: "1.125rem",
                    }}
                  />
                  {languageSupported && (
                    <div className="text-center mt-4 flex justify-center space-x-4">
                      <Button
                        onClick={speaking ? handleStop : handleReadAloud}
                        variant="primary"
                        className="h-[52px]"
                      >
                        {speaking ? "Stop" : "Read Aloud"}
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default FormSystem;
