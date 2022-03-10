import ItemCource from 'components/ItemCource';

const ListCource = ({ listCourse, onClick }: any) => (
  <div className='flex flex-col h-[400px] w-full gap-1 py-5 px-3 overflow-scroll  rounded-lg border-2 border-indigo-500'>
    {listCourse.map((course: any, index: any) => (
      <ItemCource
        key={course.id}
        index={index}
        name={course.name}
        platform={course.platform}
        onClick={onClick}
      />
    ))}
  </div>
);

export default ListCource;
