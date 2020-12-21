import {Photo} from 'src/app/model/photo';

export interface Photos {
    photos: Photo[],
    total: number,
    total_pages: number
}