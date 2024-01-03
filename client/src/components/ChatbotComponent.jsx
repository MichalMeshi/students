import React from 'react'
import ChatBot from 'react-simple-chatbot'
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
                    trigger: '6'
                },
                {
                    id: '6',
                    user: true,
                    trigger: '7'
                },
                {
                    id: '7',
                    message: 'Here are some features you might be interested in:',
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
                    message: 'Ok, good luck:)',
                    end: true
                },
                {
                    id: '10',
                    message: 'You can share and access summaries for various subjects. Visit the summaries section to get started.',
                    end: true
                },
                {
                    id: '11',
                    message: 'Search for learning resources by location to find study groups, libraries, or other educational events near you.',
                    end: true
                },
                {
                    id: '12',
                    message: 'Explore tutoring services where you can find tutors or offer your services to other students.',
                    end: true
                },
                {
                    id: '13',
                    message: 'Engage in course forums to discuss topics, ask questions, and collaborate with fellow students.',
                    end: true
                },
                {
                    id: '14',
                    message: 'The private area allows you to manage your profile, view preferred courses, and access personalized content.',
                    end: true
                }
            ]}
        />
    )
}

export default ChatbotComponent