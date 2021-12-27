const reducer = (state = {parcels: [], biker_parcels: [], isLoading: false, error: '', stats: {latest: []}}, action) => {
    switch (action.type) {
        case 'PARCEL_FETCHING_STARTED':
            return { ...state, isLoading: true, error: '' };
        case 'PARCEL_FETCHED':
            return { ...state, parcels: action.payload.data, isLoading: false, error: '' };
        case 'BIKER_PARCELS_FETCHED':
            return { ...state, biker_parcels: action.payload.data, isLoading: false, error: '' };
        case 'PARCEL_FETCHING_ERROR':
            return { ...state, parcels: [], error: action.payload, isLoading: false };
        case 'SET_PARCELS_STATS':
            return { ...state, stats: action.payload };
        default:
            return state;
    }
};

export default reducer;
