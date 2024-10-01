"use client";

const Button = ({
  children,
  onClick,
  disable = false,
  color,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disable?: boolean;
  color?: keyof typeof colorVariants;
}) => {
  const colorVariants = {
    plain: "bg-black text-primary01",
    home: "bg-[#35E15B] text-black",
  };
  return (
    <button
      type="button"
      className={`h-14 w-full py-2.5 px-5 text-lg font-bold focus:outline-none rounded-xl ${
        disable && "bg-gray03 text-white"
      } ${color ? colorVariants[color] : ""}`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default Button;
