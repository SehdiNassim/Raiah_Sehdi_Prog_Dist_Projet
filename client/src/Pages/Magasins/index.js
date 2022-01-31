import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MagasinCard from '../../Components/MagasinCard';
import Loader from './../../Components/Loader/index';
import { deleteShop, getShops } from './../../Services/Magasin';
import toast from './../../Helpers/toast';


const Magasins = () => {


    const [loading, setLoading] = useState(false)

    const [magasins, setMagasins] = useState([])

    useEffect(() => {
        setLoading(true)
        getShops().then(res => {
            setMagasins(res.data.shops)
            setLoading(false)
        }).catch(e => setLoading(false))
    }, [])
    return <div className='container py-4 px-5'>
        <div className='row px-4 mb-4'>
            <div className='col-12 d-flex flex-row justify-content-between'>
                <div className='header-4'>Tous les magasins</div>
                <Link to='/ajouter-magasin'>
                    <button className='default-btn'>Ajouter un magasin</button>
                </Link>
            </div>
        </div>
        <div className='row px-4'>
            <div className='col-12 d-flex flex-column gap-3 align-items-center'>
                {
                    loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                        <Loader />
                    </div>
                        : magasins.length ? <>
                            {magasins.map((mgs, i) => {
                                return <MagasinCard
                                    magasin={mgs}
                                    key={i}
                                    onDelete={e => {
                                        deleteShop({ id: mgs._id }).then(res => {
                                            toast('error', 'Magasin supprimé avec succés')
                                            setMagasins(magasins.filter(m => m._id !== mgs._id))
                                        })
                                    }}
                                />
                            })}
                        </> : <div className='w-100 card p-5 d-flex flex-row justify-content-center small-text'>
                            Aucun magasin
                        </div>
                }
            </div>
        </div>
    </div>
}

export default Magasins