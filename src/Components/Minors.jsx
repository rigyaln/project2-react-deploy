import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import getData from '../assets/utils/getData';

const Minors = () => {
    const [loaded, setLoaded] = useState(false);
    const [minorsObj, setMinorsObj] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedMinor, setSelectedMinor] = useState(null);
    const [courseDetails, setCourseDetails] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);

    useEffect(() => {
        getData('minors/')
            .then((json) => {
                console.log('minors data: ', json);
                setMinorsObj(json);
                setLoaded(true);
            })
    }, []);

    // using async function to fetch course details
    // to catch up on multiple requests for courses
    // instead of .then to aovoid lots of nesting callbacks. used ai to help with this one
    const fetchCourseDetails = async (courses) => {
        setLoadingCourses(true);
        const details = [];
        
        for (let courseID of courses) {
            try {
                const courseData = await getData(`course/courseID=${courseID}`);
                details.push(courseData);
            } catch (error) {
                console.error(`Error fetching course ${courseID}:`, error);
            }
        }
        
        setCourseDetails(details);
        setLoadingCourses(false);
    };

    const handleShowModal = (minor) => {
        setSelectedMinor(minor);
        setShowModal(true);
        fetchCourseDetails(minor.courses);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMinor(null);
        setCourseDetails([]);
    };

    if (!loaded) return <h1>Loading Minors...</h1>;

    return (
        <div className='Minors'>
            <div className='degreeTypeTitle'><h2>Undergraduate Minors</h2></div>
            
            {/* Accordion for minors */}
            <Accordion>
                {minorsObj.UgMinors.map((minor, index) => (
                    <Accordion.Item eventKey={index.toString()} key={minor.name}>
                        <Accordion.Header>{minor.title}</Accordion.Header>
                        <Accordion.Body>
                            <p>{minor.description}</p>
                            <Button 
                                variant="primary" 
                                onClick={() => handleShowModal(minor)}
                                className='minorButton' 
                            >
                                View Courses
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {/* Modal with Carousel on inside*/}
            <Modal show={showModal} onHide={handleCloseModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMinor?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMinor && (
                        <>
                            <p><strong>Description:</strong> {selectedMinor.description}</p>
                            
                            <h5>Courses:</h5>
                            {loadingCourses ? (
                                <p>Loading course details...</p>
                            ) : (
                                <Carousel interval={null}>
                                    {courseDetails.map((course, index) => (
                                        <Carousel.Item key={index}>
                                            <div style={{ 
                                                padding: '40px', 
                                                backgroundColor: '#f8f9fa',
                                                minHeight: '300px',
                                                borderRadius: '10px'
                                            }}>
                                                <h4>{course.courseID}: {course.title}</h4>
                                                <p>{course.description}</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Minors;