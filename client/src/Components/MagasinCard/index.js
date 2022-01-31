import React from 'react'
import style from './style.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const MagasinCard = ({ magasin, onDelete }) => {
    return <div className='w-100 card d-flex flex-row p-4 justify-content-between'>
        <div className='d-flex flex-row gap-3'>
            <div className={`${style['img-container']}`}>
                <img src={magasin.shopURL} alt="magasin img" />
            </div>
            <div className='d-flex flex-column gap-3'>
                <div className='wow-subtitle bold'>{magasin.name}</div>
                <div className='wow-body'><b>Type:</b> {magasin.type}</div>
                <div className='w-100 small-text' target='_blank' rel='noreferrer'>
                    {magasin.description}
                </div>
            </div>
        </div>
        <div className='d-flex flex-row gap-3 justify-content-end align-items-end'>
            <Link to={`/magasin/${magasin._id}`}>
                <button className='default-btn'>Voir plus</button>
            </Link>
            <div>
                <button className='default-btn danger-btn' onClick={onDelete}>Supprimer</button>
            </div>
        </div>
    </div>
}

export default MagasinCard