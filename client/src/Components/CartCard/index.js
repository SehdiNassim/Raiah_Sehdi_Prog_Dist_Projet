import React, { useState } from 'react'
import style from './style.module.css'
import { FiShoppingBag } from 'react-icons/fi';
import Popup from './../Popup/index';


const CartCard = ({ product, onDelete }) => {
    return <div className='w-100 card d-flex flex-row p-4 justify-content-between align-items-end'>
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
                <div className='small-text'><b>Quantité:</b> {product.quantity}</div>
                <div className='small-text'><b>Bio:</b> {product.bio}</div>
            </div>
        </div>
        <div>
            <button className='default-btn danger-btn' onClick={onDelete}>Supprimer du panier</button>
        </div>
    </div>
}

export default CartCard