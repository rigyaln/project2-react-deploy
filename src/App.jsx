//import libs
import {useEffect, useState} from 'react';

//import components
import About from './Components/About'
import PeopleTabs from './Components/people/PeopleTabs';
import Degrees from './Components/Degrees'
import Minors from './Components/Minors'
import Employment from './Components/Employment'
import Footer from './Components/Footer'
//import utils 
import getData from './assets/utils/getData';

//import css
import './App.css'

function App() {
  //state vars
  //const  [getter, setter] = useState(init);
  //flag to know if i have data yet
  const [loaded, setLoaded] = useState(false);
  //data holder
  const [aboutObj, setAboutObj] = useState();

  //methods
  useEffect(() =>{
    getData('about/').then((json)=>{
      setAboutObj(json);
      setLoaded(true);
    }

    )
  }, []);

  if(!loaded) return (
    <>
      <div className='header'>
        <h1>Welcome to RIT iSchool</h1>
        <nav className='nav-links'>
          <a href="#about">About</a>
          <a href="#degrees">Degrees</a>
          <a href="#minors">Minors</a>
          <a href="#employment">Employment</a>
          <a href="#people">People</a>
        </nav>
      </div>
      <div className='App'>
        {/*all components will be here */}
        <h1>loading...</h1>
      </div>
    </>
  )
  if(loaded) return (
  <>
    <div className='header'>
      <h1>Welcome to RIT iSchool</h1>
      <nav className='nav-links'>
        <a href="#about">About</a>
        <a href="#degrees">Degrees</a>
        <a href="#minors">Minors</a>
        <a href="#employment">Employment</a>
        <a href="#people">People</a>
      </nav>
    </div>
    <div className='App'>
      {/*all components will be here */}
      <section id="about">
        <About da={aboutObj}/>
      </section>
      <hr/>
      <section id="degrees">
        <Degrees />
      </section>
      <hr/>
      <section id="minors">
        <Minors />
      </section>
      <hr/>
      <section id="employment">
        <Employment />
      </section>
      <hr/>
      <section id="people">
        <PeopleTabs />
      </section>
      <hr/><br/>
    </div>
    <Footer />
    </>
  )
}

export default App