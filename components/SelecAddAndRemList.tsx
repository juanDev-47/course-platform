type Props = {
  itemList: any[];
  onClick: (index: number) => void;
  children: JSX.IntrinsicElements;
};

const SelecAddAndRemList = ({ itemList, children, onClick }: Props) => (
  <div className='flex flex-col h-[400px] w-full gap-1 py-5 px-3 overflow-scroll  rounded-lg border-2 border-indigo-500'>
    {itemList.map((item: any, index: number) => (
      <children key={item.id} item={item} index={index} onClick={onClick} />
    ))}
  </div>
);

export default SelecAddAndRemList;
