import { IconProps } from "./icon.types";

const ChevronUpIcon = ({
  width = 16,
  height = 16,
  stroke = "#CDD1D6",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 10L8 6L12 10"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronUpIcon;
