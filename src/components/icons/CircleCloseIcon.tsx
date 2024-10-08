import { IconProps } from "./icon.types";

const CircleCloseIcon = ({
  width = 14,
  height = 14,
  color = "white",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="14" height="14" rx="7" fill={color} />
      <path
        d="M3.73335 11.0833L2.91669 10.2667L6.18335 7L2.91669 3.73333L3.73335 2.91667L7.00002 6.18333L10.2667 2.91667L11.0834 3.73333L7.81669 7L11.0834 10.2667L10.2667 11.0833L7.00002 7.81667L3.73335 11.0833Z"
        fill="black"
      />
    </svg>
  );
};

export default CircleCloseIcon;
