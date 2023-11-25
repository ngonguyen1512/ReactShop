import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
import { Link, useSearchParams } from 'react-router-dom';

const Menu = ({ permis }) => {
    const [searchParmas] = useSearchParams();
    const dispatch = useDispatch();
    const { menus } = useSelector(state => state.menu)

    useEffect(() => {
        dispatch(actions.getMenus())
    }, [searchParmas, dispatch])

    return (
        <div>
            {menus?.length > 0 && menus.map((item) => {
                return (
                    <div>
                        {item.idPermission === permis &&
                            <Link to={'/' + item.url}>
                                <div className='cursor-pointer'>
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default memo(Menu)