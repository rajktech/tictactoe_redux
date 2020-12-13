const INITIAL_STATE = {
    scoreHistory: []
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SCORE_HISTORY': 
            return {
                ...state, 
                scoreHistory: [...state.scoreHistory, action.scoreHistory]
            }
        default:
            return state;
    }
}