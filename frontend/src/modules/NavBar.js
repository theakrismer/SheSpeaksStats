function NavBar({ page }) {
    return (
        <div className="flex justify-evenly pt-4 text-white text-2xl">
            <button 
            onClick={() => page.setActivePage("stats")}
            className={`border-2 ${page.activePage === "stats" ? "border-white cursor-default" : "border-transparent hover:underline cursor-pointer"} p-2 rounded`}>
                Statistics
            </button>
            <button
            onClick={() => page.setActivePage("survey")} 
            className={`border-2 ${page.activePage === "survey" ? "border-white cursor-default" : "border-transparent hover:underline cursor-pointer"} p-2 rounded`}>Take The Survey</button>
        </div>
    );
}

export default NavBar;
