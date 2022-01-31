import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { getProductsOfShop } from '../../Services/Produit';
import ProductItem from '../../Components/Magasin/ProductItem';
import Loader from './../../Components/Loader/index';
import { deleteProduct } from './../../Services/Produit';
import toast from './../../Helpers/toast';


const Magasin = () => {
    const match = useRouteMatch()

    const [loading, setLoading] = useState(false)

    const [magasin, setMagasin] = useState()
    const [products, setProducts] = useState([])

    useEffect(() => {
        setLoading(true)
        getProductsOfShop(match.params.id).then(res => {
            setMagasin(res.data.shop)
            setProducts(res.data.products)
            setLoading(false)
        })
    }, [match])
    return <div className='container py-4 px-5'>
        {
            loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                <Loader />
            </div>
                : <>
                    <div className='row d-flex flex-column gap-5 align-items-center'>
                        {
                            magasin && <>
                                <div className='col-12 card d-flex flex-row p-4'>
                                    <div className='w-75 d-flex flex-row align-items-center gap-4'>
                                        <div className={style['img-container']}>
                                            <img src={magasin.shopURL} alt='entreprise logo' />
                                        </div>
                                        <div className='d-flex flex-column gap-2'>
                                            <div className='wow-subtitle bold'>{magasin.name}</div>
                                            <div className={`wow-body`}>{magasin.typeValue}</div>
                                            <div className='d-flex flex-row gap-3 align-items-center'>
                                                <div className='small-text'>{magasin.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-25 d-flex flex-column justify-content-between gap-3'>
                                        <Link to={`/magasin/${match.params.id}/ajouter-produit`}>
                                            <button className='default-btn'>Ajouter un produit</button>
                                        </Link>
                                        <Link to={`/magasin/${match.params.id}/modifier`}>
                                            <button className='default-btn primary-btn'>Modifier</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        }
                        <div className='col-10 header-4'>Les produits</div>
                        <div className='col-12 d-flex flex-column gap-3'>
                            {
                                products.length > 0 ? products.map((p, i) => {
                                    return <ProductItem product={p}
                                        onDelete={e => {
                                            deleteProduct(p._id).then(e => {
                                                setProducts(products.filter(pr => p._id !== pr._id))
                                                toast('success','Produit supprimé avec succés')
                                            })
                                        }}
                                        key={i} />
                                }) : <div className='w-100 card p-5 d-flex flex-row justify-content-center small-text'>
                                    Aucun produit
                                </div>
                            }
                        </div>
                    </div>
                </>
        }
    </div>
}

export default Magasin