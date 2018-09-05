import {REGISTER_TYPE} from '../actions/action-types'
export default  register = (state = {}, action) => {
    
    switch (action.type) {
        case REGISTER_TYPE:
            return {...state,
                 regitser_success:action.payload
            }
        default:
          return state
    }
}