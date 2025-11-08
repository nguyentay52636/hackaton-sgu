import React from 'react'
import HeroCarousel from './components/HeroCarousel/HeroCarousel'
import Revenue from '../about/components/Revenue/Revenue'
import Weather from './components/Weather/Weather'
import FavoriteFoots from './components/FavoriteFoots/FavoriteFoots'
export default function HomPages() {
    return (
        <>
            <HeroCarousel />
            <Weather />
            <FavoriteFoots />


        </>
    )
}
