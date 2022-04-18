
import { Link } from 'react-router-dom'
import React, { useCallback } from 'react'
// import Table from '/react-bulma-components/lib/components/table';

export default function HomePage(props) {
    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <div className="text-center box">
                                <h1 className="main-title home-page-title">Check-in success!</h1>
                                <Link to="/app">
                                    <button className="button">Back</button>

                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}