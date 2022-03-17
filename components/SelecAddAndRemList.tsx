type Props = {
  itemList: any[];
  onClick: (index: number) => void;
  ItemComponent: ({ item, index, onClick }: any) => JSX.Element;
};

const SelecAddAndRemList = ({ itemList, onClick, ItemComponent }: Props) => (
  <div className='flex flex-col h-[400px] w-full gap-1 py-5 px-3 overflow-scroll border-2 border-indigo-500'>
    {itemList.map((item: any, index: number) => (
      <ItemComponent
        key={item.id}
        item={item}
        index={index}
        onClick={onClick}
      />
    ))}
  </div>
);

export default SelecAddAndRemList;
