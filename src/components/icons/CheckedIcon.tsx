import { IconProps } from "./icon.types";

const CheckedIcon = ({
  width = 20,
  height = 20,
  color = "#46FF85",
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
      <g filter="url(#filter0_b_2178_9868)">
        <rect width="20" height="20" rx="10" fill={color} />
        <path
          d="M14 7.24998L8.5 12.75L5.99998 10.25"
          stroke="#1E1E1E"
          strokeWidth="1.20001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_2178_9868"
          x="-4"
          y="-4"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2178_9868"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2178_9868"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CheckedIcon;
