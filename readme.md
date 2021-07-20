# Project 2: Building a React App
By Dominic Reynolds and Jonas Boulden

## Overview
---
The second project was to build a React application that consumes a public API. We were put into groups of  2 or 3 and were given two days to complete this project. Jonas and I spent a lot of time looking at different public APIs that we could use to create out project and had an idea to create a world map that would display the weather at a particular location when it is clicked. After reading through the documentation for MapBox and for WeatherAPI, we realised that it was possible and we began working on creating our application.

### Technical Requirements
---
Your app must:

* **Consume a public API** – this could be anything but it must make sense for your project.
* **Have several components** - At least one classical and one functional.
* **The app can have a router** - with several “pages”, this is up to your digression and if it makes sense for your project.
* **Include wireframes** - that you designed before building the app.
* **Be deployed online** and accessible to the public.

## Necessary Deliverables
---
* A **working application**, hosted somewhere on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the very beginning of the project
* **A `readme.md` file** with:
  * Explanations of the **technologies** used
    * A couple of paragraphs about the **general approach you took**
    * **Installation instructions** for any dependencies
    * Link to your **wireframes** – sketches of major views / interfaces in your application
   * Descriptions of any **unsolved problems** or **major hurdles** your team had to overcome

## Technologies Used
---
* React.js
* SCSS
* Bulma
* MapBox
* Weather API

## Approach Taken

### Preparation
---
In order to get started on the project, we first had to plan out how we would make it work. I noticed from reading the documentation that MapBox had a pop up feature and click events. The click events outputted a longitude and latitude, and that WeatherAPI has get requests using these same values. We then knew what we had to do to get it working. We worked through every problem as a pair, problem solving at each stage of development together.

### MapBox, Weather Requests and Pop Ups
---
This was the part of the project in which we spent most of our time, and due to the time constraints, we used VSCode Live-Share combined with Git for development. As I mentioned above, MapBox has a click event which provides the longitude and latitude. Using this, we were able to create a pop up that displayed the name of the location, the temperature and an icon with the current weather at the location, using a get request to WeatherAPI, which provided this for us. We had issues with MapBox in this stage of development which I have gone into detail below. 

```
const handleClick = (e) => {
    getWeather(e.lngLat)
  }

return (
    <div className=“map-container”>
      <ReactMapGl
        mapboxApiAccessToken={mapBoxAccessToken}
        mapStyle=“mapbox://styles/mapbox/streets-v11”
        width=“100%”
        height=“100%”
        onViewportChange={(viewport => setViewport(viewport))}
        onClick={handleClick}
        {…viewport}
        className=“is-fullheight-with-navbar”
      >
        {showPopup &&
          <CustomPopup
            latitude={weatherAtClick.location.lat}
            longitude={weatherAtClick.location.lon}
            altitude={viewport.altitude}
            setPopup={setPopup}
            weather={weatherAtClick}
          />
        }
      </ReactMapGl>
    </div>
  )
```

![Screenshot](map_screenshot.png)

### Weather Detail Page
---
We wanted to have a page which would display the weather at a location in more detail, including a 3 day forecast. This was fairly simple to do by doing another get request to WeatherAPI at the specific location required. Using the CSS framework Bulma, we displayed this data on the page, with a live clock and a feature that allows the user to pick between showing the values in imperial and metric. To change the values, I created an array with two objects, one with imperial and the other with metric, then switched between them in the XML depending on which units are selected.

