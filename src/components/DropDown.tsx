// // 
// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// interface DropdownProps {
//   options: string[];
//   selectedOption: string;
//   setSelectedOption: (value: string) => void;
//   label: string; // Added label prop
//   disabled?: boolean; // Added disabled prop
// }

// const Dropdown: React.FC<DropdownProps> = ({
//   options,
//   selectedOption,
//   setSelectedOption,
//   label, // Destructuring label prop
//   disabled = true, // Default value for disabled prop
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     if (!disabled) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const handleSelect = (option: string) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   const dropdownVariants = {
//     closed: {
//       opacity: 0,
//       y: -30,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       {/* Label */}
//       <label className="block text-lg font-thin text-gray-300 mb-2 transition-all duration-500">
//         {label}
//       </label>
//       {/* Dropdown Button */}
//       <button
//         onClick={toggleDropdown}
//         className={`w-full py-3 flex items-center justify-between border-gradient bg-[#300E20] text-gray-300 px-4 rounded-lg shadow-md hover:bg-opacity-90 transition ${
//           disabled ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         disabled={disabled} // Added disabled attribute
//       >
//         <span>{selectedOption}</span>
//         <FontAwesomeIcon
//           icon={faChevronDown}
//           className={`transition-transform ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//         />
//       </button>
//       {/* Dropdown Menu with AnimatePresence */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.ul
//             initial="closed"
//             animate="open"
//             exit="closed" // Exit animation
//             variants={dropdownVariants}
//             className="absolute mt-2 w-full z-50 h-24 bg-[#300E20] rounded-lg shadow-lg border border-black overflow-auto"
//           >
//             {options.map((option, index) => (
//               <li
//                 key={index}
//                 className={`px-4 py-2 text-gray-300 hover:bg-black hover:pl-6 transition-all cursor-pointer ${
//                   selectedOption === option
//                     ? "border-gradient rounded-lg font-semibold"
//                     : ""
//                 }`}
//                 onClick={() => handleSelect(option)}
//               >
//                 {option}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Dropdown;

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  label,
  disabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-lg font-thin text-gray-300 mb-2 transition-all duration-500">
        {label}
      </label>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`w-full py-3 flex items-center justify-between border-gradient bg-[#300E20] text-gray-300 px-4 rounded-lg shadow-md hover:bg-opacity-90 transition ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        <span>{selectedOption}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {/* Dropdown Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            className="absolute mt-2 w-full z-50 max-h-48 bg-[#300E20] rounded-lg shadow-lg border border-black overflow-auto"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 text-gray-300 hover:bg-black hover:pl-6 transition-all cursor-pointer ${
                  selectedOption === option
                    ? "border-gradient rounded-lg font-semibold"
                    : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
