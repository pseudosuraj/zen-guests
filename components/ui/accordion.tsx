// components/ui/accordion.tsx
"use client"
import * as React from "react";

type AccordionItemType = React.PropsWithChildren<{
  value: string;
}>;

type AccordionProps = React.PropsWithChildren<{
  type: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}>;

function Accordion({ children, className = "" }: AccordionProps) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

function AccordionItem({ children, value }: AccordionItemType) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {React.Children.map(children, (child: any) => {
        if (child.type.displayName === "AccordionTrigger") {
          return React.cloneElement(child, {
            open,
            onClick: () => setOpen((v: boolean) => !v),
          });
        }
        if (child.type.displayName === "AccordionContent") {
          return open ? child : null;
        }
        return child;
      })}
    </div>
  );
}

function AccordionTrigger({
  children,
  onClick,
  open,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={`w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none font-medium rounded-lg transition ${className}`}
    >
      <span>{children}</span>
      <span className="ml-2">{open ? "−" : "+"}</span>
    </button>
  );
}
AccordionTrigger.displayName = "AccordionTrigger";

function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 pb-4 text-gray-700 ${className || ""}`}>
      {children}
    </div>
  );
}
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
