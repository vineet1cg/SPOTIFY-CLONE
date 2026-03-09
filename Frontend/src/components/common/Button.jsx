import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-muse-green text-black hover:bg-muse-green-light hover:scale-105 font-bold',
  secondary: 'bg-transparent text-white border border-surface-500 hover:border-white hover:scale-105 font-bold',
  ghost: 'bg-transparent text-text-secondary hover:text-white font-bold',
  white: 'bg-white text-black hover:scale-105 font-bold',
  danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 font-semibold',
};

const sizes = {
  sm: 'text-xs px-4 py-1.5 rounded-full',
  md: 'text-sm px-6 py-2.5 rounded-full',
  lg: 'text-sm px-8 py-3.5 rounded-full',
  xl: 'text-base px-10 py-4 rounded-full',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
