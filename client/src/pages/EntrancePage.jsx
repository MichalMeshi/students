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
import { Link } from 'react-router-dom';
import Register from '../components/Register';
import ChatbotComponent from '../components/ChatbotComponent';
import women1 from '../images/women1.jpg'
import women2 from '../images/women2.jpg'
import women3 from '../images/women3.jpg'
import women4 from '../images/women4.jpg'
import men1 from '../images/man1.jpg'
import men2 from '../images/man2.jpg'
import { GiGraduateCap } from "react-icons/gi";
export default function EntrancePage() {
    const [expanded, setexpanded] = useState(false)
    const [isLogin,setisLogin]=useState(true)
    const data = [
        {
            img: men1,
            name: "John Rail",
            info: "This site helped me finish my studies successfully. I feel great.yes!"
        },
        {
            img: women1,
            name: "Martha Hood",
            info: "Academix transformed my learning with vibrant forums and insightful course summaries"
        },
        {
            img: men2,
            name: "George Rice",
            info: "A must-have for students—Academix fuels collaborative discussions.thanks"
        },
        {
            img: women3,
            name: "Haily Ghost",
            info: "Navigating my coursework became seamless thanks to Academix's help."
        },
        {
            img: women2,
            name: "Sarah Tailwind",
            info: "Academix elevates my study game, offering a unified platform for coursework insights"
        },
        {
            img: women4,
            name: "Lily Shine",
            info: "Unleashing the power of shared knowledge—Academix revolutionizes.wow!"

        }
    ]
  
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
      const toggleIsLogin=()=>{
        setisLogin(!isLogin);
      }
    useEffect(() => {
        // Set 'expanded' to true after component mount
        setexpanded(true);
        console.log(expanded);
    }, []);
    return (
        <div>
            <ChatbotComponent/>
            <div id="strip" className='container-fluid'>
                {/* <img src="https://cdn.pixabay.com/photo/2016/11/08/05/10/students-1807505_1280.jpg" className="img-fluid" alt="learning-people"></img> */}
                <div id="entrance-wellcome" className={`w-100  ${expanded ? 'expanded' : ''}`}>
                    <Row id="entrance-login">
                        <Col sm={12} md={6} className='wellcom-content d-flex flex-column justify-content-center align-items-center'>
                            <div className=' mx-5'>
                            {/* <GiGraduateCap size={100} color='white'/> */}
                                <h1  id="wellcome-title" className='display-1 mt-3'>Wellcome <br /> To Academix</h1>
                                <p id="wellcome-info">Free and universal platform for students</p>
                            </div>
                        </Col>
                        <Col id="login" sm={12} md={6} className='d-flex flex-column justify-content-center align-items-center '>
                            <div id="login-card">
                                <Card id="toggle-card" style={{ width: "22em"}}>
                                {isLogin?<Login/>:<Register/>}
                                <Card.Text className='text-center pb-1'>
                                {isLogin&&<h6 className='bold'>Need an account ? please <a onClick={toggleIsLogin} href='#'>Register</a></h6>}
                                {!isLogin&&<h6 className='bold'>Alradey have an account ? please <a onClick={toggleIsLogin} href='#'>Log in</a></h6>}

                                </Card.Text>
                                </Card>
                                
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
                                    return <Card key={index} style={{ width: "10rem" }} className='person-card p-3 d-flex flex-column justify-content-center align-items-center shadow p-3 mb-5 rounded text-center'>
                                        {/* <Card.Img variant="top" src={item.img} roundedCircle /> */}
                                        <Image src={item.img} roundedCircle width={100} height={100}></Image>
                                        <Card.Body id='person-info'>
                                            <Card.Title id='card-t'>{item.name}</Card.Title>
                                            <Card.Text>
                                                <div id='review'>
                                            <RiDoubleQuotesL size={15}/>
                                                {item.info}
                                                <RiDoubleQuotesR size={15}/>
                                                </div>
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