```
function WeatherShow() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [isError, setIsError] = useState(false)

  const [selectedUnits, setSelectedUnits] = useState(0)

  const units = [{
    system: 'Metric',
    temp: 'c',
    wind: 'kph',
  }, {
    system: 'Imperial',
    temp: 'f',
    wind: 'mph',
  }]

  const { name } = useParams()
  // console.log(units)
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await get3DayForecastAtCity(name)
        setForecast(data.forecast)
        setCurrentWeather(data.current)
        setLocation(data.location)
      } catch (err) {
        setIsError(true)
        console.log(err)
      }
    }
    getData()
  }, [name])

  const changeUnits = () => {
    setSelectedUnits(selectedUnits ? 0 : 1)
    console.log(units[selectedUnits].system)
  }

  return (
    <section className="section">
      {isError ?
        <h1 className="title is-1">Oops, we failed to find the forecast here :(</h1>
        :
        <div className="container">
          {(location && currentWeather) &&
            <>
              <div className="columns">
                <div className="column is-two-thirds">
                  <h1 className="title is-1">{location.name}</h1>
                </div>
                <div className="column is-one-third">
                  <button className="button is-warning" onClick={changeUnits}>Change to {units[selectedUnits ? 0 : 1].system}</button>
                </div>
              </div>
              <hr />
              <div className="columns">
                <div className="column is-third">
                  <h4 className="title is-4">Country: {location.country}</h4>
                  <hr />
                  <h4 className="title is-4">Region: {location.region}</h4>
                  <hr />
                  <StartClock localtime={location.localtime.split(' ')[1]} />
                </div>
                <div className="column is-third">
                  <h4 className="title is-4">{currentWeather.condition.text}</h4>
                  <hr />
                  <h4 className="title is-4">{currentWeather[`temp_${units[selectedUnits].temp}`]}°{units[selectedUnits].temp.toUpperCase()}</h4>
                  <hr />
                  <h4 className="title is-4">Wind: {currentWeather[`wind_${units[selectedUnits].wind}`]} {units[selectedUnits].wind} {currentWeather.wind_dir}
                  </h4>
                  <hr />
                </div>
                <div className="column is-third">
                  <h4 className="title is-4">UV: {currentWeather.uv}</h4>
                  <hr />
                  <h4 className="title is-4">Humidity: {currentWeather.humidity}%</h4>
                  <hr />
                  <img src={currentWeather.condition.icon} />
                </div>
              </div>
            </>
          }
          {forecast ?
            <>
              <h2 className="title is-2">3 Day Forecast</h2>
              <hr />
              <div className="columns">
                {forecast.forecastday.map(day => (
                  <ForecastCard
                    key={day.date}
                    date={day.date}
                    maxTemp={day.day[`maxtemp_${units[selectedUnits].temp}`]}
                    minTemp={day.day[`mintemp_${units[selectedUnits].temp}`]}
                    condition={day.day.condition}
                    tempUnit={units[selectedUnits].temp}
                  />
                ))}
              </div>
            </>
            :
            <h2>Loading Forecast...</h2>
          }
        </div>
      }
    </section>
  )
}
```

![Screenshot](show_screenshot.png)

### Challenges
---
Our main challenge (and time consumer) was because we initially used the vanilla JavaScript version of MapBox called MapBox-GL-JS. Using this caused the map component to re render constantly when there were pop ups, and caused multiple pop ups to appear on the page, instead of removing the old pop up when a new location was clicked. This caused the page to crash after 30 second to a minute. After switching to React-Map-GL, this problem was solved as this version of MapBox is designed specifically for React. 

### Known Bugs
---
* To get to the detail page from clicking a pop up, the user must hold down their mouse on the pop up. This is because another normal click would cause another pop up to appear, instead of a click event in the pop up. This is particularly frustrating on mobile as it does not work correctly.
* As the detail page gets from WeatherAPI from the name of the location, this can cause the detail page to show for the same city name, but in a different place. For example; if you wanted the weather in Bangor, Wales, but instead you get the weather in Bangor, Northern Ireland.

### Future Features
---
With more time, we would have added more public APIs to the project, for example, showing the user the current Covid-19 situation in the area. 

## Learning Moments
---
I really enjoyed this project, working in a pair using VS Code live share was a great experience and the time constraints of the ‘Hackathon’ pushed us to work together as we solved problems and shared ideas. The project solidified my knowledge of React Hooks and deepened my understanding of the syntax and concepts that we had learned in class for the two weeks leading up to this project.