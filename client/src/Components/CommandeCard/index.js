import React from 'react'


const CommandeCard = ({ commande }) => {
    return <div className='col-5 card d-flex flex-column gap-3 p-4 mx-2'>
        <div className='header-4 green-text'>Commande du {commande.createdAt.split('T')[0]}</div>
        <div className='wow-subtitle'><b>Total:</b> {commande.amount}€</div>
        <ul className='w-100 d-flex flex-column gap-1'>
            {commande.products.map((p, i) => {
                return <li key={i}>{p.idProduct.name} <b>x {p.quantity}</b></li>
            })}
        </ul>
        <div className='wow-subtitle'><b>Statut:</b> En attente </div>
    </div>
}

export default CommandeCard