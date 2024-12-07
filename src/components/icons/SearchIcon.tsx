import { IconProps } from "./icon.types";

const SearchIcon = ({
  width = 20,
  height = 20,
  color = "#ACAFB3",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.55556 15.1111C12.6238 15.1111 15.1111 12.6238 15.1111 9.55556C15.1111 6.48731 12.6238 4 9.55556 4C6.48731 4 4 6.48731 4 9.55556C4 12.6238 6.48731 15.1111 9.55556 15.1111Z"
        stroke={color}
        strokeWidth="1.38889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4998 16.4993L13.479 13.4785"
        stroke={color}
        strokeWidth="1.38889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
