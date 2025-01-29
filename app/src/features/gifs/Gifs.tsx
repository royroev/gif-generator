import React from 'react'

import { useSelector } from 'react-redux'

import styles from './Gifs.module.css'
import CategorySelector from './components/CategorySelector'
import GifDisplay from './components/GifDisplay'
import { RootState } from '../../store'

const Gifs: React.FC = () => {
    const selectedCategory = useSelector((state: RootState) => state.gifs.selectedCategory)

    return <div className={styles.container}>{!selectedCategory ? <CategorySelector /> : <GifDisplay />}</div>
}

export default Gifs
