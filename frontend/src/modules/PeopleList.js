import { useEffect } from "react";

function PeopleList({ people }) {

    const removePerson = (index) => {
        let tempArr = [...people.peopleData];
        tempArr.splice(index)
    
        people.setPeopleData(tempArr);
        }

    return (
        <div className="container-md mx-8 p-5 rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            {
                people && people.peopleData ? people.peopleData.map((person,index) => (
                    <div className="border-r-4 my-3 flex flex-row items-center" key={person.nickname + person.group + person.reason}>
                        <p className="mr-10 text-red-600 cursor-pointer font-bold" onClick={e=>removePerson(index)}>X</p>
                        <div>
                        <p className="text-3xl">{person.nickname}</p>
                        <p className="text-sm">{person.group}</p>
                        <p>{person.problematic}</p>
                        <p>{person.reason}</p>
                        </div>
                        
                    </div>

                ) ): null
            }
        </div>
    );
}

export default PeopleList;
