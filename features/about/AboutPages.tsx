import React from 'react'
import Revenue from './components/Revenue/Revenue'
import SelectionMission from './components/producer/SelectionMission'
import SelectionStory from './components/producer/SelectionStory'
import FeatureSection from './components/Revenue/components/FeatureSection'
import SelectionValues from './components/producer/SelectionValues'
import SelectionTarget from './components/producer/SelectionTarget'
import Stats from './components/Revenue/components/Stats'
export default function aboutPages() {
    return (
        <>
            <SelectionMission />
            <Stats />
            <FeatureSection />
            <SelectionValues />
            <SelectionTarget />
            <SelectionStory />
            <Revenue />

        </>
    )
}
