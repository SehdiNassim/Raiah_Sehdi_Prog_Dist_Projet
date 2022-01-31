import React, { useCallback, useState } from 'react'
import style from './style.module.css'
import { FiChevronDown, FiLogOut, FiSettings, FiSidebar, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';



const Navbar = () => {
    const open = useSelector(state => state.menu.open)
    const user = useSelector(state => state.user)
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const toggleOpenMenu = useCallback(
        () => {
            dispatch({ type: 'menu/TOGGLE_OPEN' })
        },
        [dispatch],
    )
    const logout = useCallback(
        () => dispatch({ type: 'user/LOGOUT' }),
        [dispatch]
    )
    return <div className={`container-fluid ${style['navbar']}`}>
        <div className='row align-items-center justify-content-between'>
            <div className={`col-auto d-flex flex-row align-items-center justify-content-between ${style['navbar-right']}`}>
                <div className='header-2 green-text'>IBuy</div>
                <FiSidebar className='header-4 cursor-pointer' onClick={e => toggleOpenMenu()} />
            </div>
            <div className={`col-auto d-flex flex-row align-items-center justify-content-around position-relative ${style['profile']}`}>
                <div className={style['profile-picture-container'] + ' cursor-pointer'} onClick={e=>setShow(true)}>
                    {
                        user.profileURL ?
                            <img src={user.profileURL} alt="profile pic" />
                            :
                            <FiUser className='header-3' />
                    }
                </div>
                <span className='wow-body bold d-none d-lg-flex cursor-pointer text-truncate' style={{ width: "140px" }}
                 onClick={e=>setShow(true)}>
                    {user.firstName + ' ' + user.lastName}
                </span>
                <FiChevronDown className='cursor-pointer wow-subtitle'
                    onClick={e => setShow(true)} />
                {/* Navbar dropdown */}
                <div className={`${show ? " d-flex" : "d-none"} ${style['nav-dropdown']}`}>
                    <div className='small-text grey-text mx-3'>{user.email}</div>
                    <Link to='/profil' className='d-flex flex-row align-items-center' onClick={e => setShow(false)}>
                        <FiSettings className='mx-3' />
                        <div className='small-text'>Profil </div>
                    </Link>
                    <div className={style['dropdown-line']}></div>
                    <div className='d-flex flex-row align-items-center cursor-pointer' onClick={e => logout()}>
                        <FiLogOut className='mx-3' />
                        <div className='small-text'>Déconnexion</div>
                    </div>
                </div>
            </div>
        </div>
        {
            show ? <div className={style['close-dropdown']}
                onClick={e => {
                    setShow(false)
                }}></div>
                : <></>
        }
    </div>
}

export default Navbar