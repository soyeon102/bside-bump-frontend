import { IconProps } from "./icon.types";

const CheckedGreenIcon = ({
  width = 20,
  height = 20,
  color = "#009E36",
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
      <g filter="url(#filter0_b_3189_1768)">
        <rect width={width} height={height} rx="10" fill={color} />
        <path
          d="M14 7.25L8.49998 12.75L5.99997 10.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_3189_1768"
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
            result="effect1_backgroundBlur_3189_1768"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_3189_1768"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CheckedGreenIcon;
