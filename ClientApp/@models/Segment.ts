import { FlightDesignator, Fare, FlightStation, PaxSsr } from '.'

export interface Segment {
    AircraftType?: string;
    Airline?: string;
    Duration?: any;
    SegmentSellKey: string;
    ArrivalStation: FlightStation;
    DepartureStation: FlightStation;
    FlightDesignator: FlightDesignator;
    IsInternational: boolean;
    STA: Date;
    STD: Date;
    UTCA: Date;
    UTCD: Date;
    Fares: Fare[];
    PaxSsrs: PaxSsr[];
}