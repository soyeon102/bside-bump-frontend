import CloseIcon from "@public/icons/close.svg";

const Chip = ({
  selectedCategory,
  value,
  label,
  onClickChip,
  hasDelete,
  onClickDelete,
}: {
  selectedCategory?: string;
  value: string;
  label: string;
  onClickChip?: () => void;
  hasDelete?: boolean;
  onClickDelete?: () => void;
}) => {
  return (
    <div className="relative min-w-fit">
      <div
        onClick={onClickChip}
        className={`min-h-9 font-semibold text-sm text-center rounded-half inline-block px-4 py-2 relative max-h-9 ${
          selectedCategory === value
            ? "bg-black text-primary01"
            : "bg-gray04 text-gray01"
        } ${!hasDelete && "cursor-pointer"}`}
        defaultValue={value}
      >
        {label}
      </div>
      {hasDelete && (
        <span
          className="absolute top-[-4px] right-[-4px] border-gray04 border rounded-full	p-[2px] bg-white cursor-pointer"
          onClick={onClickDelete}
        >
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export default Chip;
