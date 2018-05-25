import { connect } from 'react-redux'
import { selectCountry } from '../actions/Events'
import  Link  from '../components/Link';

const mapStateToProps = (state, ownProps) => ({
    active: state.selectedCountry === ownProps.code,
    name: ownProps.name
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(selectCountry(ownProps.code))
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)