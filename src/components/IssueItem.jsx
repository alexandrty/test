import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class IssueItem extends PureComponent {
    render() {
        const { issues, deleteIssue } = this.props
        return (
            <ul className="issues">
                { issues.map(el => (
                    <li key={el.id} className="issues__item">
                        <div className={`issues__status issues__status--${el.state}`}>
                            <i className="fas fa-exclamation-circle" />
                        </div>
                        <div className="issues__title">
                            <a href="#" className="issues__link">
                                {el.title}
                            </a>
                        </div>
                        {el.state === 'open'
                            ? (
                                <button
                                    onClick={() => { deleteIssue(el.id) }}
                                    className="btn issue__close"
                                    type="button"
                                >
                                    Close issue
                                </button>
                            ) : null}
                    </li>
                ))
                }
            </ul>
        )
    }
}

IssueItem.defaultProps = {
    issues: [],
    deleteIssue: () => null
};


IssueItem.propTypes = {
    issues: PropTypes.array,
    deleteIssue: PropTypes.func
};

export default IssueItem;
