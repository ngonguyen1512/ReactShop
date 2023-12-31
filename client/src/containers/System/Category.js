import axios from 'axios';
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const { TiDeleteOutline } = icons;

const styletd = 'text-center px-4 py-2 '

const Category = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldReload, setShouldReload] = useState(false)
  const { currentData } = useSelector(state => state.user)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { functions } = useSelector(state => state.function)
  const { categories } = useSelector(state => state.category)
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
    const searchRegex = new RegExp(searchValue, 'i');
    filteredCategories = categories.filter((item) =>
      searchRegex.test(item.name)
    );
  }

  const uploadFileAndDispatch = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('http://localhost:5000/api/v1/image/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };
  const handleSubmitCreate = async () => {
    let finalPayload = { ...payload };
    let fileInput = document.querySelector('input[type="file"]');
    let file = fileInput.files[0];
    finalPayload.image = file.name; // Use the file name directly
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createCategories(finalPayload)).then(() => {
        uploadFileAndDispatch(file)
          .then(response => {
            console.log('File uploaded to server:', response.data);
          }).catch(error => {
            console.error('Error uploading file:', error);
          });
        setShouldRefetch(true)
      }).catch(error => {
        console.error('Error dispatching action:', error);
      });
    }
  }
  const handleSubmitUpdate = async () => {
    let finalPayload = { ...payload };
    let fileInput = document.querySelector('input[type="file"]');
    let file = fileInput.files[0];
    finalPayload.image = file.name; // Use the file name directly
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.updateCategories(finalPayload)).then(() => {
        uploadFileAndDispatch(file)
          .then(response => {
            console.log('File uploaded to server:', response.data);
          }).catch(error => {
            console.error('Error uploading file:', error);
          });
        setPayload({ id: '', name: '', image: '' })
        setShouldRefetch(true)
      }).catch(error => {
        console.error('Error dispatching action:', error);
      });
    }
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

  useEffect(() => {
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    if (shouldRefetch) {
      dispatch(actions.getCategories())
      dispatch(actions.getFunctions(searchParamsObject))
      setShouldRefetch(false)
    } else {
      dispatch(actions.getCategories())
      dispatch(actions.getFunctions(searchParamsObject))
    }
  }, [dispatch, permis, shouldRefetch])

  const mapRows = (data) => {
    return data.map((item) => {
      const handleClickRow = () => {
        setPayload({ ...payload, id: item.id, name: item.name });
      };
      return (
        <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
          <td className={`${styletd}`}>{item.id}</td>
          <td className='w-[20%]'>
            <img src={`/images/${item.image}`} alt={item.name} className='w-[100%] object-cover' />
          </td>
          <td className='px-4 py-2'>{item.name}</td>
        </tr>
      );
    });
  }

  return (
    <div className='category'>
      <div className='header-category end'>
        <input type="text"
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-category'>
          <InputForm type="text"
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
          />
          <InputForm type='file'
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'IMAGE'}
            value={payload.image}
            setValue={setPayload}
            keyPayload={'image'}
          />
          <span className='hide'></span>
          {payload.id ? (
            <div className='update-category'>
              <Button fullWidth
                text={'UPDATE'}
                value={payload.id}
                onClick={handleSubmitUpdate}
              />
              <span onClick={() => setPayload({ ...payload, id: '', name: '', image: '' })}
                className='icons-clear center'>
                <TiDeleteOutline />
              </span>
            </div>
          ) : (
            <Button text={'CREATE'} onClick={handleSubmitCreate}/>
          )}
        </div>
      ))}
      <div className='list-category list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className=''>ID</th>
              <th className='w-[20%]'>IMAGE</th>
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