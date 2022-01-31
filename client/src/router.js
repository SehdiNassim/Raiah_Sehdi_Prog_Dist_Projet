import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Styles/Base.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './Layout'
import SignIn from './Pages/Auth/SignIn/index';
import SignUp from './Pages/Auth/SignUp/index';
import Magasins from './Pages/Magasins/index';
import AjouterMagasin from './Pages/AjouterMagasin/index';
import Magasin from './Pages/Magasin/index';
import AjouterProduit from './Pages/AjouterProduit'
import Profil from './Pages/Profil/index';
import Accueil from './Pages/Accueil/index';
import Panier from './Pages/Panier/index';
import ModifierProduit from './Pages/ModifierProduit/index';
import ModifierMagasin from './Pages/ModifierMagasin/index';
import Commandes from './Pages/Commandes/index';
import GoogleAuth from './Pages/Auth/GoogleAuth'


const Router = () => {
    return <BrowserRouter>
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Accueil />
                </Route>
                {/* Magasins */}
                <Route path='/mes-magasins' exact>
                    <Magasins />
                </Route>
                <Route path='/ajouter-magasin' exact>
                    <AjouterMagasin />
                </Route>
                <Route path='/magasin/:id' exact>
                    <Magasin />
                </Route>
                <Route path='/magasin/:id/modifier' exact>
                    <ModifierMagasin />
                </Route>
                <Route path='/magasin/:id/ajouter-produit' exact>
                    <AjouterProduit />
                </Route>
                <Route path='/magasin/:id/produit/modifier/:idProduct' exact>
                    <ModifierProduit />
                </Route>

                <Route path='/mon-panier' exact>
                    <Panier />
                </Route>

                <Route path='/mes-commandes' exact>
                    <Commandes/>
                </Route>


                <Route path='/profil' exact>
                    <Profil />
                </Route>
                {/* Auth */}
                <Route path='/auth/sign-in'>
                    <SignIn />
                </Route>
                <Route path='/auth/sign-up'>
                    <SignUp />
                </Route>
                <Route path='/auth/google/:token' exact>
                    <GoogleAuth />
                </Route>
                <Route path="/auth" render={() => <Redirect to='/auth/sign-in' />} />
            </Switch>
        </Layout>
    </BrowserRouter>
}

export default Router 