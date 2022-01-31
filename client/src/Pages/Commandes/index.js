import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from './../../Components/Loader/index';
import CommandeCard from './../../Components/CommandeCard/index';
import { GetCommandes } from '../../Services/Commande';


const Commandes = () => {


    const [loading, setLoading] = useState(false)

    const [commandes, setCommandes] = useState([])

    useEffect(() => {
        setLoading(true)
        GetCommandes().then(res => {
            console.log(res);
            setCommandes(res.data.order)
            setLoading(false)
        }).catch(e => setLoading(false))
    }, [])
    return <div className='container py-4 px-5'>
        <div className='row px-4 mb-4'>
            <div className='col-12 d-flex flex-row justify-content-between'>
                <div className='header-4'>Toutes mes commandes</div>
            </div>
        </div>
        <div className='row px-4 justify-content-between gap-3'>
            {
                loading ? <div className='w-100 position-relative card' style={{ height: "300px" }}>
                    <Loader />
                </div>
                    : commandes.length ? <>
                        {commandes.map((commande, i) => {
                            return <CommandeCard commande={commande} key={i} />
                        })}
                    </> : <div className='w-100 card p-5 d-flex flex-row justify-content-center small-text'>
                        Aucune commande
                    </div>
            }
        </div>
    </div>
}

export default Commandes