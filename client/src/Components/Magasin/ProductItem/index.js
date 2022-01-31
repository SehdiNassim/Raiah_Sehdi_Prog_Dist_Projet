import React from 'react'
import style from './style.module.css'
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';


const ProductItem = ({ product, onDelete }) => {
    const match = useRouteMatch()
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
                <div className='wow-body'><b>Prix:</b>{product.price}€</div>
                <div className='wow-body'><b>Quantité:</b>{product.quantity}</div>
                <div className='small-text'>{product.bio}</div>
            </div>
        </div>
        <div className='d-flex flex-column gap-3'>
            <div>
                <button className='default-btn danger-btn' onClick={onDelete}>Supprimer</button>
            </div>
            <Link to={`/magasin/${match.params.id}/produit/modifier/${product._id}`}>
                <button className='default-btn primary-btn'>Modifier</button>
            </Link>
        </div>
    </div>
}

export default ProductItem