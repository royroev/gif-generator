import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import styles from './GifDisplay.module.css'
import Loader from '../../../../components/Loader/Loader'
import { RootState, AppDispatch } from '../../../../store'
import { clearSelectedCategory } from '../../slices/gifsSlice'
import { fetchRandomGifByCategory } from '../../thunks'
import { Status } from '../../types'

const GifDisplay: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const selectedCategory = useSelector((state: RootState) => state.gifs.selectedCategory)
    const randomGif = useSelector((state: RootState) => state.gifs.randomGif)
    const gifStatus = useSelector((state: RootState) => state.gifs.gifStatus)
    const gifError = useSelector((state: RootState) => state.gifs.gifError)

    const fetchRandomGif = () => {
        if (selectedCategory) {
            dispatch(fetchRandomGifByCategory({ categoryId: selectedCategory.id }))
        }
    }

    useEffect(() => {
        if (selectedCategory) {
            fetchRandomGif()
        }
    }, [selectedCategory?.id])

    const handleChooseAnotherCategory = () => {
        dispatch(clearSelectedCategory())
    }

    if (!selectedCategory) {
        return <p>Please select a category to view GIFs.</p>
    }
    if (gifStatus === Status.LOADING) {
        return <Loader />
    }
    if (gifStatus === Status.FAILED) {
        return <p>Error loading GIF: {gifError}</p>
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                {selectedCategory.name.charAt(0).toUpperCase() + selectedCategory.name.slice(1)} GIF
            </h2>
            {randomGif ? (
                <img src={randomGif.url} alt={`${selectedCategory.name} GIF`} className={styles.gifImage} />
            ) : (
                <p>No GIFs available for this category.</p>
            )}
            <div className={styles.buttonGroup}>
                <button onClick={fetchRandomGif} className={styles.primaryButton}>
                    'Give me a random Gif'
                </button>
                <button onClick={handleChooseAnotherCategory} className={styles.secondaryButton}>
                    Choose another category
                </button>
            </div>
        </div>
    )
}

export default GifDisplay
