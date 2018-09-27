import React from 'react'
import PropTypes from 'prop-types'

const Pagehead = (props) => {
    const { issuesLength } = props
    return (
        <div className="pagehead">
            <div className="container repohead-container">
                <h1 className="pagehead-title">
                    <i className="fa fa-book" />
                    <a href="https://github.com/facebook">captiv8io</a>
                    <span>/</span>
                    <b><a href="https://github.com/facebook/react">interview</a></b>
                </h1>
            </div>
            <div className="container">
                <nav className="reponav">
                    <a href="#" className="reponav-item selected">
                        <i className="fas fa-exclamation-circle" />
                        <span>Issues</span>
                        <span className="counter">{issuesLength}</span>
                    </a>
                </nav>
            </div>
        </div>
    )
}

Pagehead.defaultProps = {
    issuesLength: 0
}

Pagehead.propTypes = {
    issuesLength: PropTypes.number
}

export default Pagehead
