import { PassengerName, Journey } from '.'

export interface Booking {
    //FlightDate: Date;
    //ArrivalStationCode: string;
    //DepartureStationCode: string;
    RecordLocator: string;
    BookingID: number;
    BookingStatus: string;
    //FlightNumber: string;
    //Name: Name;

    ReferenceNo: string;
    HoldDateTime: Date;
    BookingDate: Date;
    PassengerNames: PassengerName[];
    Journeys: Journey[];
}