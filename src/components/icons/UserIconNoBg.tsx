import { IconProps } from "./icon.types";

const UserIconNoBg = ({
  width = 16,
  height = 17,
  color = "#ACACB6",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3189_635)">
        <path
          d="M7.99999 8.49935C9.47332 8.49935 10.6667 7.30602 10.6667 5.83268C10.6667 4.35935 9.47332 3.16602 7.99999 3.16602C6.52666 3.16602 5.33332 4.35935 5.33332 5.83268C5.33332 7.30602 6.52666 8.49935 7.99999 8.49935ZM7.99999 9.83268C6.21999 9.83268 2.66666 10.726 2.66666 12.4993V13.8327H13.3333V12.4993C13.3333 10.726 9.77999 9.83268 7.99999 9.83268Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3189_635">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserIconNoBg;
