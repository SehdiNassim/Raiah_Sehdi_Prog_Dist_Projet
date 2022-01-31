import React from 'react'
import { FiHome, FiSettings, FiClipboard, FiShoppingCart, FiShoppingBag } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import style from './style.module.css'


const Menu = () => {
    const pathname = useLocation().pathname
    const open = useSelector(state => state.menu.open)
    const dispatch = useDispatch()
    return <div className={`${style['menu']} d-flex flex-column ${open ? style["open"] : ''}`}>
        {open ? <>
            <NavLink to='/' exact className={`${style['menu-primary-item']}`}
                activeClassName="green-text">
                <div className='d-flex gap-3 align-items-center'>
                    <FiHome className='header-4' />
                    <div className='small-text'>Accueil</div>
                </div>
            </NavLink>
            <NavLink to='/mes-magasins' exact className={`${style['menu-primary-item']}`}
                activeClassName="green-text">
                <div className='d-flex gap-3 align-items-center'>
                    <FiShoppingBag className='header-4' />
                    <div className='small-text'>Mes magasins</div>
                </div>
            </NavLink>
            <NavLink to='/mon-panier' exact className={`${style['menu-primary-item']}`}
                activeClassName="green-text">
                <div className='d-flex gap-3 align-items-center'>
                    <FiShoppingCart className='header-4' />
                    <div className='small-text'>Mon panier</div>
                </div>
            </NavLink>
            <NavLink to='/mes-commandes' exact className={`${style['menu-primary-item']}`}
                activeClassName="green-text">
                <div className='d-flex gap-3 align-items-center'>
                    <FiClipboard className='header-4' />
                    <div className='small-text'>Mes commandes</div>
                </div>
            </NavLink>
            <NavLink to='/profil' exact className={`${style['menu-primary-item']}`}
                activeClassName="green-text">
                <div className='d-flex gap-3 align-items-center'>
                    <FiSettings className='header-4' />
                    <div className='small-text'>Mon profil</div>
                </div>
            </NavLink>
        </> : <>
            <NavLink to='/' exact className={`${style['closed-menu-item']}`} activeClassName={`green-text ${style['active']}`}>
                <FiHome className='header-4' />
            </NavLink>
            <NavLink to='/mes-magasins' exact className={`${style['closed-menu-item']}`} activeClassName={`green-text ${style['active']}`}>
                <FiShoppingBag className='header-4' />
            </NavLink>
            <NavLink to='/mon-panier' exact className={`${style['closed-menu-item']}`} activeClassName={`green-text ${style['active']}`}>
                <FiShoppingCart className='header-4' />
            </NavLink>
            <NavLink to='/mes-commandes' exact className={`${style['closed-menu-item']}`} activeClassName={`green-text ${style['active']}`}>
                <FiClipboard className='header-4' />
            </NavLink>
            <NavLink to='/profil' exact className={`${style['closed-menu-item']}`} activeClassName={`green-text ${style['active']}`}>
                <FiSettings className='header-4' />
            </NavLink>
        </>}
    </div>
}

export default Menu