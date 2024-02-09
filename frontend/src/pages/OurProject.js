function OurProject() {



    return (
        <>
            <div className='container-md mx-auto mx-8 p-5 rounded flex flex-col border justify-center my-5 py-5 text-white text-xl'>
                <h1 className="text-3xl py-5">Our Project</h1>
                <p>
                    This exercise exists to generate awareness about the sheer volume of negative male behavior, especially towards women. This tool aims to collect data about men in society and to spread awareness of any inappropriate behavior towards others. The goal is to educate others on the felt experiences of others and to provide a way to identify men in your life who may be worth ending social relations with.
                </p>
            </div>

            <div className='container-md mx-auto mx-8 p-5 rounded flex flex-col border justify-center my-5 py-5 text-white text-xl'>
                <h1 className="text-3xl py-5">How our tool works</h1>
                <p>
                    The tool is quite simple and can also be done on paper.</p>
                <ol className="list-decimal list-inside">
                    <li>Count the number of men in your life, categorizing them by their relationship to you. (family, friends, etc.) </li>
                    <li>Now remove the men who have exhibited problematic behavior in some way—sexist, transphobic, racist, and so on.    <br/><span className="text-sm">* Note that extreme examples are not the only terms for disqualification; general harassment of women, uncomfortable statements, or political views may be used at your personal discretion.</span> </li>
                    <li>With the "problematic" men removed, think critically about who the remaining men are, how many you started with, and how many are now left over.</li>
                </ol>
            </div>


        </>
    );
}

export default OurProject;
