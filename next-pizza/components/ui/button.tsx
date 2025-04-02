import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] active:translate-y-[1px] text-sm font-medium ring-offset-[var(--color-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[color-mix(in srgb, var(--color-primary) 90%, transparent)]',
        destructive:
          'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:bg-[color-mix(in srgb, var(--color-destructive) 90%, transparent)]',
        outline:
          'border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-secondary)]',
        secondary:
          'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[color-mix(in srgb, var(--color-secondary) 50%, transparent)]',
        ghost:
          'hover:bg-[var(--color-secondary)] hover:text-[var(--color-secondary-foreground)]',
        link: 'text-[var(--color-primary)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[var(--radius)] px-3',
        lg: 'h-11 rounded-[var(--radius)] px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export default buttonVariants;

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
