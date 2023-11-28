import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline, BiDetail } = icons;

const styletd = 'text-center py-2 '

const Account = () => {
  const showDetailRef = useRef(null)
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false)
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { currentData } = useSelector(state => state.user)
  const { functions } = useSelector(state => state.function)
  const { accounts } = useSelector(state => state.account)

  const permis = currentData.idPermission

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredAccounts = [];
  if (accounts && Array.isArray(accounts)) {
    filteredAccounts = accounts.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  useEffect(() => {
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    if (shouldRefetch) {
      dispatch(actions.getAccounts())
      dispatch(actions.getFunctions(searchParamsObject))
      setShouldRefetch(false)
    } else {
      dispatch(actions.getAccounts())
      dispatch(actions.getFunctions(searchParamsObject))
    }
  }, [dispatch, permis, shouldRefetch])

  const renderTableRow = (item) => {
    const handleClickRow = (id) => {
      setSelectedItemId(id);
      setIsShowDetail(true);
    };

    // const handleClickRow = () => {
    //   setPayload({ ...payload, id: item.id });
    //   setPayloadu({ ...payloadu, id: item.id, name: item.name, state: item.state});
    // };
    //
    return (
      <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
        <td className={styletd}>{item.id}</td>
        <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
        <td className='py-2'>{item.name}</td>
        {/* <td className='py-2'>{item.email}</td> */}
        <td className={styletd}>{item.phone}</td>
        {/* <td className='py-2'>{item.address}</td> */}
        <td className={styletd}>{item.idPermission}</td>
        <td className={styletd}>{item.idState}</td>
        <td className={styletd}>
          <span ref={showDetailRef}>
            <Button
              fullWidth
              IcAfter={BiDetail}
              onClick={() => handleClickRow(item.id)}
            />
          </span>
          {isShowDetail && selectedItemId === item.id && (
            <div className='detail-account'>
              {item.email} - {item.address}
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className='account'>
      <div className='header-account between'>
        <span></span>
        <input
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <div className='form-account'>

      </div>
      <div className='list-account list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>PERMIS</th>
              <th>STATE</th>
              <th>DETAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredAccounts.length > 0 && filteredAccounts.map((item) => renderTableRow(item))}
            {!shouldReload && Array.isArray(accounts) && accounts?.length > 0 && accounts.map((item) => renderTableRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Account