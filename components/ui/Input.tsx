import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 text-sm",
  md: "h-11 text-base",
  lg: "h-14 text-lg",
};

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: Size;
  leading?: ReactNode;
  trailing?: ReactNode;
  invalid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputSize = "md", leading, trailing, invalid = false, className = "", ...rest },
  ref,
) {
  const wrapper =
    "group flex w-full items-center gap-2 rounded-lg border bg-elevated transition-colors duration-fast ease-out " +
    "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-canvas " +
    (invalid ? "border-danger" : "border-line hover:border-line-strong focus-within:border-accent");

  const padX = inputSize === "lg" ? "px-4" : inputSize === "sm" ? "px-2.5" : "px-3";

  return (
    <div className={`${wrapper} ${padX} ${sizes[inputSize]} ${className}`}>
      {leading && <span className="flex shrink-0 items-center text-fg-subtle">{leading}</span>}
      <input
        ref={ref}
        className="min-w-0 flex-1 bg-transparent text-fg placeholder:text-fg-subtle outline-none"
        {...rest}
      />
      {trailing && <span className="flex shrink-0 items-center">{trailing}</span>}
    </div>
  );
});

export default Input;
