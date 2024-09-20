import React, { useState } from 'react';
import  {question}  from '../utils/types/questionType';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [input, setInput] = useState('')
    const [questions, setQuestions] = useState<question[]>([]);
    const [mostCommonQuestions, setMostCommonQuestions] = useState<question[]>([]);
    
    const [currentQuestion, setCurrentQuestion] = useState<question | null>(null)

    useState(() => {
        // Fetch questions from the server
        fetch('http://localhost:6060/questions/top5')
            .then((res) => res.json())
            .then((data) => {
                setMostCommonQuestions(data.responseObject);
                console.log(data.responseObject);

            });
    }
    ,);

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = input;
        const botResponse = getBotResponse(userMessage);

        setMessages([...messages, { user: userMessage, bot: botResponse }]);
        setInput('');
    };

    const getBotResponse = (message: string): string => {
        switch (message.toLowerCase()) {
            case 'hello':
                return 'Hi there! How can I help you today?';
            case 'how are you?':
                return 'I am just a bot, but I am here to help you!';
            case 'what is your name?':
                return 'I am your friendly chatbot!';
            default:
                return 'Sorry, I did not understand that.';
        }
    };

    return (
        <div className='module-border-wrap'>
          <div className = "centeredDiv" >
          <h1>Chatbot</h1>
            <h2>most common questions</h2>
                <div style={{display:'center'}}>
                    {mostCommonQuestions.map((question, index) => (
                        <div key={index}>
                            <button className='frequent-questions'>{question.question}</button>
                        </div>
                    ))}
                </div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>You:</strong> {msg.user}</p>
                        <p><strong>Bot:</strong> {msg.bot}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
          </div>
        
           
    );
};

export default Chatbot;