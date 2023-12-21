import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const styletd = 'text-center px-4 py-2 '

const Image = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [shouldRefetch, setShouldRefetch] = useState(false)

    const { images } = useSelector(state => state.image)

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredImages = [];
    const searchValueAsNumber = parseInt(searchValue, 10); // Chuyển đổi searchValue thành số nguyên

    if (!isNaN(searchValueAsNumber) && images && Array.isArray(images)) {
        filteredImages = images.filter((item) =>
            // Kiểm tra nếu item.idProduct là số nguyên và giống với searchValueAsNumber
            Number.isInteger(item.idProduct) && item.idProduct === searchValueAsNumber
        );
    }

    useEffect(() => {
        if (shouldRefetch) {
            dispatch(actions.getImages())
            setShouldRefetch(false)
        } else
            dispatch(actions.getImages())
    }, [dispatch, shouldRefetch])

    const renderTableRow = (item) => {
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
                </tr>
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
                    placeholder='Search by id product'
                    value={searchValue}
                    onChange={handleSearch}
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