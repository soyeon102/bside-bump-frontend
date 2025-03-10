import { IconProps } from "./icon.types";

const SendIcon = ({
  width = 24,
  height = 24,
  color = "#CDD1D6",
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
      <circle cx="12" cy="12" r="12" fill={color} />
      <g clipPath="url(#clip0_3393_806)">
        <path
          d="M6.18115 11.9998L7.20661 13.0253L11.2721 8.9671V17.818H12.7266V8.9671L16.7848 13.0325L17.8175 11.9998L11.9993 6.18164L6.18115 11.9998Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3393_806">
          <rect
            width="17.4545"
            height="17.4545"
            fill="white"
            transform="translate(3.27271 3.27344)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SendIcon;
