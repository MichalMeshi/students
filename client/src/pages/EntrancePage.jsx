import React, { useEffect, useLayoutEffect, useState } from 'react'
import './EntrancePage.css';
import Login from '../components/Login';
import { GiBookshelf } from "react-icons/gi";
import { PiBooksThin } from "react-icons/pi";
import { CiClock1 } from "react-icons/ci";
import { PiStudentThin } from "react-icons/pi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdForum } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

import booksImage from '../images/books-removebg-preview.png';
import { Col, Row, Card, Button, Image } from 'react-bootstrap';
import Footer from '../components/Footer';

export default function EntrancePage() {
    const [expanded, setexpanded] = useState(false)
    const data = [
        {
            img: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
            name: "John Rail",
            info: "This site helped me finish my studies successfully. I feel great."
        },
        {
            img: "https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg",
            name: "Martha Hood",
            info: "This site helped me finish my studies successfully. I feel great."
        },
        {
            img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
            name: "George Rice",
            info: "This site helped me finish my studies successfully. I feel great."
        },
        {
            img: "https://cdn.pixabay.com/photo/2018/04/04/10/11/woman-3289372_1280.jpg",
            name: "Haily Ghost",
            info: "This site helped me finish my studies successfully. I feel great."
        },
        {
            img: "https://cdn.pixabay.com/photo/2016/06/11/12/15/females-1450050_1280.jpg",
            name: "Sarah Tailwind",
            info: "This site helped me finish my studies successfully. I feel great."
        },
        {
            img: "https://cdn.pixabay.com/photo/2017/08/07/14/15/woman-2604283_1280.jpg",
            name: "Lily Shine",
            info: "This site helped me finish my studies successfully. I feel great."

        }
    ]
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1
    // };
    const md_settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };
      const sm_settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };
    useEffect(() => {
        // Set 'expanded' to true after component mount
        setexpanded(true);
        console.log(expanded);
    }, []);
    return (
        <div>
            <div id="strip" className='container-fluid'>
                {/* <img src="https://cdn.pixabay.com/photo/2016/11/08/05/10/students-1807505_1280.jpg" className="img-fluid" alt="learning-people"></img> */}
                <div id="entrance-wellcome" className={`w-100  ${expanded ? 'expanded' : ''}`}>
                    <Row id="entrance-login">
                        <Col sm={12} md={6} className='wellcom-content d-flex flex-column justify-content-center align-items-center'>
                            <div className='mx-5'>
                                <h1  id="wellcome-title" className='display-1'>Welcome To Academix</h1>
                                <p id="wellcome-info">Free and universal platform for students</p>
                            </div>
                        </Col>
                        <Col id="login" sm={12} md={6} className='d-flex flex-column justify-content-center align-items-center '>
                            <div id="login-card">
                                <Login/>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
            <div className='container-fluid'>
                <div className='container p-4'>
                    <Row>
                        <Col sm={12} md={4} className='icon-card d-flex flex-column justify-content-center align-items-center'>
                            <div className='w-50 h-100'>
                                <PiBooksThin size={100} />
                                <div className='icon-info'>
                                    <h1>106</h1>
                                    <p>Courses</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={4} className='icon-card d-flex flex-column justify-content-center align-items-center'>
                            <div className='w-50 h-100' >
                                <PiStudentThin size={100} />
                                <div className='icon-info'>
                                    <h1>15,678</h1>
                                    <p>Students</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={4} className='icon-card d-flex flex-column justify-content-center align-items-center'>
                            <div className='w-50 h-100'>
                                <CiClock1 size={100} />
                                <div className='icon-info'>
                                    <h1>24</h1>
                                    <p>Hours</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='container-fluid'>
                    <div className='container'>
                        <div id="profile-slider" className='h-50  slider-md'>
                            <Slider {...md_settings}>
                                {data.map((item, index) => {
                                    return <Card style={{ width: "10rem" }} className='person-card p-3 d-flex flex-column justify-content-center align-items-center shadow p-3 mb-5 rounded text-center'>
                                        {/* <Card.Img variant="top" src={item.img} roundedCircle /> */}
                                        <Image src={item.img} roundedCircle width={100} height={100}></Image>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                            <RiDoubleQuotesL size={15}/>
                                                {item.info}
                                                <RiDoubleQuotesR size={15}/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                })}
                            </Slider>
                        </div>
                        <div id="profile-slider" className='h-50  slider-sm'>
                            <Slider {...sm_settings}>
                                {data.map((item, index) => {
                                    return <Card style={{ width: "10rem" }} className='person-card p-3 d-flex flex-column justify-content-center align-items-center shadow p-3 mb-5 rounded text-center'>
                                        {/* <Card.Img variant="top" src={item.img} roundedCircle /> */}
                                        <Image src={item.img} roundedCircle width={100} height={100}></Image>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                            <RiDoubleQuotesL size={15}/>
                                                {item.info}
                                                <RiDoubleQuotesR size={15}/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div  className='container-fluid'>
                    <div className='container text-center'>
                        <h1 className='m-5'>What we offer?</h1>
                    </div>
                </div>
                <div id="ofer-strip" className='container-fluid'>
                    <div className='container'>
                        <div id='ofer-row'>
                <Row className='justify-content-center'>
                    <Col sm={6} md={5} className=' offer-card offer-card-one text-center p-3 m-1'>
                        {/* <img src={booksImage}/> */}
                        <CiLock color='#BCDCFC' size={50} />
                        <h2>Safty first</h2>
                    </Col>
                    <Col sm={6} md={5} className='offer-card offer-card-two  text-center  p-3 m-1'>
                    <GoDatabase color='#2d3092'  size={50}/>
                        <h2>Access to a large databace</h2>
                    </Col>
                    <Col sm={6} md={5} className=' offer-card offer-card-one  text-center  p-3 m-1'>
                    <MdForum color='#BCDCFC'  size={50} />
                        <h2>Forums and cahts</h2>
                    </Col>
                    <Col sm={6} md={5} className=' offer-card offer-card-two  text-center p-3 m-1'>
                    <LiaUserFriendsSolid color='#2d3092'  size={50} />
                        <h2>Co-learning</h2>
                    </Col>
                </Row>
                </div>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
