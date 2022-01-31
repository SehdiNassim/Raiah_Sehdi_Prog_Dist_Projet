import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import style from './style.module.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { addShop, getTypes } from './../../Services/Magasin';
import toast from './../../Helpers/toast';


const AjouterMagasin = () => {
    const history = useHistory()
    const [magasinURL, setUrl] = useState(null)
    const magasinURLRef = useRef(null)

    const [types, setTypes] = useState({});
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            description: '',
            type: Object.keys(types) ? Object.keys(types)[0] : '',
        },
        onSubmit: values => {
            if (magasinURL) {
                var formData = new FormData()
                var state = { ...values }
                Object.keys(state).forEach((field) => {
                    formData.append(field, state[field])
                })
                formData.append('SHOP', magasinURL)
                addShop(formData).then(res => {
                    toast('success', 'Magasin ajouté avec succés')
                    history.push('/mes-magasins')
                })
            }
            else toast('error', 'Veuillez télécharger une image pour le magasin')
        }
    })

    useEffect(() => {
        getTypes().then(res => {
            setTypes(res.data.shopType)
        })
    }, [])
    return <form className='container py-4 px-5' onSubmit={formik.handleSubmit}>
        <div className='row px-4 mb-4'>
            <div className='col-12 d-flex flex-row justify-content-between'>
                <div className='header-4'>Ajouter un magasin</div>
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
                    <button type='submit' className='default-btn'>Sauvegarder</button>
                </div>
            </div>
        </div>
    </form>
}

export default AjouterMagasin