## 🌟 Introduction
Hi, I'm Kendall Granados B. , i'm a software engineer and this my proposed solution for the chatbot challenge for Xumtech 

## Backend Project
 Backend solution developed for the Xumtech chatbot test. It implements RESTful APIs to manage chatbot functionality of respond, contextualize based on keywords,store unsolve questions and is built with TypeScript for better scalability and type safety.

 # Stack:
 * nodejs
 * expressJS
 * TypeScript
 * Swigger for docs
 * pino-http for logs
   
 ## Features
* API Design: RESTful APIs following standard practices.
* TypeScript: Strong typing and easier debugging.
* Modular Structure: Separation of concerns to enhance scalability and maintainability.
* MVC design pattern: design to allow better performance and scalability
* ![model-view-controller-mvc-pattern](https://github.com/user-attachments/assets/40727c6b-f002-4b17-9946-bf7bb77c797b)
* selected search and sort algorithms with proven efficiency in BigO notation

![BigOnotation](https://github.com/user-attachments/assets/35a92abb-1885-459d-976f-a79d402c45f1)

* non-blocking operations : allow the system to handle multiple tasks simultaneously without waiting for one task to finish. By using async functions in JavaScript/TypeScript, you enable asynchronous execution
* Normalized and indxed data base model
  
 ![image](https://github.com/user-attachments/assets/eb976403-0c72-44fb-bd7c-3dd02772b900)

 ## Frontend Project

 The frontend allows to access 2 different modal embedded views, one of them allow
 you to pick one of most common question in our systems and get and immediate answer
 , if it cannot find the literal question, it will find the best posible answer based on the keyword in your question. The other allows an admin to check the unsolved questions and add answers to those questions.

 # Stack :
 * nodeJS
 * vitejs
 * water.css classless frameWork
 * SASS CSS pre-procesor
   

## Chatbot Component

The `Chatbot` component is a React functional component that provides a simple chatbot interface. It allows users to ask questions and receive responses from a bot. The component also displays a list of the most common questions fetched from a server.

### Key Features

1. **State Management**:
   - `messages`: An array of objects representing the conversation between the user and the bot. Each object contains a `user` message and a `bot` response.
   - `mostCommonQuestions`: An array of the most common questions fetched from the server.
   - `inputRef`: A reference to the input element where the user types their question.

2. **Fetching Most Common Questions**:
   - The `useEffect` hook is used to fetch the top 5 most common questions from the server when the component mounts. The fetched questions are stored in the `mostCommonQuestions` state.

3. **Handling Common Question Click**:
   - The `handleCommonQuestionClick` function sets the input field's value to the clicked common question.

4. **Fetching Bot Response**:
   - The `getBotResponse` function sends the user's question to the server and returns the bot's response.

5. **Handling Send Question**:
   - The `handleSendQuestion` function sends the user's question to the bot and updates the `messages` state with the new message and bot response.

### Code

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { question } from '../utils/types/questionType';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [mostCommonQuestions, setMostCommonQuestions] = useState<question[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Fetch questions from the server
        fetch('http://localhost:6060/questions/top5')
            .then((res) => res.json())
            .then((data) => {
                setMostCommonQuestions(data.responseObject);
                console.log(data.responseObject);
            });
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
        console.log("----->>>", data);
        return data;
    };

    const handleSendQuestion = async (message: string) => {
        const botResponse = await getBotResponse(message);
        setMessages([...messages, { user: message, bot: botResponse.responseObject }]);
    };

    return (
        <div className='module-border-wrap'>
            <div className="centeredDiv">
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
                                <br />
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
                    if (question) {
                        handleSendQuestion(question);
                    }
                }}>Enviar</button>
            </div>
        </div>
    );
};

export default Chatbot;
 

 
 

  



