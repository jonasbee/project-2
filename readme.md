### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# Project 2: 48-hour ReactJS hackathon

You can find the project [here](https://jonasbee-ga-sei-project-2-reactathon.netlify.app/).

## Brief

Build a React application that consumes a public API during a 48-hour hackathon between two people.

### Requirements

- Consume a public API
- Have several ReactJS components
- The app can have a router - with several "pages"
- Include wireframes
- Be deployed online

## Technologies Used

- JavaScript & ReactJS
- React-Map-GL (for mapbox map)
- SCSS (Sass) & bulma.io
- WeatherAPI.com
- Git and GitHub
- Netlify (for deployment)

---

## Approach

With my colleague Dominic Reynolds, we decided to utilise Mapbox to create a world map as our main page of interaction.
We then decided to use WeatherAPI to get the weather forecast of any place on the the map.

### Methodologies

1. Pair programming using VS Code LiveShare
2. Distributed development using Git source control
3. Feature-driven development with minimal crossover so as to avoid merge conflicts, particularly important given the time constraints

### Functionality

The general user experience is that a user can click anywhere on a shown map (which is the landing page) and get a popup of the current weather at that particular pace. The user can then hold down click the popup to see the 3-day weather forecast & local time (live) in a detail view.

#### Popup when clicking on map & getting weather information per coordinates

Mapbox ("React-Map-GL") comes with the ability to render Popups when an user clicks on the map.
Moreover it can return precise coordinates for the point clicked.

As a happy coincidence while developing Weather API can return weather information for coordinates.
So we used the coordinates returned by the click event on the Mapbox map, to be send to Weather API, which returns the weather information, which we then displayed within the popup.

#### Render imperial and metric

As a stretch goal we implemented a conditional rendering that can switch the numeric system from Metric to Imperial (and reverse). This is enhanced by Weather API returning both Metric and Imperial information.

#### Search for places

Another stretch goal was to add a search input within the navigation bar for the user to be redirected to the weather forecast detail page of a certain place directly. Whenever the user hits a search button, the Weather API is called with the content of the search input, which returns weather information for valid places similarly to calling Weather API with coordinates.

### Known bugs

#### Hold down instead of click

Due to the map being clickable anywhere we did not manage to have the link work as a simple click, since it was recognised as another click on the map by Mapbox (returning coordinates and triggering a new popup render and Weather API call). Therefore & due to time constraints we changed it to a hold down click.

#### Same city/area, different country

While playing around with the finished product after 48 hours we realised, that when searching for places the name of the place is potentially not unique, so an intended place of the user might not be found (& rather place with the same name in a different country)

### Potential future features

We were both really attracted by Mapbox & the idea of having a world map as the main page of interaction.
We thought of enhancing the application with other information using additional APIs which also can be called with the coordinates being returned by Mapbox, e.g. to show the current CoViD-19 situation at that place.

## Challenges

The main challenges were:
1. Getting Mapbox to work: We started with a package called "Mapbox-GL-JS", which appeared to not work well with ReactJS.
2. Managing the rendering and user interaction of Popups with "React-Map-GL".

## Conclusions

I really enjoyed the working on the idea of an interactive map. It was tedious but an important experience to work with a complex new package & I also learned that trying out a promising sounding package might lead to searching for an alternative again, if it is not serving your needs.

Moreover I really liked working as a team of two and pair programming through LiveShare.
