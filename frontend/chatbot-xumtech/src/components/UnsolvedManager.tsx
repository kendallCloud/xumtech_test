import React, { useState, useEffect, useRef } from 'react';
import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2';

const UnsolvedManager: React.FC = () => {
  
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string>('');
    const [unsolvedQuestions, setUnsolvedQuestions] = useState<string[]>([]);

    const baseUrl = 'http://localhost:6060/questions';
    useEffect(() => {
        fetchUnsolvedQuestions();
    }, []);

    const fetchUnsolvedQuestions = async () => {
        const response = await fetch(baseUrl+'/unsolved/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setUnsolvedQuestions(data.responseObject);
    };

    const handleQuestionClick = (question: string) => {
        setSelectedQuestion(question);
    };

    const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value);
    };

    const handleSubmitAnswer = async () => {
        if (selectedQuestion) {
            try {
                const response = await fetch(baseUrl+'/newAnswer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: selectedQuestion,
                        answer,
                    }),
                });
                setAnswer('');
                setSelectedQuestion(null);
                console.log("intento de post answer",response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                Swal.fire({
                    title: 'Answer submitted',
                    icon: 'success',
                });
                
            } catch (error) {
                console.error('Error submitting answer:', error);
            }
        }
    };

    return (
        <div>
            <h1>Unsolved Questions</h1>
            <ul>
                {unsolvedQuestions.map((question) => (
                    <button key={question} onClick={() => handleQuestionClick(question)} >
                        {question}
                    </button>
                ))}
            </ul>
            <p>current selected question: {selectedQuestion}</p>
            {selectedQuestion && (
                <div>
                    <h2>Answer Question</h2>
                    <p>{selectedQuestion}</p>
                    <textarea value={answer} onChange={handleAnswerChange} />
                    <button onClick={handleSubmitAnswer}>Guardar pregunta</button>
                </div>
            )}
        </div>
    );
};

export default UnsolvedManager;