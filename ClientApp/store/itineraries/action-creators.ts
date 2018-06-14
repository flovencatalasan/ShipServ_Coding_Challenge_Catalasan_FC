import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from 'ClientApp/app';

import * as actionTypes from './action-types';

import { Booking } from 'ClientApp/@models'

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = actionTypes.GetItineraries | actionTypes.UpdateComponent;


// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    UpdateComponent: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'UPDATE_COMPONENT' });
    },

    GetItineraries: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const bookings = require<Array<Booking>>('../../data/bookings.json')

        dispatch({ type: 'GET_ITINERARIES', Itineraries: bookings})
    }
};