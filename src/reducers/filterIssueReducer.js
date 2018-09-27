const filterIssues = (state = '', action) => {
    switch (action.type) {
    case 'FIND_ISSUE':
        return action.payload
    default: state
    }
    return state
}

export default filterIssues
