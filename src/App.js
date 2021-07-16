import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Blogs from './components/Blogs'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/blogs" component={Blogs} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
