import { useState } from "react";

function AddPerson({people}) {

    const [nickname, setNickname] = useState();
    const [group, setGroup] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        // people.setPeople({
        //     ...people.peopleData,
        //     people.peopleData[group].nickname
        // })

    }

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <form onSubmit={handleSubmit}>

                <label htmlFor="group">What is your relationship with this person?</label><br />
                <select name="group" id="group" value={group} onChange={e => setGroup(e.target.value)}>
                    <option value="family">Family</option>
                    <option value="extendedfamily">Extended Family</option>
                    <option value="closefriends">Close Friends</option>
                    <option value="friends">Friends</option>
                    <option value="acquaintances">Acquaintances</option>
                </select><br />
                <div>
                    <label htmlFor="nickname">What's a nickname we can use for this person?</label><br />
                    <input type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /><br />
                </div>

                <div>
                    <label>Has this person exhibted problematic behavior of any kind?</label><br />
                    <span className="mx-5"><label htmlFor="problematic_no">No </label> <input type="radio" id="problematic" name="problematic" value="no" /></span>
                    <span className="mx-5"><label htmlFor="problematic_yes">Yes </label><input type="radio" id="problematic" name="problematic" value="yes" /> </span>
                </div>

                <div>
                    <label htmlFor="nickname">What sort of problematic behavior?</label><br />
                    <input type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /><br />
                </div>

                <input type="submit" value="Add Person"/>
            </form>
        </div>
    );
}

export default AddPerson;
