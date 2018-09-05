import {LOGIN_TYPE} from '../actions/action-types'
export default  login = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_TYPE:
            return {...state,
                 login_success:action.payload
            }
        default:
          return state
    }
}