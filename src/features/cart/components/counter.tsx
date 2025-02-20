import { createContext, forwardRef, useContext } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cva } from "class-variance-authority";

type CounterProps = React.PropsWithChildren & {
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
};

type ContextProps = CounterProps;

const CountContext = createContext<ContextProps | null>(null);

function useCounter() {
  const context = useContext(CountContext);

  if (!context) {
    throw new Error("useCounter must be used within a <Counter />");
  }

  return context;
}

const Counter = ({ children, ...props }: CounterProps) => {
  return (
    <div className="inline-flex items-stretch gap-1 rounded-lg border">
      <CountContext.Provider value={props}>{children}</CountContext.Provider>
    </div>
  );
};

const inputVariants = cva(
  "border-0 text-center text-sm font-medium outline-none focus:ring-0 shadow-none rounded-none px-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
  {
    variants: {
      size: {
        default: "h-9 w-9",
        sm: "h-7 w-7",
        lg: "h-11 w-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const CounterInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { size, disabled } = useCounter();
  return (
    <Input
      ref={ref}
      className={cn(inputVariants({ size, className }))}
      disabled={disabled}
      {...props}
      type="number"
    />
  );
});

CounterInput.displayName = "CounterInput";

const buttonVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      sm: "h-7 w-7",
      lg: "h-11 w-11",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const iconVariants = cva("text-neutral-600", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-4 <w-4></w-4>",
      lg: "h-5 w-5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const CounterButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { minus?: boolean }
>(({ className, minus, ...props }, ref) => {
  const { size, disabled } = useCounter();
  const Icon = minus ? MinusIcon : PlusIcon;
  return (
    <Button
      disabled={disabled}
      {...props}
      className={cn(buttonVariants({ size, className }))}
      variant="ghost"
      ref={ref}
      size={"icon"}
    >
      <Icon className={iconVariants({ size })} />
    </Button>
  );
});

CounterButton.displayName = "CounterButton";

export { Counter, CounterButton, CounterInput };
