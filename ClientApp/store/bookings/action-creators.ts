import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from 'ClientApp/app';
import * as _ from 'underscore';
import * as moment from 'moment';

import * as actionTypes from './action-types';

import { Booking, Segment } from 'ClientApp/@models'

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = actionTypes.GetBookings | actionTypes.UpdateComponent;


// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    UpdateComponent: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'UPDATE_COMPONENT' });
    },

    GetBookings: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const state = getState().Bookings
        let { TransactionData } = state

        const bookings = require<Array<Booking>>('../../data/bookings.json')

        const bookingsSegments: Array<Segment> = _.flatten(bookings.map(booking => booking.Journeys.map(journey => journey.Segments)))

        const internationalSegments = _.sortBy(bookingsSegments.filter(segment => segment.IsInternational), 'STD')
        const domesticSegments = _.sortBy(bookingsSegments.filter(segment => !segment.IsInternational), 'STD')

        const bookingDatesInternational = internationalSegments.map(segment => {
            return {
                x: moment(segment.STD),
                y: internationalSegments.filter(_segment => moment(_segment.STD).format('MM DD') === moment(segment.STD).format('MM DD')).length
            }
        })

        const bookingDatesDomestic = domesticSegments.map(segment => {
            return {
                x: moment(segment.STD),
                y: domesticSegments.filter(_segment => moment(_segment.STD).format('MM DD') === moment(segment.STD).format('MM DD')).length
            }
        })

        TransactionData.International.NoOfFlights = {
            labels: _.uniq(bookingDatesInternational.map(bookingDate => moment(bookingDate.x).format('MMM D'))),
            series: [
                {
                    name: 'int',
                    data: bookingDatesInternational,
                }
            ]
        };

        TransactionData.Domestic.NoOfFlights = {
            labels: _.uniq(bookingDatesDomestic.map(bookingDate => moment(bookingDate.x).format('MMM D'))),
            series: [
                {
                    name: 'dom',
                    data: bookingDatesDomestic,
                }
            ]
        }

        let monthlyCostDomestic = domesticSegments.map(segment => {
            return {
                month: moment(segment.STD).format('MM DD'),
                cost: segment.Fares[0].BaseSum
            }
        })

        let domesticExpenseByMonth = _.groupBy(domesticSegments.map(segment => { return { ...segment, Amount: segment.Fares[0].BaseSum } }), segment => {
            return moment(segment.STD).format('MM')
        })

        let domesticExpenseByMonthWithSumAmount = _.map(domesticExpenseByMonth, (group) => {
            return {
                Month: moment(group[0].STD).format('MMM'),
                Amount: _.pluck(group, 'Amount').reduce((sum, amount) => sum + amount, 0)
            }
        })

        TransactionData.Domestic.CostOfFlights = {
            labels: domesticExpenseByMonthWithSumAmount.map(n => n.Month),
            series: domesticExpenseByMonthWithSumAmount.map(n => Math.round(n.Amount))
        }


        let monthlyCostInternational = internationalSegments.map(segment => {
            return {
                month: moment(segment.STD).format('MM DD'),
                cost: segment.Fares[0].BaseSum
            }
        })

        let internationalExpenseByMonth = _.groupBy(internationalSegments.map(segment => { return { ...segment, Amount: segment.Fares[0].BaseSum } }), segment => {
            return moment(segment.STD).format('MM')
        })

        let internationalExpenseByMonthWithSumAmount = _.map(internationalExpenseByMonth, (group) => {
            return {
                Month: moment(group[0].STD).format('MMM'),
                Amount: _.pluck(group, 'Amount').reduce((sum, amount) => sum + amount, 0)
            }
        })

        TransactionData.International.CostOfFlights = {
            series: internationalExpenseByMonthWithSumAmount.map(n => Math.round(n.Amount)),
            labels: internationalExpenseByMonthWithSumAmount.map(n => n.Month)
        }

        TransactionData.CombinedCost = {
            labels: _.uniq(_.flatten([TransactionData.International.CostOfFlights.labels, TransactionData.Domestic.CostOfFlights.labels])),
            series: [TransactionData.International.CostOfFlights.series, TransactionData.Domestic.CostOfFlights.series]
        }

        dispatch({type: 'GET_BOOKINGS', Bookings: bookings, TransactionData})
    }
};