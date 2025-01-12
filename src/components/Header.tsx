import { ChevronLeftIcon } from "./icons";

type HeaderProps = {
  title: string;
  hasBack: boolean;
  onClickBack: () => void;
};

const Header = ({ title, hasBack = false, onClickBack }: HeaderProps) => {
  return (
    <nav className="flex justify-between items-center h-12 px-2 relative z-0">
      <div className="flex flex-1 items-center justify-start">
        <button className="w-[46px] h-[46px] flex items-center justify-center">
          {hasBack && (
            <ChevronLeftIcon className="cursor-pointer" onClick={onClickBack} />
          )}
        </button>
      </div>
      <div className="flex-1 text-center text-gray01 text-title-sm ">
        {title}
      </div>
      <div className="flex-1"></div>
    </nav>
  );
};

export default Header;
