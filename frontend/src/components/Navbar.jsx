const Navbar = ({ onOpen, onSearch }) => {

    // Updates state of searchTerm via the onSearch prop
    const handleSearch = (e) => {
        onSearch(e.target.value);
    }

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Tasks</a>
                </div>
                <div className="navbar-center">
                    <input type="text" placeholder="Search" className="input input-bordered w-48 md:w-auto" onChange={ handleSearch } />
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary" onClick={ onOpen }>Create Task</a>
                </div>
            </div>     
        </>
    )
}

export default Navbar