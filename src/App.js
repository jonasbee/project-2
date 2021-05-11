import Map from './components/Map'
import WeatherShow from './components/WeatherShow'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './common/Nav.js'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Map}/>
        <Route path="/weather/:name" component={WeatherShow}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
