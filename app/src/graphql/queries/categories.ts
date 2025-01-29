import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
    query GetCategories($limit: Int!, $offset: Int!, $searchTerm: String!) {
        categories(where: { name: { _ilike: $searchTerm } }, limit: $limit, offset: $offset, order_by: { name: asc }) {
            id
            name
        }
        categories_aggregate(where: { name: { _ilike: $searchTerm } }) {
            aggregate {
                count
            }
        }
    }
`
