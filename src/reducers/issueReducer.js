const issueReducer = (state = {
    issuesList: [],
    issuesTabs: 'open'
}, action) => {
    switch (action.type) {
    case 'GET_ISSUES_FULFILLED':
        state = {
            ...state,
            issuesList: [...action.payload]
        }
        break
    case 'ADD_ISSUE':
        state = {
            ...state,
            issuesList: [...state.issuesList, action.payload]
        }
        break
    case 'REMOVE_ISSUE':
        state = {
            ...state,
            issuesList: [...state.issuesList.map(item => (
                item.id === action.payload
                    ? { ...item, state: 'closed' } : item
            ))]
        }
        break
    case 'ISSUE_TAB_STATE':
        state = {
            ...state,
            issuesTabs: action.payload
        }
        break
    default: state
    }
    return state
}

export default issueReducer
