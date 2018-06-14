import { PaxFare, FareBundle } from '.';

export interface Fare {
    FareApplicationType: string;
    ClassOfService: string;
    CarrierCode: string;
    FareBasisCode: string;
    FareTypeCode: string;
    FareTypeName: string;
    FareBundles: FareBundle[];
    ProductClass: string;
    FareSellKey: string;
    BaseSum: number;
    BaseFare: number;
    BaseFee: number;
    BaseTax: number;
    PaxFares: PaxFare[];
}