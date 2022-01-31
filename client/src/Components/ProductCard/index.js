import React, { useState } from 'react'
import style from './style.module.css'
import { FiShoppingBag } from 'react-icons/fi';
import Popup from './../Popup/index';
import { AddToCart } from './../../Services/Panier';
import toast from './../../Helpers/toast';


const ProductCard = ({ product }) => {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(1);
    return <div className='w-100 card d-flex flex-colunm p-4'>
        {open && <Popup size='sm' show={open} onClose={e => setOpen(false)}>
            <div className='row p-4 gap-4 justify-content-center'>
                <div className='col-12 d-flex flex-column gap-2'>
                    <label className='small-text bold cursor-pointer' htmlFor='count'>Quantité</label>
                    <input
                        id='count'
                        name='count'
                        value={count}
                        onChange={e => setCount(e.target.value)}
                        className='default-input'
                        type="number"
                        min={1}
                        required
                    />
                </div>
                <div className='col-auto'>
                    <button className='default-btn' onClick={e => AddToCart({ idProduct: product._id, quantity: count }).then(res => {
                        setOpen(false)
                        toast('success', 'Le produit a été ajouté au panier')
                        setCount(1)
                    })
                        .catch(e => {
                            if (e.response) toast('error', e.response.data.message)
                        })
                    }>Ajouter au panier</button>
                </div>
            </div>
        </Popup>}
        <div className='d-flex flex-row gap-2'>
            <div className={`${style['img-container']}`}>
                {
                    product.productURL ? <img src={product.productURL} alt="product img" />
                        : <FiShoppingBag className='header-1' />
                }
            </div>
            <div className='d-flex flex-column gap-2'>
                <div className='wow-subtitle bold'>{product.name}</div>
                <div className='wow-body'><b>Prix:</b> {product.price}€</div>
                <div className='small-text'>{product.bio}</div>
            </div>
        </div>
        <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
            <div className='d-flex flex-row gap-4'>
                <div className='small-text'><b>Magasin:</b> {product.shop.name}</div>
                <div className='small-text'><b>Type:</b> {product.shop.type}</div>
            </div>
            <div>
                <button className='default-btn' onClick={e => setOpen(true)}>Ajouter au panier</button>
            </div>
        </div>
    </div>
}

export default ProductCard