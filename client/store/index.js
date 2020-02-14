import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer as user } from './user-store'
import { panelReducer as panel } from './panel-store'
import { canvasReducer as canvas } from './canvas-store'
import { chatReducer as chat } from './chat-store'

const reducer = combineReducers({user, panel, chat, canvas})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user-store'
