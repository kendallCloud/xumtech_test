import React, { useState , useRef} from 'react';
import  {question}  from '../utils/types/questionType';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [questions, setQuestions] = useState<question[]>([]);
    const [mostCommonQuestions, setMostCommonQuestions] = useState<question[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
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

    const handleCommonQuestionClick = (questionText: string) => {
        if (inputRef.current) {
            inputRef.current.value = questionText;
        }
    };

    const getBotResponse = async (question: string) => {
        const response = await fetch(`http://localhost:6060/questions/answer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log("----->>>",data);
        return data;
    };

    return (
        <div className='module-border-wrap'>
          <div className = "centeredDiv" >
          <h1>Chatbot</h1>
            <h2>most common questions</h2>
                <div style={{display:'center'}}>
                    {mostCommonQuestions.map((q, index) => (
                        <div key={index}>
                            <button className='frequent-questions' onClick={() => handleCommonQuestionClick(q.question)}>{q.question}</button>
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
            <br />
            <input
                type="text"
                ref={inputRef}
                placeholder="Type your message..."
            />
            <button onClick={() => { 
                const message = inputRef.current?.value || '';
                getBotResponse(message);
            }}>Send</button>
        </div>
          </div>
        
           
    );
};

export default Chatbot;