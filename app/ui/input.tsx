import * as React from "react"
import { cn } from "@/app/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, forwardedRef) => {
    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      const inputElement = innerRef.current;
      if (!inputElement) return;

      const preventZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      // Prevent zoom on double-tap
      inputElement.addEventListener('touchstart', preventZoom, { passive: false });

      // Set font size to prevent iOS zoom
      inputElement.style.fontSize = '16px';

      return () => {
        inputElement.removeEventListener('touchstart', preventZoom);
      };
    }, []);

    // Combine the internal ref with the forwarded ref
    React.useImperativeHandle(forwardedRef, () => innerRef.current!);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={innerRef}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }