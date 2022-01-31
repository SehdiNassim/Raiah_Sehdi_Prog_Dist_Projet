import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './../../Components/Loader/index';
import CartCard from './../../Components/CartCard/index';
import { CommandCart, GetCart } from '../../Services/Panier';
import { DeleteFromCart } from './../../Services/Panier';
import toast from './../../Helpers/toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Panier = () => {
    const history= useHistory()

    const [loading, setLoading] = useState(false)

    const [products, setProducts] = useState([])

    useEffect(() => {
        setLoading(true)
        GetCart().then(res => {
            console.log(res);
            setProducts([...res.data.cart])
            setLoading(false)
        }).catch(e => setLoading(false))
    }, [])
    return <div className='container py-4 px-5'>
        <div className='row px-4 mb-4'>
            <div className='col-12 d-flex flex-row justify-content-between'>
                <div className='header-4'>Mon panier</div>
                <Link to='/'>
                    <button className='default-btn'>Ajouter des produits</button>
                </Link>
            </div>
        </div>
        <div className='row px-4'>
            <div className='col-12 d-flex flex-column gap-3 align-items-center'>
                {
                    loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                        <Loader />
                    </div>
                        : products.length ? <>
                            <div className='wow-subtitle align-self-end'><b>Prix total:</b> {products.reduce((prev, cur) => prev + cur.idProduct.price * cur.quantity, 0)}€</div>
                            {products.map((p, i) => {
                                return <CartCard
                                    product={{ ...p.idProduct, quantity: p.quantity }} key={i}
                                    onDelete={e => {
                                        DeleteFromCart(p.idProduct._id).then(res => {
                                            toast('success', 'Le produit a été retiré du panier')
                                            setProducts(products.filter(product => p.idProduct._id !== product.idProduct._id))
                                        })
                                    }} />
                            })}
                            <div>
                                <button className='default-btn' disabled={products.length < 1} onClick={e=>{
                                    CommandCart().then(res=>{
                                        toast('success','Commande passé avec succés')
                                        history.push('/mes-commandes')
                                    })
                                }}>Commander</button>
                            </div>
                        </> : <div className='w-100 card p-5 d-flex flex-row justify-content-center small-text'>
                            Aucun produit
                        </div>
                }
            </div>
        </div>
    </div>
}

export default Panier