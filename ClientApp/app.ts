import * as Bookings from './store/bookings'
import * as Itineraries from './store/itineraries'

export interface ApplicationState {
    Bookings: Bookings.BookingsState,
    Itineraries: Itineraries.ItinerariesState
}

export const reducers = {
    Bookings: Bookings.reducer,
    Itineraries: Itineraries.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}