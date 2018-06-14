import { Booking } from 'ClientApp/@models'
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ItinerariesState {
    IsLoading: boolean;
    Itineraries: Array<Booking>;
}

export const InitialItinerariesState: ItinerariesState = {
    IsLoading: false,
    Itineraries: []
}