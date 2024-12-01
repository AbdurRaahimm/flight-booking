import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <>
            <Navbar />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
