import { Charge } from '.'

export interface PaxFare {
    Count: number;
    FareDiscountCode: string;
    Charges: Charge[];
    PaxType: string;
    PaxDiscountCode: string;
    FareDiscount: FareDiscount;
}


export interface FareDiscount {
    DiscountAmount: number;
    DiscountName: string;
    DiscountedAmount: number;
    OriginalAmount: number;
}