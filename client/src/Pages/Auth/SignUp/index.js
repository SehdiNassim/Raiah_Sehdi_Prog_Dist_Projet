import React, { useCallback, useState } from 'react'
import style from './style.module.css'
import { FiEye } from 'react-icons/fi'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { register } from '../../../Services/Auth'
import { useHistory } from 'react-router'
import toast from './../../../Helpers/toast';
import * as Yup from 'yup'
import googleLogin from '../../../Helpers/googleLogin'


const SignUpSchema = Yup.object().shape({
    password: Yup.string().matches(
        "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[!,.@#%$&^*()_-])(?=.*[A-Z])(?=.*[a-z]).*$",
        "Doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial."
    ),
});
const SignUp = () => {

    const history = useHistory()
    const [show, setShow] = useState(false)
    const formik = useFormik({
        validationSchema: SignUpSchema,
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
        onSubmit: values => {
            register(values)
                .then(res => {
                    toast('success', 'Votre compte a été créé avec succés, vous pouvez vous connecter')
                    history.push('/auth/sign-in')
                })

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
                <label
                    htmlFor='email'
                    className='default-input-label'>Nom</label>
                <input
                    id='lastName'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    type='text'
                    required={true}
                    className='default-input'
                    placeholder=''
                    autoComplete='off' />
            </div>
            <div className='w-100 d-flex flex-column'>
                <label
                    htmlFor='email'
                    className='default-input-label'>Prénom</label>
                <input
                    id='firstName'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    type='text'
                    required={true}
                    className='default-input'
                    placeholder=''
                    autoComplete='off' />
            </div>
            <div className='w-100 d-flex flex-column'>
                <label htmlFor='phoneNumber'
                    className='default-input-label'>Numéro de téléphone</label>
                <input
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className='default-input'
                    type='text'
                    placeholder=''
                    pattern="^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$"
                    required={true}
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
                <div className='small-text red-text mt-1' style={{ height: '24px' }}>{formik.errors.password}</div>
            </div>
            <button type='submit' className='default-btn mt-4'>Connexion</button>
            <img className='mx-2 cursor-pointer' src='/google.png' alt='google logo' 
            onClick={e=>googleLogin()}
             />
            <div className='small-text'>J'ai déjà un compte.
                <Link to='/auth/sign-in' className='green-text mx-1'>Se connecter</Link>
            </div>
        </form>
    </div>
}


export default SignUp