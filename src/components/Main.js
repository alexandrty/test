import React from 'react'
import PropTypes from 'prop-types'

export const Main = props => (
    <div>
        <div className="row">
            <div className="col-xs-12">
                <h1>The Main Page</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => props.changeUsername('Anna')}
                >
					Change the Username
                </button>
            </div>
        </div>
    </div>
);

Main.defaultProps = {
    changeUsername: 'Anna'
};

Main.propTypes = {
    changeUsername: PropTypes.func
};

export default Main
