import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import * as classNames from 'classNames';
import * as _ from 'underscore';


import { ApplicationState } from 'ClientApp/app';

import { ItinerariesState } from '../store/itineraries/state';
import { actionCreators } from '../store/itineraries/action-creators';

// At runtime, Redux will merge together...
type ItinerariesProps = ItinerariesState        // ... state we've requested from the Redux store
    & typeof actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Itineraries extends React.Component<ItinerariesProps, {}> {
    componentDidMount() {
        const { GetItineraries } = this.props
        GetItineraries()
    }

    public render() {
        const { Itineraries } = this.props

        return (
            <div id="itinerary-table-container">
                <div className="header">
                    <h2>
                        Itineraries
                    </h2>
                </div>
                <div className="content">
                    <table className="table table-hover">
                        <tr>
                            {
                                ["Booking Details",
                                    "Departure",
                                    "Return",
                                    "Guest(s)"].map((header, headerIndex) => {
                                    return (
                                        <th>
                                            {header}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                        {
                            Itineraries.map((booking, bookingIndex) => {
                                return (
                                    <tr>
                                        <td>
                                            <div>
                                                <p>Reference No: <strong>{booking.ReferenceNo}</strong></p>
                                                <p>{`Booked: ${moment(booking.BookingDate).format("MMM. DD, YYYY")}`}</p>
                                                {
                                                    booking.BookingStatus.toUpperCase() === 'HOLD' &&
                                                    <p>{`Hold Date: ${moment(booking.HoldDateTime).format("MMM. DD, YYYY")}`}</p>
                                                }
                                                <p>Status: <strong>{booking.BookingStatus}</strong></p>
                                            </div>
                                        </td>
                                        {
                                            booking.Journeys.map(journey => {
                                                return (
                                                    <td>
                                                        {
                                                            journey.Segments.map((segment, segmentIndex) => {
                                                                let departureStationCode = segment.DepartureStation.StationCode
                                                                let arrivalStationCode = segment.ArrivalStation.StationCode
                                                                let departureStationName = segment.DepartureStation.StationName
                                                                let arrivalStationName = segment.ArrivalStation.StationName
                                                                let departureAirportName = segment.DepartureStation.AirportName
                                                                let arrivalAirportName = segment.ArrivalStation.AirportName

                                                                let journeyText = departureStationName.toUpperCase() + " to " + arrivalStationName.toUpperCase()

                                                                let flightNo = segment.FlightDesignator.CarrierCode + " " + segment.FlightDesignator.FlightNumber
                                                                let departureDate = moment(segment.STD).format("MMM. DD, YYYY")

                                                                return (
                                                                    <div className={classNames({ "breakline": segmentIndex === 1 })}>
                                                                        <p className="station-name"><strong>{`${departureStationCode} — ${arrivalStationCode}`}</strong></p>
                                                                        <p>{departureDate}</p>
                                                                        <p className="flight-no"><strong>{flightNo}</strong></p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                        {
                                            booking.Journeys.length === 0 &&
                                            [<td> - </td>, <td> - </td>]
                                        }
                                        {
                                            booking.Journeys.length === 1 &&
                                            <td> - </td>
                                        }
                                        <td>
                                            <div className="pax">
                                                {
                                                    booking.PassengerNames.map((passengerName, passengerNameIndex) => {
                                                        let name = passengerName.Title + ' ' + passengerName.FirstName + ' ' + passengerName.MiddleName + ' ' + passengerName.LastName
                                                        return (
                                                            <div>
                                                                <p className="paxname">{`${passengerNameIndex + 1}. ${name}`}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.Itineraries, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(Itineraries) as typeof Itineraries;