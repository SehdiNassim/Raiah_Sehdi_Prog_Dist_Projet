import React, { useCallback, useState } from 'react'
import style from './style.module.css'
import { FiEye } from 'react-icons/fi'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import googleLogin from '../../../Helpers/googleLogin'
// import * as Yup from 'yup'


// const SigninSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email'),
//     password: Yup.string().matches(
//         "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[!,.@#%$&^*()_-])(?=.*[A-Z])(?=.*[a-z]).*$",
//         "Doit contenir à la fois : 8 caractères minimum, un caractère en majuscule, un caractère en minuscule, un chiffre et un caractère spécial."
//     ),
// });

const SignIn = () => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const login = useCallback(
        // payload => dispatch({ type: 'user/SET_STATE', payload:{isLoggedIn:true} }),
        payload => dispatch({ type: 'user/LOGIN', payload }),
        [dispatch]
    )
    const formik = useFormik({
        // validationSchema: SigninSchema,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            login({ ...values })

        },
    });

    return <div className='container d-flex justify-content-center p-5'>
        <form className={`w-100 mx-auto d-flex flex-column align-items-center ${style['sign-in']}`} onSubmit={formik.handleSubmit}>
            <div className='header-4'>Bienvenue dans IShop</div>
            <div className='w-100 d-flex flex-column'>
                <label
                    htmlFor='email'
                    className='default-input-label'>Email</label>
                <input
                    id='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type='email'
                    required={true}
                    className='default-input'
                    placeholder=''
                    autoComplete='off' />
            </div>
            <div className='w-100 d-flex flex-column'>
                <label htmlFor='password'
                    className='default-input-label'>Mot de passe</label>
                <div className="w-100 position-relative">
                    <input
                        id='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className='default-input'
                        type={show ? 'text' : 'password'}
                        required={true}
                        placeholder=''
                        autoComplete='off' />
                    <FiEye className='show-pwd'
                        onClick={e => setShow(!show)} />
                </div>
                {/* <div className='small-text red-text mt-1' style={{ height: '48px' }}>{formik.errors.password}</div> */}
            </div>
            <button type='submit' className='default-btn mt-4'>Connexion</button>
            <div className='mx-auto'>
            <img className='mx-2 cursor-pointer' src='/google.png' alt='google logo' 
            onClick={e=>googleLogin()}
             />
            </div>
            <div className='small-text'>Je n'ai pas de compte -
                <Link to='/auth/sign-up' className='green-text mx-1'>créer un compte</Link>
            </div>
        </form>
    </div>
}


export default SignIn