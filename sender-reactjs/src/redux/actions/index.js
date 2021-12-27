export const authenticateUser = (payload) => ({ type: 'AUTHENTICATING_USER', payload });
export const logoutUser = (payload) => ({ type: 'LOGOUT_USER', payload });
export const getParcelsAction = (payload) => ({type: 'GET_PARCELS', payload});
export const confirmParcelDeliveryAction = (payload) => ({type: 'CONFIRM_PARCEL_DELIVERY', payload});
export const deleteParcelAction = (payload) => ({type: 'DELETE_PARCEL', payload});
export const getStatsAction = (payload) => ({type: 'GET_STATS', payload});
