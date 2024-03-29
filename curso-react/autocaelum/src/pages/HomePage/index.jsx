import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
/* components */
import MasterLayout from '../../components/MasterLayout';
import ListaVeiculos from '../../components/ListaVeiculos';
/* assets */
import '../../assets/css/grid-principal.css';
import img1 from '../../assets/images/home-imagem-1.jpg';
import img2 from '../../assets/images/home-imagem-2.jpg';
import img3 from '../../assets/images/home-imagem-3.jpg';

export default function HomePage() {
    return (
        <>
            <Helmet><title>Bem Vindo a AutoCaelum!</title></Helmet>
            <MasterLayout>
                <main className="container">
                    
                    <section className="container grid-principal">
                        <figure>
                            <img src={img1} alt="Foto da Concessionária" />
                            <figcaption>
                                Conheça a AutoCaelum <br/>
                                <Link to="/sobre">
                                    Saiba mais <i className="fas fa-long-arrow-alt-right"></i>
                                </Link>
                            </figcaption>
                        </figure>

                        <img src={img2} alt="Foto do pátio da Concessionária 2" />

                        <p className="texto-1">
                            Condições especiais de Financiamento
                        </p>

                        <p className="texto-2">
                            Trabalhamos com todas as marcas
                        </p>

                        <img src={img3} alt="Foto do pátio da Concessionária 3" />
                    </section>

                    <section className="container lista-veiculos">
                        <h2>Veículos</h2>
                        <ListaVeiculos qtd="4"/>
                    </section>

                </main>
            </MasterLayout>
        </>
    )
}
