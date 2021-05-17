import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Nav() {
  const history = useHistory()
  const [searchValue, setSearchValue] = useState(null)

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const search = searchValue.split(' ').join('%20')
    history.push(`/weather/${search}`)
  }
  
  return (
    <nav className="navbar is-dark is-fullwidth">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Weather World Map
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <form type="search" onSubmit={handleSubmit}>
              <span className="navbar-item is-inline-block">
                <span className="field">
                  <span className="control">
                    <input
                      className="input"
                      type="search"
                      placeholder="City name"
                      onKeyUp={handleChange}
                    />
                  </span>
                </span>
              </span>
              <span className="navbar-item is-inline-block">
                <span className="field">
                  <button type="submit" className="button is-warning">
                    Search
                  </button>
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav