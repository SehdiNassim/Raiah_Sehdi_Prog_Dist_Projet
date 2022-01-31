import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import style from './style.module.css'
import CustomCheckbox from './../../Components/CustomCheckbox/index';
import { useEffect } from 'react';
import Loader from './../../Components/Loader/index';
import ProductCard from '../../Components/ProductCard';
import { getProducts } from './../../Services/Produit';
import { getTypes } from '../../Services/Magasin';
import Pagination from './../../Components/Pagination/index';


const Accueil = () => {
    const [page, setPage] = useState(1)
    const [nbPages, setNbPages] = useState(1)

    const [loading, setLoading] = useState(false)
    const [max, setMax] = useState()
    const [min, setMin] = useState()


    const [products, setProducts] = useState([])
    const [types, setTypes] = useState({})
    const [typesFilters, setTypesFilters] = useState([])

    useEffect(() => {
        getTypes().then(res => {
            setTypes(res.data.shopType)
        })
    }, [])
    useEffect(() => {
        setLoading(true)
        getProducts({ p: page - 1, shopTypes: [...typesFilters], maxPrice: max, minPrice: min }).then(res => {
            console.log(res);
            setProducts(res.data.products)
            setNbPages(res.data.nbPages)
            setLoading(false)
        })
    }, [page, typesFilters])
    const applyFilters = e => {
        setPage(1)
        setLoading(true)
        getProducts({ p: 0, shopTypes: [...typesFilters], maxPrice: max , minPrice: min}).then(res => {
            console.log(res);
            setProducts(res.data.products)
            setNbPages(res.data.nbPages)
            setLoading(false)
        })
    }
    return <div className='container py-4 px-5'>
        <div className='row px-4 mb-4'>
            <div className='col-12 d-flex flex-row justify-content-between'>
                <div className='header-4'>Toutes les produits</div>
            </div>
        </div>
        <div className='row gap-3'>
            <div className='col-4'>
                <div className='card p-5 d-flex flex-column gap-4'>
                    <div className='subtitle bold'>Type magasin</div>
                    {
                        Object.keys(types).map((s, i) => {
                            return <CustomCheckbox key={i} label={types[s]} name={s} onChange={e => {
                                setPage(1)
                                setTypesFilters(e.target.checked ? [...typesFilters, s] : typesFilters.filter(f => f !== s))
                            }} />
                        })
                    }
                    <div className='subtitle bold'>Prix</div>
                    <div className='w-100 d-flex flex-row gap-4'>
                        <div className='w-100 d-flex flex-column gap-2'>
                            <label className='small-text' for="min">Min</label>
                            <input
                                id='min'
                                value={min}
                                onChange={e => setMin(e.target.value)}
                                className='default-input'
                                type="number"
                                placeholder='min' />
                        </div>
                        <div className='w-100  d-flex flex-column gap-2'>
                            <label className='small-text' for="max">Max</label>
                            <input
                                id='max'
                                value={max}
                                onChange={e => setMax(e.target.value)}
                                className='default-input'
                                type="number"
                                placeholder='max' />
                        </div>
                    </div>
                    <div>
                        <button className='default-btn' onClick={applyFilters}>Appliquer</button>
                    </div>
                </div>
            </div>
            <div className='col d-flex flex-column gap-3 align-items-center'>
                {
                    loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                        <Loader />
                    </div>
                        : products.length ? <>
                            {products.map((p, i) => {
                                return <ProductCard product={p} key={i} />
                            })}
                            <div className='mt-5'>
                                <Pagination currentPage={page} nbPages={nbPages} setPage={setPage} />
                            </div>
                        </> : <div className='w-100 card p-5 d-flex flex-row justify-content-center small-text'>
                            Aucune produit
                        </div>
                }
            </div>
        </div>
    </div>
}

export default Accueil