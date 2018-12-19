import React from 'react'
import PropTypes from 'prop-types'

const ErrorPage = ({ errorMessage }) => (
    <div className="error-page__container">
        <h2 className="error-page__header">{errorMessage}</h2>
    </div>
)

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorPage