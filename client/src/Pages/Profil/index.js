import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './style.module.css'
import { FiUpload, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import Loader from './../../Components/Loader'
import toast from './../../Helpers/toast';
import { useDispatch } from 'react-redux';
import { editUser } from '../../Services/User'
import { getUser, editFilesUser } from './../../Services/User';


const Profil = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [data, setData] = useState({});
    const uploadPic = useRef(null)

    const changeProPic = useCallback(
        url => dispatch({ type: 'user/SET_STATE', payload: { profileURL: url } }),
        [dispatch]
    )

    const onUploadPic = e => {
        const formdata = new FormData()
        formdata.append('PROFILE', e.target.files[0])
        editFilesUser(formdata)
            .then(res => {
                changeProPic(URL.createObjectURL(e.target.files[0]))
                setImage(URL.createObjectURL(e.target.files[0]))
            })

    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            birthDate: '',
            gender: '',
            bio: '',
            location: {
                address: '',
                zip: '',
                city: '',
            },
            ...data
        },
        onSubmit: values => {
            const state = { ...values }
            delete state._id
            delete state.profileURL
            delete state.email
            if (values.gender === '') delete state.gender
            editUser({ ...state }).then(res => toast('success', 'Sauvegarde réussie'))
        },
    });
    useEffect(() => {
        setLoading(true)
        getUser().then(res => {
            const user = { ...res.data.user }
            if (user.profileURL) setImage(user.profileURL)
            setData({ ...user, birthDate: user.birthDate ? user.birthDate.substring(0, 10) : '' })
            setLoading(false)
        })
    }, [])
    return <div className='container py-4 px-5'>
        <div className='row'>
            <form className='card col-12 col-md p-4 p-md-5 d-flex flex-column gap-4' onSubmit={formik.handleSubmit}>
                {loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                    <Loader />
                </div> : <>
                    <div className='w-100 d-flex flex-row align-items-center'>
                        <div className={style['profile-pic-container']}>
                            {
                                image ? <img src={image} alt='wow profile' />
                                    : <FiUser className='header-1' />
                            }
                        </div>
                        <input
                            id='img'
                            type='file'
                            hidden accept='.png, .jpg, jpeg'
                            ref={uploadPic} onChange={onUploadPic} />
                        <div>
                            <button type='button' className='default-btn blue-btn' onClick={e => uploadPic.current.click()}>
                                Télécharger une photo
                                <FiUpload className='mx-1 mx-md-2' />
                            </button>
                        </div>
                    </div>

                    <div className='w-100 d-flex flex-column flex-md-row gap-4 gap-md-5 mb-0 mb-md-4'>
                        <div className='w-100 d-flex flex-column'>
                            <label className='small-text bold mb-2 cursor-pointer' htmlFor='firstName'>Prénom</label>
                            <input
                                id='firstName'
                                name='firstName'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                className='default-input'
                                type='text'
                                placeholder='' />
                        </div>
                        <div className='w-100 d-flex flex-column'>
                            <label className='small-text bold mb-2 cursor-pointer' htmlFor='lastName'>Nom</label>
                            <input
                                id='lastName'
                                name='lastName'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                className='default-input'
                                type='text'
                                placeholder='' />
                        </div>
                    </div>


                    <div className='w-100 d-flex flex-column'>
                        <div className='small-text bold mb-2 cursor-pointer'>Sexe</div>
                        <div className='w-100 d-flex flex-column flex-md-row gap-4 gap-md-5'>
                            <div className='d-flex flex-row align-items-center'>
                                <input
                                    type="radio"
                                    id="Male"
                                    name="gender"
                                    value="Male"
                                    checked={formik.values.gender === 'Male'}
                                    onChange={formik.handleChange}
                                    hidden />
                                <label className='custom-radio' htmlFor='Male' />
                                <label htmlFor="Male" className='small-text mx-2 cursor-pointer'>Homme</label>
                            </div>
                            <div className='d-flex flex-row align-items-center'>
                                <input
                                    type="radio"
                                    id="Female"
                                    name="gender"
                                    value="Female"
                                    checked={formik.values.gender === 'Female'}
                                    onChange={formik.handleChange}
                                    hidden />
                                <label className='custom-radio' htmlFor='Female' />
                                <label htmlFor="Female" className='small-text mx-2 cursor-pointer'>Femme</label>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 d-flex flex-column'>
                        <label className='small-text bold mb-2 cursor-pointer' htmlFor='birthDate'> Date de naissance</label>
                        <input
                            id='birthDate'
                            name='birthDate'
                            value={formik.values.birthDate}
                            onChange={formik.handleChange}
                            className='default-input'
                            type='date'
                            max={`${new Date().getFullYear()}-${new Date().getMonth() > 8 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}-${new Date().getDate() > 9 ? new Date().getDate() : '0' + (new Date().getDate())}`} />
                    </div>
                    <div className='w-100 d-flex flex-column'>
                        <label className='small-text bold mb-2 cursor-pointer' htmlFor='location.address'> Adresse personnelle</label>
                        <div className='w-100 d-flex flex-column flex-md-row gap-2'>
                            <input
                                id='location.address'
                                name='location.address'
                                value={formik.values.location.address}
                                onChange={formik.handleChange}
                                className='default-input'
                                type='text'
                                placeholder='Adresse' />
                            <input
                                id='location.zip'
                                name='location.zip'
                                value={formik.values.location.zip}
                                onChange={formik.handleChange}
                                className='default-input'
                                type='number'
                                placeholder='Code Postal' />
                            <input
                                id='location.city'
                                name='location.city'
                                value={formik.values.location.city}
                                onChange={formik.handleChange}
                                className='default-input'
                                type='text'
                                placeholder='Ville' />
                        </div>
                    </div>
                    <div className='w-100 d-flex flex-column'>
                        <label className='small-text bold mb-2 cursor-pointer' htmlFor='phoneNumber'> Numéro de téléphone</label>
                        <input
                            id='phoneNumber'
                            name='phoneNumber'
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            className='default-input'
                            type='text'
                            placeholder='' />
                    </div>
                    <div className='w-100 d-flex flex-column'>
                        <label className='small-text bold mb-2 cursor-pointer' htmlFor='email'> Email</label>
                        <input
                            id='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className='default-input'
                            type='text'
                            disabled
                            placeholder='' />
                    </div>
                    <div className='w-100 d-flex flex-column'>
                        <label className='small-text bold mb-2 cursor-pointer' htmlFor='bio'> Description</label>
                        <textarea
                            id='bio'
                            name='bio'
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                            className='default-input text-area'
                            type='text'
                            placeholder='' />
                    </div>
                    <div className='mx-auto my-4'>
                        <button type='submit' className='default-btn'>Sauvegarder</button>
                    </div>
                </>}
            </form>
        </div>
    </div>
}


export default Profil