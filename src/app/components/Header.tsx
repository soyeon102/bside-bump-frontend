import LeftArrow from "@public/icons/chevron-left.svg";

const Header = ({
  hasBack = false,
  onClickBack,
}: {
  hasBack: boolean;
  onClickBack: () => void;
}) => {
  return (
    <nav className="flex justify-between items-center h-11 mb-7 px-6 relative z-0">
      <div className="flex justify-start flex-1">
        {hasBack && (
          <LeftArrow className="cursor-pointer" onClick={onClickBack} />
        )}
      </div>
      <div className="flex-1"></div>
      <div className="flex-1"></div>
    </nav>
  );
};

export default Header;
