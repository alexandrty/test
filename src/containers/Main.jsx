import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pagehead from '../components/Pagehead'
import IssueItem from '../components/IssueItem'
import getIssuesAction from '../actions/issueActions'


class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpenedNewIssue: false,
            activeClassTab: 'open'
        }
    }

    componentDidMount() {
        const { getIssues } = this.props
        getIssues()
    }

    toggleOpen(activeState) {
        this.setState({ activeClassTab: activeState })
        const { toggleOpen } = this.props
        toggleOpen(activeState)
    }

    searchIssue(e) {
        const { onFindIssue } = this.props
        const inputValie = e.target.value
        onFindIssue(inputValie)
    }

    toggleNewIssue() {
        const { isOpenedNewIssue } = this.state
        this.setState({
            isOpenedNewIssue: !isOpenedNewIssue
        })
    }

    addIssue(e) {
        e.preventDefault()
        const { addIssue } = this.props
        const inputValue = this.refs.inputAddIssue.value
        if (inputValue === '') return
        addIssue({
            id: new Date().valueOf(),
            title: inputValue,
            state: 'open'
        })
        this.refs.inputAddIssue.value = null
    }

    deleteIssue(id) {
        const { removeIssue } = this.props
        removeIssue(id)
    }

    render() {
        const {
            issuesList,
            issuesListFiltered,
            issuesOpened,
            issuesClosed
        } = this.props

        const { isOpenedNewIssue, activeClassTab } = this.state

        return (
            <main className="content">
                <Pagehead issuesLength={issuesList.length} />
                <div className="container">
                    <div className="issues-listing">
                        <div className="issues-listing__subnav">
                            <div className="subnav">
                                <form className="subnav__search">
                                    <input
                                        className="subnav__search-input"
                                        type="text"
                                        placeholder="Search"
                                        onChange={(e) => { this.searchIssue(e) }}
                                    />
                                </form>
                                <button onClick={() => { this.toggleNewIssue() }} className="btn btn-primary" type="button">
																		New issue
                                </button>
                            </div>
                            {isOpenedNewIssue
                                ? (
                                    <div className="issues-listing__create-issue">
                                        <form onSubmit={(e) => { this.addIssue(e) }} action="">
                                            <input ref="inputAddIssue" className="create-issue__input" type="text" />
                                            <input className="create-issue__button btn btn-primary" type="submit" value="Add Issue" />
                                        </form>
                                    </div>
                                )
                                : null}
                        </div>
                        <div className="issues-listing__header">
                            <div className="issues-listing__states">
                                <button className={`btn-link cursor--pointer ${activeClassTab === 'open' ? 'btn-link--selected' : ''}`} type="button" onClick={(e) => { this.toggleOpen('open', e) }}>
                                    <i className="fas fa-exclamation-circle" />
                                    {`${issuesOpened.length} Open`}
                                </button>
                                <button className={`btn-link cursor--pointer ${activeClassTab === 'closed' ? 'btn-link--selected' : ''}`} type="button" onClick={(e) => { this.toggleOpen('closed', e) }}>
                                    <i className="fas fa-check" />
                                    {`${issuesClosed.length} Closed`}
                                </button>
                            </div>
                        </div>
                        <div className="issues-listing__body">
                            <IssueItem
                                issues={issuesListFiltered}
                                deleteIssue={(id) => { this.deleteIssue(id) }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

Main.defaultProps = {
    issuesList: [],
    getIssues: () => null,
    toggleOpen: () => null,
    onFindIssue: () => null,
    removeIssue: () => null,
    addIssue: () => null,
    issuesListFiltered: [],
    issuesOpened: [],
    issuesClosed: []
};

Main.propTypes = {
    issuesList: PropTypes.array,
    getIssues: PropTypes.func,
    toggleOpen: PropTypes.func,
    onFindIssue: PropTypes.func,
    removeIssue: PropTypes.func,
    addIssue: PropTypes.func,
    issuesListFiltered: PropTypes.array,
    issuesOpened: PropTypes.array,
    issuesClosed: PropTypes.array
};

const mapStateToProps = state => ({
    issuesList: state.issues.issuesList,
    issuesListFiltered: state.issues.issuesList.filter(el => el.state === state.issues.issuesTabs
    && el.title.includes(state.filterIssues)),
    issuesOpened: state.issues.issuesList.filter(el => el.state === 'open'),
    issuesClosed: state.issues.issuesList.filter(el => el.state === 'closed')
})


const mapDispatchToProps = dispatch => ({
    getIssues: () => {
        dispatch(getIssuesAction())
    },
    addIssue: (name) => {
        dispatch({ type: 'ADD_ISSUE', payload: name })
    },
    removeIssue: (id) => {
        dispatch({ type: 'REMOVE_ISSUE', payload: id })
    },
    toggleOpen: (state) => {
        dispatch({ type: 'ISSUE_TAB_STATE', payload: state })
    },
    onFindIssue: (name) => {
        dispatch({ type: 'FIND_ISSUE', payload: name })
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)
