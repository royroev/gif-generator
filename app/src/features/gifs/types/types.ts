import { GetCategoriesQuery, GetRandomGifByCategoryQuery } from '../../../graphql/autogenerate/schemas'

export type Gif = NonNullable<GetRandomGifByCategoryQuery['gifs']>[0]

export type Category = GetCategoriesQuery['categories'][0]

export enum Status {
    IDLE,
    LOADING,
    SUCCEEDED,
    FAILED,
}
