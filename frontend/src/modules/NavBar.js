function NavBar({ page }) {
    return (
        <div className="flex justify-evenly py-4 bg-gradient-to-bl bg-sky-500/10 text-white text-center text-2xl">
            <button 
            onClick={() => page.setActivePage("stats")}
            className={`border-2 ${page.activePage === "stats" ? "border-white cursor-default" : "border-transparent hover:border-white transition cursor-pointer"} p-2 rounded`}>
                Statistics
            </button>
            <button
            onClick={() => page.setActivePage("survey")} 
            className={`border-2 ${page.activePage === "survey" ? "border-white cursor-default" : "border-transparent hover:border-white transition cursor-pointer"} p-2 rounded`}>Take the Survey</button>
            <button
            onClick={() => page.setActivePage("ourproject")} 
            className={`border-2 ${page.activePage === "ourproject" ? "border-white cursor-default" : "border-transparent hover:border-white transition cursor-pointer"} p-2 rounded`}>This Project</button>
        </div>
    );
}

export default NavBar;
