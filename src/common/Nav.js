function Nav() {
  
  return (
    <nav className="navbar is-dar">
      <div className="container">
        <input type="search" onKeyUp={searchTyping}></input>
      </div>
    </nav>
  )
}

export default Nav