const Navbar = () => {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Tasks</a>
                </div>
                <div className="navbar-center">
                    <input type="text" placeholder="Search" className="input input-bordered w-48 md:w-auto" />
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary">Create Task</a>
                </div>
            </div>     
        </>
    )
}

export default Navbar