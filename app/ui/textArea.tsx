import * as React from "react"
import { cn } from "@/app/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, forwardedRef) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      const textAreaElement = innerRef.current;
      if (!textAreaElement) return;

      const preventZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      // Prevent zoom on double-tap
      textAreaElement.addEventListener('touchstart', preventZoom, { passive: false });

      // Set font size to prevent iOS zoom
      textAreaElement.style.fontSize = '16px';

      return () => {
        textAreaElement.removeEventListener('touchstart', preventZoom);
      };
    }, []);

    // Combine the internal ref with the forwarded ref
    React.useImperativeHandle(forwardedRef, () => innerRef.current!);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={innerRef}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }