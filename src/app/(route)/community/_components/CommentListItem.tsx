const CommentListItem = ({ comment }: { comment: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-gray01">익명 123456</p>
        <p className="text-xs text-gray05">13분 전</p>
      </div>
      <p className="text-gray02">{comment}</p>
      <div className="flex items-center gap-3">
        <p className="text-xs text-gray05">
          답글 <span className="font-bold">1</span>
        </p>
        <button className="text-xs text-gray05">답글달기</button>
      </div>
    </div>
  );
};

export default CommentListItem;
