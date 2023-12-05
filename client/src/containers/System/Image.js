import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline } = icons;

const styletd = 'text-center px-4 py-2 '

const Image = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const { categories } = useSelector(state => state.category)
    const permis = currentData.idPermission

    const { images } = useSelector(state => state.image)

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredImages = [];
    // if (quantities && Array.isArray(quantities)) {
    //     filteredImages = quantities.filter((item) =>
    //         item.name.includes(searchValue)
    //     );
    // }

    useEffect(() => {
        if (shouldRefetch) {
            dispatch(actions.getImages())
            setShouldRefetch(false)
        } else {
            dispatch(actions.getImages())
        }
    }, [dispatch, shouldRefetch])

    const renderTableRow = (item) => {
        // const handleClickRow = () => { setPayload({ ...payload, id: item.id }) };
        // const handleDetail = () => {
        //     if (payload.id === item.id) {
        //         setPayload({ id: null });
        //         setIsShowDetail(false);
        //     } else {
        //         setPayload({ ...payload, id: item.id });
        //         setIsShowDetail(true);
        //     }
        // };
        return (
            <>
                <tr key={item.id} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={styletd}>{item.id}</td>
                    <td className={styletd}>{item.idProduct}</td>
                    <td className='w-[12%]'>
                        <img src={`/images/${item.image1}`} alt={item.image1} className='w-[100%] object-cover' />
                    </td>
                    <td className='w-[12%]'>
                        <img src={`/images/${item.image2}`} alt={item.image2} className='w-[100%] object-cover' />
                    </td>
                    <td className='w-[12%]'>
                        <img src={`/images/${item.image3}`} alt={item.image3} className='w-[100%] object-cover' />
                    </td>
                    <td className='w-[12%]'>
                        <img src={`/images/${item.image4}`} alt={item.image4} className='w-[100%] object-cover' />
                    </td>
                    <td className={styletd}>{item.idColor}</td>
                    {/* <td className={`w-[4%] ${styletd}`}>
                        <Button fullWidth
                            IcAfter={BiDetail}
                            value={payload.id}
                            setValue={setPayload}
                            onClick={() => handleDetail()}
                        />
                    </td>
                    <td className={`w-[4%] ${styletd}`}>
                        <Button fullWidth
                            IcAfter={CiEdit} */}
                    {/* // value={payload.id}
                        // setValue={setPayload}
                        // onClick={() => handleDetail()}
                        /> */}
                    {/* </td> */}
                </tr>
                {/* {isShowDetail && payload.id === item.id && (
                    <tr className='bg-[#ddd]'>
                        <td colSpan={2} className={styletd}>{item.idCategory} - {item?.product_category.name}</td>
                        <td colSpan={6} className={styletd}>{item.information}</td>
                    </tr>
                )} */}
            </>
        );
    };

    return (
        <div className='image'>
            <div className='header-image between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                // onChange={handleSearch}
                />
            </div>
            <div className='list-image list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PRODUCT</th>
                            <th colSpan={4}>IMAGE</th>
                            <th>COLOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredImages.length > 0 && filteredImages.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(images) && images?.length > 0 && images.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Image