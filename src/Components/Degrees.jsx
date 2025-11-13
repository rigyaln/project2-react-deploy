import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import getData from '../assets/utils/getData';

const Degrees = () => {
     
    const [loaded, setLoaded] = useState(false);
    const [degreesObj, setDegreesObj] = useState();

    // gt degrees data
    useEffect(() => {
        getData('degrees/')
            .then((json) => {
                console.log('degrees data: ', json);
                setDegreesObj(json);
                setLoaded(true);
            })
    }, []);

  
    if (!loaded) return <h1>Loading Degrees...</h1>;

    // filter out the certificates from graduate degrees
    const graduateDegrees = degreesObj.graduate.filter(item => item.title);
    const certificates = degreesObj.graduate.find(item => item.availableCertificates);

    return (
        <div className='Degrees'>
            <div className='degreeTypeTitle'><h2>Undergraduate Degrees</h2></div>
            <Accordion>
                {degreesObj.undergraduate.map((degree, index) => (
                    <Accordion.Item eventKey={index.toString()} key={degree.degreeName}>
                        <Accordion.Header>{degree.title}</Accordion.Header>
                        <Accordion.Body>
                             
                            <p className='degree'>{degree.description}</p>
                            
                            {/* Cchecks to see if concentration exists and prints it if it does exit*/}
                            {degree.concentrations && degree.concentrations.length > 0 && (
                                <div>
                                    <h3>Concentrations:</h3>
                                     
                                        {degree.concentrations.map((conc, i) => (
                                            <p key={i}>{conc}</p>
                                        ))}
                                     
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <br/>
            <div className='degreeTypeTitle'><h2>Graduate Degrees</h2></div>
            <Accordion>
                {graduateDegrees.map((degree, index) => (
                    <Accordion.Item eventKey={index.toString()} key={degree.degreeName}>
                        <Accordion.Header>{degree.title}</Accordion.Header>
                        <Accordion.Body>

                            <p className='degree'>{degree.description}</p>

                            {degree.concentrations && degree.concentrations.length > 0 && (
                                <div>
                                    <h3>Concentrations:</h3>
                                    {degree.concentrations.map((conc, i) => (
                                        <p key={i}>{conc}</p>
                                    ))}
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <br/>
            {certificates && (
                <>
                    <div className='degreeTypeTitle'><h2>Graduate Advanced Certificates</h2></div>
                    <Accordion>
                        <Accordion.Item eventKey="0" key={certificates.degreeName}>
                            <Accordion.Header>Available Certificates</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {certificates.availableCertificates.map((cert, i) => (
                                        <p key={i}>{cert}</p>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </>
            )}
        </div>
    );
}

export default Degrees;