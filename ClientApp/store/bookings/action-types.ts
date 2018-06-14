import { Booking } from 'ClientApp/@models'

export interface UpdateComponent {
    type: 'UPDATE_COMPONENT'
}

export interface GetBookings {
    type: 'GET_BOOKINGS';
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

