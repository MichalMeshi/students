import React from 'react'
import ChatBot from 'react-simple-chatbot'
import Home from '../pages'
import { Link } from 'react-router-dom'
const ChatbotComponent = () => {
    return (
        <ChatBot
            floating='true'
            bubbleStyle={{
                backgroundColor: 'black',       // Set the background color of the chat bubble to black
                color: 'white',                 // Set the text color to white for better visibility
                borderRadius: '15px',           // Add rounded corners to the chat bubble
                boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.2)' // Add a subtle shadow for depth
            }}
            bubbleOptionStyle={{
                backgroundColor: 'black',       // Set the background color of the options bubble to black
                color: 'white',                 // Set the text color to white for better visibility
                borderRadius: '15px',           // Add rounded corners to the options bubble
                boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.2)' // Add a subtle shadow for depth
            }}
            floatingStyle={{
                backgroundColor: 'black',
            }}
            userAvatar="https://images.pexels.com/photos/19384215/pexels-photo-19384215/free-photo-of-en-el-paraiso-frio.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            steps={[
                {
                    id: '1',
                    message: 'Hi, do you need help?',
                    trigger: '2',
                },
                {
                    id: '2',
                    options: [
                        { value: 1, label: 'Yes', trigger: '3' },
                        { value: 2, label: 'No', trigger: '9' },
                    ],
                },
                {
                    id: '3',
                    message: 'What is your name?',
                    trigger: '4'
                },
                {
                    id: '4',
                    user: true,
                    trigger: '5'
                },
                {
                    id: '5',
                    message: 'Hi {previousValue}, In which subject do you need help?',
                    trigger: '8'
                },
                {
                    id: '8',
                    options: [
                        { value: 1, label: 'Share summaries', trigger: '10' },
                        { value: 2, label: 'Find learning resources by location', trigger: '11' },
                        { value: 3, label: 'Tutoring services', trigger: '12' },
                        { value: 4, label: 'Course forums', trigger: '13' },
                        { value: 5, label: 'Private area', trigger: '14' }
                    ],
                },
                {
                    id: '9',
                    message: 'Ok, good luck :)',
                    trigger: "15",
                    end: true
                },
                {
                    id: '10',
                    message: 'You can share and access summaries for various subjects. Visit the summaries section to get started.',
                    
                    trigger: "15"
                },
                {
                    id: '11',
                    message: 'Search for learning resources by location to find study groups, libraries, or other educational events near you.',
                    
                    trigger: "15"
                },
                {
                    id: '12',
                    message: 'Explore tutoring services where you can find tutors or offer your services to other students.',
                    
                    trigger: "15"
                },
                {
                    id: '13',
                    message: 'Engage in course forums to discuss topics, ask questions, and collaborate with fellow students.',
                    
                    trigger: "15"
                },
                {
                    id: '14',
                    message: 'The private area allows you to manage your profile, view preferred courses, and access personalized content.',
                    
                    trigger: "15"
                },
                // {
                //     id:'15',
                //     message:'Is there anything else I can help you?',
                //     options: [
                //         { value: 1, label: 'Yes', trigger: '8' },
                //         { value: 2, label: 'No', trigger: '9' },
                //     ]
                // },
                {
                    id: '15',
                    message: 'Did I help you?',
                    trigger: 'helpResponse',
                },
                {
                    id: 'helpResponse',
                    options: [
                        { value: 1, label: 'Yes', trigger: '16' },
                        { value: 2, label: 'No', trigger: '17' },
                    ],
                },
                {
                    id: '16',
                    message: 'Is there anything else I can help you with?',
                    trigger: 'helpResponse',
                },
                
                {
                    id: '17',
                    component: (
                      <div>
                        <p>Click the link to go to a specific page:</p>
                        <Link to="/home">Go to Home</Link>
                      </div>
                    ),
                    end: true,
                  },

            ]}
        />
    )
}

export default ChatbotComponent