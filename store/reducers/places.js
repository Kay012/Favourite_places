import Place from '../../models/place';
import {ADD_PLACE, SET_PLACES} from '../actions/places';

const initialState = {
    places : []
}

const placesRuducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PLACES:
            return {
                places: action.loadedPlaces.map(pl => new Place(pl.id.toString(), pl.title, pl.imageUri, pl.address, pl.lat, pl.lng))
            }

        case ADD_PLACE :
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image, action.placeData.address, action.placeData.coords.lat,  action.placeData.coords.lng);
            
            return {
                places : state.places.concat(newPlace)
            }
        default :
            return state
    }
    
}

export default placesRuducer;