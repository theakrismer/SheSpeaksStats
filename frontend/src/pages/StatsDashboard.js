import { useEffect, useState } from 'react';
import { API_URL } from '../index.js'
function StatsDashboard({ page }) {

  const [totalMen, setTotalMen] = useState();
  const [mostTagetedAge, setMostTargetedAge] = useState();
  const [problemPercent, setProblemPercent] = useState();

  // Totals
  const [totalProblematic, setTotalProblematic] = useState();
  const [groupsOverview, setGroupsOverview] = useState();
  const [largestProblematicGroup, setLargestProblematicGroup] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const getStats = () => {
    const p1 = fetch(API_URL + "/stats/total-men").then(res => res.json()).then(data => setTotalMen(data));
    const p2 = fetch(API_URL + "/stats/most-targeted-age").then(res => res.json()).then(data => setMostTargetedAge(data));
    const p3 = fetch(API_URL + "/stats/problematic-percent").then(res => res.json()).then(data => setProblemPercent(data));
    const p4 = fetch(API_URL + "/stats/total-problematic-men").then(res => res.json()).then(data => setTotalProblematic(data));
    const p5 =fetch(API_URL + "/stats/groups-overview").then(res => res.json()).then(data => {
      setGroupsOverview(data);
      for (const [key, value] of Object.entries(data)) {
        if (value.mostProblematic == true) { setLargestProblematicGroup(value); }
      }
    })
    Promise.all([p1,p2,p3,p4,p5]).then((values) => {
      setIsLoading(setIsLoading(false));
    })
  }

  useEffect(() => {
      getStats();
  }, [])

  return (<>
  { isLoading ? <div className='my-10 text-white text-center'><p>Loading . . .</p> </div>:
    <div className='container-md mx-40 p-5 rounded text-center flex flex-col border justify-center my-5 py-5 text-white text-xl'>
      <p>Of all <span className='text-3xl italic'>{totalMen}</span> men tallied...</p>
      <p><span className='text-3xl italic'>{(problemPercent * 100).toFixed(2)}%</span> <span className='text-sm'>({totalProblematic})</span> exhibited negative behaviour. </p>
    </div>}

    { isLoading ? null :
    <div className='container-md mx-40 p-5 rounded text-center flex flex-col border justify-center my-5 py-5 text-white text-xl'>
      
      <p>Respondents said <span className='italic text-3xl'>{largestProblematicGroup ? largestProblematicGroup.groupname : null}</span> had the highest percentage of problematic behaviour compared to other groups.</p>
      <p>Around <span className='italic text-3xl'>{largestProblematicGroup ? (largestProblematicGroup.percentProblematic * 100).toFixed(2) : null}%</span> <span className="text-sm">({largestProblematicGroup ? largestProblematicGroup.totalProblematic : null})</span> of {largestProblematicGroup ? largestProblematicGroup.groupname : null} exhibited poor behaviour.</p>
      { groupsOverview ? (
      <div className='my-5 text-sm'>
        <p className='font-bold text-lg'>As compared to...</p>
          {groupsOverview.family.mostProblematic ? null : <p className='capitalize'>{groupsOverview.family.groupname}, {(groupsOverview.family.percentProblematic * 100).toFixed(2)}%</p> }
          {groupsOverview.extendedfamily.mostProblematic ? null : <p className='capitalize'>{groupsOverview.extendedfamily.groupname}, {(groupsOverview.extendedfamily.percentProblematic * 100).toFixed(2)}%</p>}
          {groupsOverview.closefriends.mostProblematic ? null : <p className='capitalize'>{groupsOverview.closefriends.groupname}, {(groupsOverview.closefriends.percentProblematic * 100).toFixed(2)}%</p>}
          {groupsOverview.friends.mostProblematic ? null : <p className='capitalize'>{groupsOverview.friends.groupname}, {(groupsOverview.friends.percentProblematic * 100).toFixed(2)}%</p>}
          {groupsOverview.acquaintances.mostProblematic ? null : <p className='capitalize'>{groupsOverview.acquaintances.groupname}, {(groupsOverview.acquaintances.percentProblematic * 100).toFixed(2)}%</p>}
      </div>
      ):null}
    </div>
    }


{ isLoading ? null :
    <div className='container-md mx-40 p-5 rounded text-center flex flex-col border justify-center my-5 py-5 text-white text-xl'>
      <p> Respondents <span className='text-3xl italic'>{mostTagetedAge.age} </span> years old were most at risk, reporting <span className='text-3xl italic'>{(mostTagetedAge.percent * 100).toFixed(2)}%</span> of men they knew exhibited problematic behaviour.</p>
    </div>}

  </>
  );
}

export default StatsDashboard;
