import React, { useState , useRef, useEffect} from 'react';
import  {question}  from '../utils/types/questionType';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [mostCommonQuestions, setMostCommonQuestions] = useState<question[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('http://localhost:6060/questions/top5');
                const data = await res.json();
                setMostCommonQuestions(data.responseObject);
                console.log(data.responseObject);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

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

    const handleSendQuestion = async (message: string) => {
        const botResponse = await getBotResponse(message);
        setMessages([...messages, { user: message, bot: botResponse.responseObject }]);
    };

    return (
        <div className='module-border-wrap'>
          <div className = "centeredDiv" >
          <h1>Chatbot</h1>
                <div className='frequent-questions-container'>
                    {mostCommonQuestions.map((q, index) => (
                        <div key={index}>
                            <button className='frequent-questions' onClick={() => handleCommonQuestionClick(q.question)}>{q.question}</button>
                        </div>
                    ))}
                </div> 
            <div>
                <div className='chatContainer'>
                    {messages.map((msg, index) => (
                        <div key={index} className='bubbleContainer'>
                            <div className='bubbleUser'>{msg.user}</div>
                            <br/>
                            <div className='bubbleBot'>{msg.bot}</div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <input
                type="text"
                ref={inputRef}
            />
            <button onClick={() => { 
                const question = inputRef.current?.value || '';

                handleSendQuestion(question);
                !question || question==='' &&  getBotResponse(question);
            }}>Enviar</button>
        </div>
          </div>
        
           
    );
};

export default Chatbot;