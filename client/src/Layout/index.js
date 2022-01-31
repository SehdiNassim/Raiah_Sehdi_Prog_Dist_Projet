import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router'
import AppLayout from './AppLayout/index';
import Loader from './../Components/Loader/index';


const Layout = ({ children, location }) => {
    const admin = useSelector(state => state.user)
    const BootstrappedLayout = () => {
        if(admin.loadUser) return <Loader/>
        if ((!admin.isLoggedIn && location.pathname.split('/').includes('auth'))) return <>{children}</>
        if (!admin.isLoggedIn) return <Redirect to='/auth/sign-in' />
        if (location.pathname.split('/').includes('auth')) return <Redirect to='/' />
        return <AppLayout>{children}</AppLayout>
    }
    return <>
        {BootstrappedLayout()}
    </>
}


export default withRouter(Layout)