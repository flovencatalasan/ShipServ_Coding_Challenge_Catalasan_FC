import { Segment, Fare, FlightStation, Ssr } from '.'

export interface Journey {
    JourneyFareSum: number;
    CurrencyCode: string;
    FlightLength: string;
    FlightType: string;
    JourneySellKey: string;
    ArrivalStation: FlightStation;
    DepartureStation: FlightStation;
    Fares: Fare[];
    Segments: Segment[];
    SelectedAddons: Ssr[];
}