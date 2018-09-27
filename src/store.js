import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import issues from './reducers/issueReducer'
import filterIssues from './reducers/filterIssueReducer'

export default createStore(
    combineReducers({
        issues,
        filterIssues
    }),
    {},
    applyMiddleware(logger, thunk, promise())
)
