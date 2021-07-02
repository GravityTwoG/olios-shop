import { SEARCH_GET_REQUESTED_PRODUCTS, SEARCH_UPDATE_SEARCHWORD, SEARCH_RESET_SEARCHWORD } from './actions'

const initialState = {
  searchWord: '',
  results: {}
}

export const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_GET_REQUESTED_PRODUCTS:
      return {
        ...state,
        results: action.payload
      }

    case SEARCH_UPDATE_SEARCHWORD:
      return {
        ...state,
        searchWord: action.payload
      }

    case SEARCH_RESET_SEARCHWORD:
      return {
        ...state,
        searchWord: ''
      }

    default:
      return state;
  }
}