import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { withRouter } from 'react-router'
import { useDispatch } from 'react-redux';


const GoogleAuth = ({match,history}) => {
    const dispatch = useDispatch()
    const verifyToken = useCallback(
        () => dispatch({ type: 'user/GOOGLE_AUTH', token:match.params.token, history:history }),
        [dispatch]
    )
    useEffect(()=>{
        verifyToken()
    },[])
    return <div/>
}

export default withRouter(GoogleAuth)