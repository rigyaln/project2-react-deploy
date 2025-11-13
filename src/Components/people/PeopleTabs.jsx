import {useState, useEffect} from 'react';

//components
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PeopleGroup from './PeopleGroup';  

//css
import './people.css';

//util
import getData from '../../assets/utils/getData';


function PeopleTabs() {
    //state
    const [loaded, setLoaded] = useState(false);
    const [pepObj, setPeopObj] = useState();
    //load data
    useEffect(()=>{
        getData('people/')
          .then((json)=>{
            console.log('people: ', json);
            setPeopObj(json);
            setLoaded(true);
        })
    }, []);
  if (!loaded) return (<h1>Loading People...</h1>);
  
  return (
    <>
      <h1>{pepObj.title}</h1>
      <h3>{pepObj.subTitle}</h3>
      <Tabs
      defaultActiveKey="faculty"
      id="fill-tab-example"
      className="mb-3"
      fill
      >
          <Tab eventKey="faculty" title="Faculty">
            <PeopleGroup title="Faculty" pepGroup={pepObj.faculty}/>
          </Tab>
          <Tab eventKey="staff" title="Staff">
            <PeopleGroup title="Staff" pepGroup={pepObj.staff}/>
          </Tab>
      </Tabs>
    </>
  )
}

export default PeopleTabs;