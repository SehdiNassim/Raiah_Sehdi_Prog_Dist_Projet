import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import style from './style.module.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { editShop, getShop, getTypes } from './../../Services/Magasin';
import toast from './../../Helpers/toast';
import { useRouteMatch } from 'react-router-dom';
import Loader from './../../Components/Loader/index';


const ModifierMagasin = () => {
    const match = useRouteMatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [magasinURL, setUrl] = useState(null)
    const magasinURLRef = useRef(null)

    const [shop, setShop] = useState(null);

    const [types, setTypes] = useState({});
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            description: '',
            type: '',
            ...shop
        },
        onSubmit: values => {
            var formData = new FormData()
            var state = { ...values }
            delete state.shopURL
            Object.keys(state).forEach((field) => {
                formData.append(field, state[field])
            })
            if (magasinURL) formData.append('SHOP', magasinURL)
            editShop(match.params.id, formData).then(res => {
                toast('success', 'Magasin modifié avec succés')
                history.push(`/magasin/${match.params.id}`)
            })
        }
    })

    useEffect(() => {
        setLoading(true)
        getShop(match.params.id).then(res => {
            const { name, description, typeKey, shopURL } = res.data.shop
            setShop({ name, description, type: typeKey, shopURL })
            getTypes().then(res => {
                setTypes(res.data.shopType)
                setLoading(false)
            })
        })
    }, [match.params.id])
    return <form className='container py-4 px-5' onSubmit={formik.handleSubmit}>
        {
            loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                <Loader />
            </div> :
                <>
                    <div className='row px-4 mb-4'>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <div className='header-4'>Modifier un magasin</div>
                            <div>
                                <button className='default-btn'>Sauvegarder et partager</button>
                            </div>
                        </div>
                    </div>
                    <div className='row card px-4 py-4 gap-4'>
                        <input type='file' ref={magasinURLRef} hidden onChange={e => setUrl(e.target.files[0])} />
                        <div className='col-12 d-flex flex-row align-items-start gap-4'>
                            <div className={style['magasin-img-container']}>
                                {
                                    magasinURL ? <img src={URL.createObjectURL(magasinURL)} alt='ishop logo' />
                                        : shop ? <img src={shop.shopURL} alt='ishop logo' />
                                            : <div className='small-text'>Aucune photo</div>
                                }
                            </div>
                            <div className='d-flex flex-column gap-3'>
                                <div>
                                    <button className='default-btn blue-btn w-auto' type='button' onClick={e => magasinURLRef.current.click()}>
                                        Télécharger une image
                                        <FiUpload className='mx-2' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-column gap-2'>
                            <label className='small-text bold cursor-pointer' htmlFor='name'>Nom du magasin</label>
                            <input
                                id='name'
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className='default-input'
                                type="text"
                                required
                            />
                        </div>
                        <div className='col-12 d-flex flex-column gap-2'>
                            <label className='small-text bold cursor-pointer' htmlFor='name'>Secteur du magasin</label>
                            <select
                                id='type'
                                name='type'
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                className='default-input'
                                type="text"
                                required
                            >
                                {Object.keys(types).map((t, i) => {
                                    return <option key={i} value={t}>{types[t]}</option>
                                })}
                            </select>
                        </div>
                        <div className='col-12 d-flex flex-column gap-2'>
                            <label className='small-text bold cursor-pointer' htmlFor='name'>Description</label>
                            <textarea
                                id='description'
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className='default-input'
                                type="text"
                                required
                            />
                        </div>
                        <div className='col-12 d-flex justify-content-center'>
                            <div>
                                <button type='submit' className='default-btn'>Sauvegarder les modifications</button>
                            </div>
                        </div>
                    </div>
                </>
        }
    </form>
}

export default ModifierMagasin