import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET    = 'SET_CURRENT_USER'
const REMOVE = 'REMOVE_CURRENT_USER'

/* ------------   ACTION CREATORS     ------------------ */

const set   = user => ({ type: SET, user })
const remove  = () => ({ type: REMOVE })

/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    
    case SET: 
      return action.user;

    case REMOVE: 
      return {};  

    default: 
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const login = credentials => dispatch => {
  // axios.post('/auth/login', credentials)
  //      .then(res => dispatch(set(res.data)))
  //      .catch(err => console.error('Unable to Login', err));
  console.log(credentials, 'logincredentials')
}

export const signup = credentials => dispatch => {
  // axios.post('/auth/signup', credentials)
  //      .then(res => dispatch(set(res.data)))
  //      .catch(err => console.error('Unable to Login', err));
  console.log(credentials, 'signupcredentials')
}

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/auth/me')
      .then(res => dispatch(set(res.data)))
      .catch(err => console.error('Unable to Retrieve Login', err));
}

// optimistic
export const logout = () => dispatch => {
  dispatch(remove())
  axios.get('/auth/logout')  
       .catch(err => console.error('Unable to Logout', err));
}