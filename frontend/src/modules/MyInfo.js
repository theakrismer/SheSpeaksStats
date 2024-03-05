import { useState } from "react";

function MyInfo() {

    const [age, setAge] = useState();
    return (

        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <p className="text-3xl my-5 font-bold italic">Demographics</p>
            <div>
                <label htmlFor="age">How old are you?</label><br />
                <input className="bg-gray-700 p-1 m-2" type="number" min="1" max="115" id="age" name="age" value={age} onChange={e => setAge(e.target.value)} /><br />
            </div>
        </div>
    );
}

export default MyInfo;
