// import 'isomorphic-fetch';
import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
// import config from 'config';

const config = {
  apiRoot: 'http://localhost:3888',
};

if (__DEV__) {
  config.apiRoot = 'http://localhost:3888';
}

// import { showError } from '../modules/ErrorSnackbar';

/*
let store;

export const injectStore = (_store) => {
  store = _store;
};
*/

/*
// Endpoint configurations
These example endpoints can be called by dispatching the respective actions, e.g:

dispatch(rest.actions.teams.post({teamId: 42}, { body: JSON.stringify(exampleData) }));
Results in: POST /teams?teamId=42 with POST data from 'exampleData'

Result of request can be found in: `state.teams.data`
Information about request: `state.teams.error`, `state.teams.sync`, `state.teams.error`...
*/

const rest = reduxApi({
  experts: {
    url: `${config.apiRoot}/experts`,
    transformer: transformers.array,
    crud: true,
  },
  expertDetails: {
    url: `${config.apiRoot}/experts/:expertId`,
    crud: true,
  },
  lectures: {
    url: `${config.apiRoot}/teacher/lectures`,
    transformer: transformers.array,
    crud: true,
  },
  lectureDetails: {
    url: `${config.apiRoot}/lectures/:lectureId`,
    crud: true,
  },
  feedback: {
    url: `${config.apiRoot}/feedback`,
    crud: true,
  },
  profile: {
    url: `${config.apiRoot}/users/me`,
    crud: true,
  },
  // Add more API endpoints here! Examples below:

  /*
  // Endpoints which return an array (data defaults to [])
  teams: {
    url: `${config.apiRoot}/teams`,
    transformer: transformers.array,
    crud: true,
  },
  companies: {
    url: `${config.apiRoot}/companies`,
    transformer: transformers.array,
    crud: true,
  }

  // Endpoint which returns an object (data defaults to {})
  profile: {
    url: `${config.apiRoot}/profile`,
    crud: true,
  }
  */
})
.use('options', (url, params, getState) => {
  const { login: { token } } = getState();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // Add token to request headers
  if (token) {
    return { headers: { ...headers, Authorization: `Bearer ${token}` } };
  }

  return { headers };
})
.use('fetch', adapterFetch(fetch))
.use('responseHandler', (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  /*
  if (err) {
    let msg = 'Error';

    // error code
    msg += err.statusCode ? ` ${err.statusCode}` : '';

    // error reason
    msg += err.error ? ` ${err.error}` : '';

    // error description
    msg += err.message ? `: ${err.message}` : '';
    store.dispatch(showError(msg));
  }
  */
});

export default rest;
export const reducers = rest.reducers;
