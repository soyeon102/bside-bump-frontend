import Image from "next/image";

type ImageProps = {
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
};

const Logo = ({ width, height }: ImageProps) => {
  return (
    <Image
      src="/imgs/logo.png"
      alt="로고"
      width={width}
      height={height}
      style={{ width: "auto" }}
      priority
    />
  );
};

export default Logo;
