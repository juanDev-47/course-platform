import ListItem from 'components/ListItem';

type Props = {
  listItem: any[];
  onClick: (index: number) => void;
};

const SelecAddAndRemList = ({ listItem, onClick }: Props) => (
  <div className='flex flex-col h-[400px] w-full gap-1 py-5 px-3 overflow-scroll  rounded-lg border-2 border-indigo-500'>
    {listItem.map((item: any, index: number) => (
      <ListItem key={item.id} item={item} index={index} onClick={onClick} />
    ))}
  </div>
);

export default SelecAddAndRemList;
