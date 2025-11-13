import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import getData from '../assets/utils/getData';

const Employment = () => {
    const [loaded, setLoaded] = useState(false);
    const [employmentObj, setEmploymentObj] = useState();

    // Fetch employment data
    useEffect(() => {
        getData('employment/')
            .then((json) => {
                console.log('employment data: ', json);
                setEmploymentObj(json);
                setLoaded(true);
            })
    }, []);

    if (!loaded) return <h1>Loading Employment Data...</h1>;

    return (
        <div className='Employment'>
            {/* Introduction Section with Accordions */}
            <div className='degreeTypeTitle'>
                <h2>{employmentObj.introduction.title}</h2>
            </div>
            
            <Accordion>
                {employmentObj.introduction.content.map((section, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{section.title}</Accordion.Header>
                        <Accordion.Body>
                            <p>{section.description}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <br/>

            {/* Degree Statistics as Carousel */}
            <div className='degreeTypeTitle'>
                <h2>{employmentObj.degreeStatistics.title}</h2>
            </div>
            
            <div className='contentBox'>
                <Carousel interval={null}>
                    {employmentObj.degreeStatistics.statistics.map((stat, index) => (
                        <Carousel.Item key={index}>
                            <div style={{ 
                                padding: '60px 40px', 
                                backgroundColor: '#f8f9fa',
                                minHeight: '250px',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}>
                                <h2 style={{ fontSize: '3rem', color: '#fc7600', marginBottom: '20px' }}>
                                    {stat.value}
                                </h2>
                                <p style={{ fontSize: '1.2rem' }}>{stat.description}</p>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <br/>

            {/* Co-op Table */}
            <div className='degreeTypeTitle'>
                <h2>{employmentObj.coopTable.title}</h2>
            </div>
            
            <div className='scrollable-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employer</th>
                            <th>Degree</th>
                            <th>City</th>
                            <th>Term</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentObj.coopTable.coopInformation.map((coop, index) => (
                            <tr key={index}>
                                <td>{coop.employer}</td>
                                <td>{coop.degree}</td>
                                <td>{coop.city}</td>
                                <td>{coop.term}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <br/>

            {/* Employment Table */}
            <div className='degreeTypeTitle'>
                <h2>{employmentObj.employmentTable.title}</h2>
            </div>
            
            <div className='scrollable-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employer</th>
                            <th>Degree</th>
                            <th>City</th>
                            <th>Job Title</th>
                            <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentObj.employmentTable.professionalEmploymentInformation.map((job, index) => (
                            <tr key={index}>
                                <td>{job.employer}</td>
                                <td>{job.degree}</td>
                                <td>{job.city}</td>
                                <td>{job.title}</td>
                                <td>{job.startDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Employment;