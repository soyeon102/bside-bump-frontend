import { CircleCloseIcon } from "../icons";

const Chip = ({
  selectedCategory,
  value,
  label,
  onClickChip,
  hasDelete,
  onClickDelete,
}: {
  selectedCategory?: number;
  value: number;
  label: string;
  onClickChip?: () => void;
  hasDelete?: boolean;
  onClickDelete?: () => void;
}) => {
  return (
    <div className="relative min-w-fit">
      <div
        onClick={onClickChip}
        className={`min-h-9 font-semibold text-sm text-center rounded-half inline-block px-4 py-2 relative max-h-9 whitespace-nowrap ${
          selectedCategory === value
            ? "bg-black text-primary02"
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
          <CircleCloseIcon />
        </span>
      )}
    </div>
  );
};

export default Chip;
