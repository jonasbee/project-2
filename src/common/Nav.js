import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWeatherAtCity } from '../lib/api'
import CustomPopup from '../components/CustomPopup'

function Nav() {

  const [searchValue, setSearchValue] = useState(null)
  const [isError, setError] = useState(false)

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await getWeatherAtCity(searchValue.capitalize())

    } catch (error) {
      setError(true) 
    }
  }

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            World Map
          </Link>
        </div>
        <div className="navbar-burger">
          <form type="navbar-item" onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <input 
                  className="input"
                  type="search"
                  placeholder="City name"
                  onKeyUp={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Nav