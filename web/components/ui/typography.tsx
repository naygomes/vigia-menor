import { cn } from "@/lib/utils";

interface TypographyProps {
  level?: "h1" | "h2" | "h3" | "p";
  align?: "left" | "center" | "right" | "justify";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  color?: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
}

export function Typography({
  level = "p",
  align,
  weight,
  color,
  size,
  className,
  children,
}: TypographyProps) {
  const Tag = level;

  const baseStyles = {
    h1: "scroll-m-20 text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight",
    h2: "scroll-m-20 text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-xl sm:text-2xl lg:text-2xl font-semibold tracking-tight",
    p: "text-base sm:text-lg leading-7 [&:not(:first-child)]:mt-6",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const weightStyles = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  return (
    <Tag
      className={cn(
        baseStyles[level],
        align && alignStyles[align],
        weight && weightStyles[weight],
        color && color,
        className,
      )}
      style={size ? { fontSize: size } : undefined}
    >
      {children}
    </Tag>
  );
}
