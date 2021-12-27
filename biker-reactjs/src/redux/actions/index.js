export const authenticateUser = (payload) => ({ type: 'AUTHENTICATING_USER', payload });
export const logoutUser = (payload) => ({ type: 'LOGOUT_USER', payload });

export const getParcelsAction = (payload) => ({type: 'GET_PARCELS', payload});
export const getBikerParcelsAction = (payload) => ({type: 'GET_BIKER_PARCELS', payload});
export const pickupParcelAction = (payload) => ({type: 'PICKUP_PARCEL', payload});
export const cancelParcelAction = (payload) => ({type: 'CANCEL_PARCEL', payload});
