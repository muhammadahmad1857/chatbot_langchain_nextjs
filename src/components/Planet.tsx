import { cva } from "class-variance-authority"
import { HTMLAttributes } from 'react';


const classes = cva('bg-gradient-to-b  to-gray-950 rounded-full', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
    color: {
      violet: 'from-violet-400',
      teal: 'from-teal-400',
      fuchsia: 'from-fuchsia-400',
    }
  },
  defaultVariants:{
    size: 'lg',
    color: 'violet'
  }
})

interface PlanetProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'violet' | 'teal' | 'fuchsia';
} 


export const Planet = (props: PlanetProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={classes({
      size: props.size,
      color: props.color,
      className: props.className
    })}></div>
  )
}

