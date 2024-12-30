import React from "react";
import { Logo } from "./Logo";
const Loader = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#632584] rounded-full">
        <Logo className="animate-ping size-3" />
      </div>
    </div>
  );
};

export default Loader;
