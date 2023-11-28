import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline } = icons;

const styletd = 'text-center px-4 py-2 '

const Sample = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const { states } = useSelector(state => state.state)
  const { samples } = useSelector(state => state.sample)
  const { currentData } = useSelector(state => state.user)
  const { functions } = useSelector(state => state.function)
  const { categories } = useSelector(state => state.category)
  const permis = currentData.idPermission

  const [payload, setPayload] = useState({
    id: '' || null, idCategory: '', name: '', idState: ''
  });

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredSamples = [];
  if (samples && Array.isArray(samples)) {
    filteredSamples = samples.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createSamples(payload))
      setPayload({ id: '', idCategory: '', name: '', idState: '' })
    }
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateSamples(payload))
    setPayload({ id: '', idCategory: '', name: '', idState: '' })
  }
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);

    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          msg: 'You must not leave this input blank!'
        }])
        invalids++;
        return;
      }
    })
    return invalids;
  }

  const renderSampleRow = (item) => {
    const handleClickRow = () => {
      setPayload({ ...payload, id: item.id, idCategory: item.idCategory, name: item.name, idState: item.idState })
    };
    return (
      <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
        <td className={styletd}>{item.id}</td>
        <td className={styletd}>{item.idCategory}</td>
        <td className='px-4 py-2'>{item.name}</td>
        <td className={styletd}>{item.idState}</td>
      </tr>
    );
  };

  useEffect(() => {
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    dispatch(actions.getStates())
    dispatch(actions.getCategories())
    dispatch(actions.getAllSamples())
    dispatch(actions.getFunctions(searchParamsObject))
  }, [dispatch, permis, payload.idCategory])

  return (
    <div className='sample'>
      <div className='header-sample between'>
        <span></span>
        <input
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-sample'>
          <div>
            <label className='text-xs mt-4'>ID CATEGORY</label>
            <select value={payload.idCategory}
              onChange={(e) => setPayload({ ...payload, idCategory: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full '>
              <option value="">Select ID CATEGORY</option>
              {categories?.length > 0 && categories.map(item => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
            type='text'
          />
          <div>
            <label className='text-xs mt-4'>STATE</label>
            <select value={payload.idState}
              onChange={(e) => setPayload({ ...payload, idState: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full'>
              <option value="">Select STATE</option>
              {states?.length > 0 && states.map(item => (item.id === 1 || item.id === 2) && (
                <option value={item.id}>{item.id} - {item.name}</option>
              ))}
            </select>
          </div>
          {payload.id ? (
            <div className='update-category'>
              <Button
                text={'UPDATE'}
                value={payload.id}
                onClick={handleSubmitUpdate}
              />
              <span onClick={() => setPayload({ ...payload, id: '', idCategory: '', name: '', idState: '' })}
                className='icons-clear center'>
                <TiDeleteOutline />
              </span>
            </div>
          ) : (
            <Button
              text={'CREATE'}
              onClick={handleSubmitCreate}
            />
          )}
        </div>
      ))}
      <div className='list-sample list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-lg'>ID</th>
              <th className='text-lg'>ID CATEGORY</th>
              <th className='text-lg'>NAME</th>
              <th className='text-lg'>STATE</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredSamples.length > 0 && filteredSamples.map((item) => renderSampleRow(item))}
            {!shouldReload && samples?.length > 0 && samples.map((item) => renderSampleRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sample