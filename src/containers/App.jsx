import React from 'react'
import { connect } from 'react-redux'

import { Main } from '../components/Main'
import setName from '../actions/userActions'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Main changeUsername={() => this.props.setName('Anna')} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setName: (name) => {
        dispatch(setName(name));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
