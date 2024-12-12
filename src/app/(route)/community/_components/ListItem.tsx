import { UserIcon } from "@/components/icons";

const ListItem = () => {
  return (
    <li className="flex flex-col gap-6 p-6 bg-white">
      <div className="flex items-center gap-2">
        <UserIcon />
        <p className="font-bold text-gray01">익명 245474</p>
        <p className="text-gray02 text-xs bg-gray04 rounded-md text-center px-1 py-[2px]">
          10분 전
        </p>
      </div>
      <div className="w-full border-l-2 py-2 px-4 border-primary04 flex flex-col gap-2 bg-primary01 bg-opacity-10">
        <p className="text-gray02 font-bold text-sm">
          닌텐도 스위치 350,000원 그 돈이면
        </p>
        <p className="text-primary04 text-sm">
          햄버거 x 40 (남은 돈 500원) 혹은 닭강정 x 17 (남은 돈 10,000원)
        </p>
      </div>
      <div className="text-gray01">
        닌텐도 스위치 하나에 이정도나 살 수 있다고....?
        <br />
        먹는게 낫나 스위치 사는게 낫나.........후
        <br />
        다들 어떻게 생각해...?
        <br />
      </div>
      <div className="p-4 rounded-2xl border-gray03 border p">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-primary04 font-bold">투표결과: 참는다</p>
          <p className="text-sm font-bold">9,123명 참여</p>
        </div>
        <div className="w-full overflow-hidden text-sm rounded-lg bg-primary01 bg-opacity-10 relative after:contetn-[''] after:absolute after:top-0 after:left-0 after:w-2/3 after:h-full after:rounded-lg after:bg-primary03 p-3 text-gray01 flex items-center justify-between">
          <p className="text-gray01 relative z-10">참는다</p>
          <p className="text-gray02 text-opacity-50 relative z-10 font-bold">
            68%
          </p>
        </div>
        <div className="mt-2 overflow-hidden text-sm rounded-lg w-full bg-gray03 bg-opacity-10 relative after:contetn-[''] after:absolute after:top-0 after:left-0 after:w-2/5 after:h-full after:rounded-lg after:bg-gray03 p-3 text-gray01 flex items-center justify-between">
          <p className="text-gray01 relative z-10">지른다</p>
          <p className="text-gray02 text-opacity-50 relative z-10 font-bold">
            32%
          </p>
        </div>
      </div>
      <div className="text-sm">
        댓글 <span className="font-bold">9</span>
      </div>
    </li>
  );
};

export default ListItem;
