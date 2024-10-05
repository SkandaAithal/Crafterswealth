import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Loader from "./loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all  duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none dark:border-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-blue text-primary hover:bg-[#0077ff] rounded-full !h-auto btn-effect",
        destructive:
          "bg-[#ED4245] text-destructive-foreground hover:bg-[#ED4245]/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-primary text-primary-foreground hover:bg-primary/80 rounded-full !p-4",
        ghost: "hover:bg-muted hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        transparent: "bg-none w-fit !p-0 !m-0 !h-fit",
      },
      size: {
        default: "h-10 px-4 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  disabled?: boolean;
  loaderTheme?: "light" | "dark";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      loaderTheme = "light",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ size, variant, className }), {
          "opacity-50 pointer-events-none ": disabled || loading,
        })}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="flex justify-center items-center gap-1">
            {props.children}
            <Loader theme={loaderTheme} />
          </div>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
