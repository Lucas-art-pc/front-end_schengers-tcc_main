const VARIABLE_TYPOGRAPH = {
  title: "h1",
  subtitle: "h2",
  paragraph: "p",
  title_large: "h1",
  title_small: "h3",
};

const STYLE_TYPOGRAPH = {
  // 48px desktop → 28px mobile
  title_large: "text-[1.75rem] sm:text-4xl lg:text-5xl font-bold leading-tight",

  // 30px desktop → 22px mobile
  title: "text-[1.375rem] sm:text-2xl lg:text-3xl font-bold leading-snug",

  // 24px desktop → 20px mobile
  subtitle: "text-xl sm:text-2xl font-semibold leading-snug",

  // 20px desktop → 17px mobile
  title_small: "text-[1.0625rem] sm:text-lg lg:text-xl font-semibold",

  // 16px desktop → 14px mobile
  paragraph: "text-sm sm:text-base text-gray-700 leading-relaxed",
};

export const Typograph = ({
  tag = "paragraph",
  children,
  className = "",
  ...props
}) => {
  const Tag = VARIABLE_TYPOGRAPH[tag] || "p";
  const style = STYLE_TYPOGRAPH[tag] || "";

  return (
    <Tag className={`${style} ${className}`} {...props}>
      {children}
    </Tag>
  );
};