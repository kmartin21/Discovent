import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

configure({ adapter: new Adapter() })

function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware
        )
    )
}

export default TestProvider = ({ children }) => {
    const store = configureStore()

    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
};

