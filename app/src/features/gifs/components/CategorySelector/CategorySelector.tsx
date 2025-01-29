import React, { useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'

import styles from './CategorySelector.module.css'
import Loader from '../../../../components/Loader/Loader'
import { AppDispatch, RootState } from '../../../../store'
import { setSelectedCategory } from '../../slices/gifsSlice'
import { fetchCategories } from '../../thunks'
import { Category, Status } from '../../types'

const CategorySelector: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const selectedCategory = useSelector((state: RootState) => state.gifs.selectedCategory)
    const categories = useSelector((state: RootState) => state.gifs.categories)
    const totalCategories = useSelector((state: RootState) => state.gifs.totalCategories)
    const categoriesStatus = useSelector((state: RootState) => state.gifs.categoriesStatus)
    const categoriesError = useSelector((state: RootState) => state.gifs.categoriesError)

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const categoriesPerPage = 3

    const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

    useEffect(() => {
        dispatch(
            fetchCategories({
                limit: categoriesPerPage,
                offset: (currentPage - 1) * categoriesPerPage,
                searchTerm: debouncedSearchTerm,
            }),
        )
    }, [dispatch, categoriesPerPage, currentPage, debouncedSearchTerm])

    const totalPages = Math.ceil(totalCategories / categoriesPerPage)

    const handleCategorySelect = useCallback(
        (category: Category) => {
            dispatch(setSelectedCategory(category))
        },
        [dispatch],
    )

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }, [])

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)
    }, [])

    if (categoriesStatus === Status.FAILED) {
        return <p>Error loading categories: {categoriesError}</p>
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Choose your favorite animal</h2>
            <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
                aria-label="Search Categories"
            />
            {categoriesStatus === Status.LOADING ? (
                <Loader />
            ) : (
                <ul className={styles.categoryList}>
                    {categories.map((category: Category) => (
                        <li key={category.id} className={styles.categoryItem}>
                            <button
                                onClick={() => handleCategorySelect(category)}
                                className={
                                    selectedCategory?.id === category.id
                                        ? `${styles.categoryButton} ${styles.categoryButtonSelected}`
                                        : styles.categoryButton
                                }
                                aria-pressed={selectedCategory?.id === category.id}
                            >
                                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={styles.paginationButton}
                >
                    Next
                </button>
            </div>

            {categoriesStatus === Status.LOADING && currentPage > 1 && <p>Loading more categories...</p>}
        </div>
    )
}

export default CategorySelector
