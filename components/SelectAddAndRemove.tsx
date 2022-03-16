import SelecAddAndRemList from '@components/SelecAddAndRemList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

type Props = {
  listSelect: any[];
  setListSelect: React.Dispatch<React.SetStateAction<any[]>>;
  listAvailable: any[];
  setListAvailable: React.Dispatch<React.SetStateAction<any[]>>;
  titleSelect: string;
  titleAvailable: string;
};

const SelectAddAndRemove = ({
  listSelect,
  setListSelect,
  listAvailable,
  setListAvailable,
  titleSelect,
  titleAvailable,
}: Props) => {
  const changeItem = (
    index: number,
    listSource: any,
    listChange: any,
    setListSource: any,
    setListChange: any
  ) => {
    const item: any = listSource[index];
    const updatedListSource = [...listSource];
    updatedListSource.splice(index, 1);
    setListSource(updatedListSource);
    setListChange([...listChange, item]);
  };

  const addItemSelect = (index: number) => {
    changeItem(
      index,
      listAvailable,
      listSelect,
      setListAvailable,
      setListSelect
    );
  };

  const removeItemSelect = (index: number) => {
    changeItem(
      index,
      listSelect,
      listAvailable,
      setListSelect,
      setListAvailable
    );
  };
  return (
    <div className='flex flex-row gap-5 w-full'>
      <div className='flex flex-col w-full gap-3 items-center'>
        <span className='font-semibold'>{titleSelect}</span>
        <SelecAddAndRemList listItem={listSelect} onClick={removeItemSelect} />
      </div>
      <div className='flex flex-col place-content-center gap-3'>
        <span className='font-semibold'>Select</span>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
      </div>
      <div className='flex flex-col w-full gap-3 items-center'>
        <span className='font-semibold'>{titleAvailable}</span>
        <SelecAddAndRemList listItem={listAvailable} onClick={addItemSelect} />
      </div>
    </div>
  );
};
export default SelectAddAndRemove;
