import * as AppActions from '../actions';

import {
    Brand,
    PageHeader
} from '@patternfly/react-core';

import DateRangeFilter from './DateRangeFilter';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import newlogo from './static/images/rh-new-logo.svg';
import { useHistory } from 'react-router';

const MainHeader = ({ isNavigationOpen, toggleNav }) => {

    const history = useHistory();
    const { pathname } = history.location;

    return (
        <PageHeader 
            logo={<Brand src={newlogo} alt= "Red Hat Logo White"/>}
            logoProps={{
                href: '/payloads',
                target: '_blank'
            }}
            toolbar={
                !pathname.includes('/track') && <DateRangeFilter/>
            }
            onNavToggle={ () => toggleNav(isNavigationOpen) }
            showNavToggle
        />
    )
}

MainHeader.propTypes = {
    isNavigationOpen: PropTypes.bool,
    toggleNav: PropTypes.func
};

const mapStateToProps = state => ({
    isNavigationOpen: state.sidebar.isNavigationOpen
});

const mapDispatchToProps = dispatch => ({
    toggleNav: (bool) => dispatch(AppActions.toggleNav(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);