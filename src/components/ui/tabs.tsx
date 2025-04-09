
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "primary" | "blue" | "green" | "orange" | "purple" | "amber" | "emerald" | "indigo" | "rose" | "cyan" | "violet" | "red"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "data-[state=active]:bg-background data-[state=active]:text-foreground",
    primary: "data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700",
    blue: "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700",
    green: "data-[state=active]:bg-green-50 data-[state=active]:text-green-700",
    orange: "data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700",
    purple: "data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700",
    amber: "data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700",
    emerald: "data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700",
    indigo: "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700",
    rose: "data-[state=active]:bg-rose-50 data-[state=active]:text-rose-700",
    cyan: "data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-700",
    violet: "data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700",
    red: "data-[state=active]:bg-red-50 data-[state=active]:text-red-700",
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
