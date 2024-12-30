import logoImage from "@/assets/images/sphereal-logo.svg?url"
import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"


export const Logo = (props: HTMLAttributes<HTMLDivElement>) => {

  const { className, style, ...otherProps } = props

  return (
    <div
      className={twMerge(
        " size-10 bg-gray-200 bg-[conic-gradient(from_45deg,_var(--color-violet-400),_var(--color-fuchsia-400),_var(--color-amber-300),_var(--color-teal-300),_var(--color-violet-400))]",
        className
      )}
      style={{
        maskImage: `url(${logoImage.src})`,
        maskSize: "contain",
        ...style,
      }}
      {...otherProps}
    ></div>
  )
}