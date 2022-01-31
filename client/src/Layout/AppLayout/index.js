import React, { useEffect } from 'react'
import style from './style.module.css'
import Navbar from './../../Components/AppLayout/Navbar/index';
import Menu from './../../Components/AppLayout/Menu/index';
import { useLocation } from 'react-router';


const AppLayout = ({ children }) => {
    const location = useLocation()
    useEffect(()=>{
        window.scroll(0,0)
    },[location])
    return <div className={style['app-layout']}>
        <Navbar />
        <div className={style['app-layout-bottom']}>
            <Menu/>
            <div className={style['app-layout-content']}>
                {children}
            </div>
        </div>
    </div>
}

export default AppLayout