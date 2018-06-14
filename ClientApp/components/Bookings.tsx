import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import * as chartist from 'chartist';


const Chartist: any = require('react-chartist');

import { Segment } from 'ClientApp/@models';
import { ApplicationState } from 'ClientApp/app';

import { BookingsState } from '../store/bookings/state';
import { actionCreators } from '../store/bookings/action-creators';

// At runtime, Redux will merge together...
type BookingsProps = BookingsState        // ... state we've requested from the Redux store
    & typeof actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Bookings extends React.Component<BookingsProps, {}> {
    componentDidMount() {
        const { GetBookings } = this.props
        GetBookings()
    }

    public render() {
        const { Bookings, TransactionData } = this.props
        const { Domestic, International, CombinedCost } = TransactionData
        //if (!TransactionData) return null;

        const options = {
            low: 0,
            showArea: true
        };

        return (
            <div className="container">
                <div id="booking-container">
                    <div className="header">
                        <h2>
                            Booking Dashboard
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6 figure">
                            <p>Cost of your Flights per month (International)</p>
                            {
                                International.CostOfFlights &&
                                <Chartist.default data={International.CostOfFlights} options={{
                                    distributeSeries: true,
                                    seriesBarDistance: 10
                                }} type={'Bar'} />
                            }
                        </div>
                        <div className="col-md-6 figure">
                            <p>Cost of your Flights per month (Domestic)</p>
                            {
                                Domestic.CostOfFlights &&
                                <Chartist.default data={Domestic.CostOfFlights} options={{
                                    distributeSeries: true,
                                    seriesBarDistance: 10
                                }} type={'Bar'} />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 figure">
                            <p>Number of your Flights per day (International)</p>
                            {
                                International.NoOfFlights &&
                                <Chartist.default data={International.NoOfFlights} options={options} type={'Line'} />
                            }
                        </div>
                        <div className="col-md-6 figure">
                            <p>Number of your Flights per day (Domestic)</p>
                            {
                                Domestic.NoOfFlights &&
                                <Chartist.default data={Domestic.NoOfFlights} options={options} type={'Line'} />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 figure">
                            {
                                International.CostOfFlights &&
                                <Chartist.default data={{ series: International.CostOfFlights.series }} options={{
                                    labelInterpolationFnc: function (value: any, index: any) {
                                        return International.CostOfFlights.labels[index] + ' ' + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' (' + Math.round(value / International.CostOfFlights.series.reduce((a: number, b: number) => a + b) * 100) + '%)';
                                    }
                                }} type={'Pie'} />
                            }
                        </div>
                        <div className="col-md-6 figure">
                            <p>Combined Travel Spendings</p>
                            {
                                CombinedCost &&
                                <Chartist.default data={CombinedCost} options={options} type={'Line'} />
                            }
                        </div>
                        <div className="col-md-4 figure">
                            {
                                Domestic.CostOfFlights &&
                                <Chartist.default data={{ series: Domestic.CostOfFlights.series }} options={{
                                    labelInterpolationFnc: function (value: any, index: any) {
                                        return Domestic.CostOfFlights.labels[index] + ' ' + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' (' + Math.round(value / Domestic.CostOfFlights.series.reduce((a: number, b: number) => a + b) * 100) + '%)';
                                    }
                                }} type={'Pie'} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.Bookings, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(Bookings) as typeof Bookings;