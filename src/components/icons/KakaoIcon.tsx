import { IconProps } from "./icon.types";

const KakaoIcon = ({
  width = 25,
  height = 24,
  color = "#4A4A4C",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.215 4C8.4987 4 4.66675 7.1 4.66675 10.9C4.66675 13.3 6.23883 15.4 8.4987 16.7L7.90917 20L11.5446 17.6C12.0359 17.7 12.6254 17.7 13.1167 17.7C17.8329 17.7 21.6649 14.6 21.6649 10.8C21.7632 7.1 17.9312 4 13.215 4Z"
        fill={color}
      />
    </svg>
  );
};

export default KakaoIcon;
