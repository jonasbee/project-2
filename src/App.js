import Map from './components/Map'
import WeatherShow from './components/WeatherShow.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/common/Nav.js'

function App() {

  return (
    <BrowserRouter>
      <div className="main-container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Map}/>
          <Route path="/weather/:name" component={WeatherShow}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
