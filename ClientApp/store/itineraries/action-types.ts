import { Booking } from 'ClientApp/@models'

export interface UpdateComponent {
    type: 'UPDATE_COMPONENT'
}

export interface GetItineraries {
    type: 'GET_ITINERARIES';
    Itineraries: Array<Booking>;
}

