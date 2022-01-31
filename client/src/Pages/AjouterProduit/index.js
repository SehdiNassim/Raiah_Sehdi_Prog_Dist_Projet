import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import style from './style.module.css'
// import { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { addProduct } from './../../Services/Produit';
import toast from './../../Helpers/toast';


const AjouterProduit = () => {
    const match = useRouteMatch()
    const history = useHistory()
    const [produitURL, setUrl] = useState(null)
    const produitURLRef = useRef(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            bio: '',
            price: '',
            quantity: ''
        },
        onSubmit: values => {
            if (produitURL) {
                const formData = new FormData()
                Object.keys(values).forEach((field) => {
                    formData.append(field, values[field])
                })
                formData.append("idShop", match.params.id)
                formData.append('PRODUCT', produitURL)
                addProduct(formData).then(res => {
                    toast('success', 'Produit ajouté avec succés')
                    history.push(`/magasin/${match.params.id}`)
                })
            } else toast('error', 'Veuillez ajouter une image du produit')
        }
    })

    // useEffect(() => {
    // }, [])
    return <form className='container py-4 px-5' onSubmit={formik.handleSubmit}>
        <div className='row px-4 mb-4'>
            <div className='col-12 d-flex flex-row justify-content-between'>
                <div className='header-4'>Ajouter un produit</div>
                <div>
                    <button className='default-btn'>Sauvegarder et partager</button>
                </div>
            </div>
        </div>
        <div className='row card px-4 py-4 gap-4'>
            <input type='file' ref={produitURLRef} hidden onChange={e => setUrl(e.target.files[0])} />
            <div className='col-12 d-flex flex-row align-items-start gap-4'>
                <div className={style['magasin-img-container']}>
                    {
                        produitURL ? <img src={URL.createObjectURL(produitURL)} alt='ishop logo' />
                            : <div className='small-text'>Aucune photo</div>
                    }
                </div>
                <div className='d-flex flex-column gap-3'>
                    <div>
                        <button className='default-btn blue-btn w-auto' type='button' onClick={e => produitURLRef.current.click()}>
                            Télécharger une image
                            <FiUpload className='mx-2' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-12 d-flex flex-row gap-4'>
                <div className='w-100 d-flex flex-column gap-2'>
                    <label className='small-text bold cursor-pointer' htmlFor='name'>Nom du produit</label>
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
                <div className='w-100 d-flex flex-column gap-2'>
                    <label className='small-text bold cursor-pointer' htmlFor='price'>Prix</label>
                    <input
                        id='price'
                        name='price'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        className='default-input'
                        type="number"
                        required
                    />
                </div>
                <div className='w-100 d-flex flex-column gap-2'>
                    <label className='small-text bold cursor-pointer' htmlFor='quantity'>Quantité en stock</label>
                    <input
                        id='quantity'
                        name='quantity'
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        className='default-input'
                        type="number"
                        required
                    />
                </div>
            </div>
            <div className='col-12 d-flex flex-column gap-2'>
                <label className='small-text bold cursor-pointer' htmlFor='bio'>Description</label>
                <textarea
                    id='bio'
                    name='bio'
                    value={formik.values.bio}
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

export default AjouterProduit