import { cn } from "@/lib/utils";
import { ReactNode } from "react";
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full lg:max-w-screen-2xl max-w-screen-xl px-5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;