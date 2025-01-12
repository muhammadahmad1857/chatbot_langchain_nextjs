"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";

// import {
//   faYoutube,
//   faXTwitter,
//   faDiscord,
// } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const navItems = [
  // {
  //   name: "Technologies",
  //   href: "/#technology",
  // },

  {
    name: "Services",
    href: "/#services",
  },
  {
    name: "Calling Agent-try out",
    href: "/call",
  },
];

// export const socialLinks = [
//   {
//     name: "youtube",
//     icon: faYoutube,
//     href: "#",
//   },
//   {
//     name: "X",
//     icon: faXTwitter,
//     href: "#",
//   },
//   {
//     name: "Discord",
//     icon: faDiscord,
//     href: "#",
//   },
// ];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8">
          <Link href={"/"} className="flex gap-4 items-center">
            <Logo />
            <div className="font-extrabold text-2xl">Kognifi</div>
          </Link>{" "}
          <nav className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="uppercase text-xs tracking-widest font-bold text-gray-400"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col md:flex-row-reverse md:justify-between items-center gap-8">
          {/* <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.name}>
                <div className="size-10 rounded-full bg-gray-900 inline-flex items-center justify-center">
                  <FontAwesomeIcon icon={link.icon} className="size-4" />
                </div>
                {link.name}
              </a>
            ))}
          </div> */}
          <div className="flex items-center gap-3 max-sm:flex-col ">
            <strong>Conatct us on:</strong>{" "}
            <Link
              className="hover:text-blue-600 transition-colors duration-900"
              href={"mailto:4devbrother@gmail.com"}
            >
              4devbrother@gmail.com
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            &copy; Kognifi, All rights reserved,
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
