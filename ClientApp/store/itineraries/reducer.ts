import { Reducer } from 'redux';
import { KnownAction } from './action-creators';
import { ItinerariesState, InitialItinerariesState } from './state'

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ItinerariesState> = (state: ItinerariesState, action: KnownAction) => {
    switch (action.type) {
        case 'UPDATE_COMPONENT': {
            return {
                ...state,
                LastActionType: action.type
            }
        }
        case 'GET_ITINERARIES': {
            return {
                ...state,
                Itineraries: action.Itineraries
            };
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || InitialItinerariesState;
};
