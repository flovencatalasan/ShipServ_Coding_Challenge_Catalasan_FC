import { Booking } from 'ClientApp/@models'
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BookingsState {
    IsLoading: boolean;
    Bookings: Array<Booking>;
    TransactionData: {
        Domestic: {
            NoOfFlights: any;
            CostOfFlights: any;
        },
        International: {
            NoOfFlights: any;
            CostOfFlights: any;
        },
        CombinedCost: any;
    }
}

export const InitialBookingsState : BookingsState = {
    IsLoading: false,
    Bookings: [],
    TransactionData: {
        Domestic: {
            NoOfFlights: null,
            CostOfFlights: null,
        },
        International: {
            NoOfFlights: null,
            CostOfFlights: null,
        },
        CombinedCost: null
    }
}