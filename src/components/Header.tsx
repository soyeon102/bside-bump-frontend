import { ChevronLeftIcon } from "./icons";

const Header = ({
  title,
  hasBack = false,
  onClickBack,
}: {
  title?: string;
  hasBack: boolean;
  onClickBack: () => void;
}) => {
  return (
    <nav className="flex justify-between items-center h-12 px-2 relative z-0">
      <div className="flex flex-grow items-center justify-start">
        <button className="w-[46px] h-[46px] flex items-center justify-center">
          {hasBack && (
            <ChevronLeftIcon className="cursor-pointer" onClick={onClickBack} />
          )}
        </button>
      </div>
      <div className="flex-grow text-gray01 text-title-sm ">{title}</div>
      <div className="flex-grow"></div>
    </nav>
  );
};

export default Header;
