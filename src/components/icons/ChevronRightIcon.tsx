import { IconProps } from "./icon.types";

const ChevronRightIcon = ({
  width = 24,
  height = 24,
  stroke = "#1E1E1E",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;
