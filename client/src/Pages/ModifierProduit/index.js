import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import style from './style.module.css'
// import { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { editProduct, getProduct } from './../../Services/Produit';
import toast from './../../Helpers/toast';
import Loader from './../../Components/Loader/index';


const ModifierProduit = () => {
    const match = useRouteMatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [produitURL, setUrl] = useState(null)
    const produitURLRef = useRef(null)

    const [produit, setProduit] = useState(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            bio: '',
            price: '',
            quantity: '',
            ...produit
        },
        onSubmit: values => {
            const formData = new FormData()
            const state = { ...values }
            delete state.productURL
            Object.keys(state).forEach((field) => {
                formData.append(field, state[field])
            })
            if (produitURL) formData.append('PRODUCT', produitURL)
            editProduct(match.params.idProduct, formData).then(res => {
                toast('success', 'Produit modifié avec succés')
                history.push(`/magasin/${match.params.id}`)
            })
        }
    })

    useEffect(() => {
        setLoading(true)
        getProduct(match.params.idProduct).then(res => {
            const { name, bio, price, quantity, productURL } = res.data.product
            setProduit({ name, bio, price, quantity, productURL })
            setLoading(false)
        })
    }, [match])
    return <form className='container py-4 px-5' onSubmit={formik.handleSubmit}>
        {
            loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                <Loader />
            </div> : <>
                <div className='row px-4 mb-4'>
                    <div className='col-12 d-flex flex-row justify-content-between'>
                        <div className='header-4'>Modifier un produit</div>
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
                                    : produit ? <img src={produit.productURL} alt='ishop logo' />
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
                            <button type='submit' className='default-btn'>Sauvegarder les modifications</button>
                        </div>
                    </div>
                </div>
            </>
        }
    </form>
}

export default ModifierProduit