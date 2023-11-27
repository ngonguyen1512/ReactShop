import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'

const styletd = 'text-center px-4 py-2 '

const Category = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const { functions } = useSelector(state => state.function)
  const { categories } = useSelector(state => state.category)
  const { currentData } = useSelector(state => state.user)
  const permis = currentData.idPermission
  const [payload, setPayload] = useState({
    id: '' || null, name: '', image: ''
  });

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredCategories = [];
  if (categories && Array.isArray(categories)) {
    filteredCategories = categories.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  useEffect(() => {
    dispatch(actions.getFunctions(permis))
    dispatch(actions.getCategories())
  }, [dispatch, permis])

  const mapRows = (data) => {
    return data.map((item) => {
      const handleClickRow = () => {
        setPayload({ ...payload, id: item.id, name: item.name, image: item.image, state: item.state });
      };
      return (
        <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
          <td className={`w-[30%] ${styletd}`}>{item.id}</td>
          <td className='w-[10%]'>
            <img src={`/images/${item.image}`} alt={item.name} className='w-[100%] object-cover' />
          </td>
          <td className='px-4 py-2'>{item.name}</td>
        </tr>
      );
    });
  }

  return (
    <div className='category'>
      <div className='header-category between'>
        <span></span>
        <input
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 rounded-md w-[20%] '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <div className='list-table h-96'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='w-[30%]'>ID</th>
              <th className='w-[10%]'>IMAGE</th>
              <th className=''>NAME</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredCategories.length > 0 && mapRows(filteredCategories)}
            {!shouldReload && categories?.length > 0 && mapRows(categories)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category