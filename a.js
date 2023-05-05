import './cards.css'
import React, { useState } from 'react';
import OpenAIComponentCards from './ApiGptCards';

const Cards = () => {
  const [apiResponse, setApiResponse] = useState("");

  const [bottonNext, setBottonNext] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState({ id: 0, symptom: "", justify: "" });
  const [showTextInput, setShowTextInput] = useState(false);
  const [showFollowUpQuestion, setShowFollowUpQuestion] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Qanswer, setQanswer] = useState("");
  const [Qvalue, setQvalue] = useState("No");
  const [questions, setQuestions] = useState([
    {
      name: "respiratyProblems",
      value: "",
      question: "Is it having Respiraty Problems?",
      yesFollowUp:[
        {
          id:0,
          symptom: "Cough",
          justify: "",
        },
        {
          id:1,
          symptom: "Wheezing",
          justify: "",
        },
        {
          id:2,
          symptom: "Sneezing",
          justify: "",
        },
        {
          id:3,
          symptom: "other",
          justify: "",
        }
      ],
    },
    {
      name: "vomitingDiarrhea",
      value: "",
      question: "Has your pet been vomiting or having diarrhea?",
      yesFollowUp:[
        {
          id:0,
          symptom: "Vomiting",
          justify: "",
        },
        {
          id:1,
          symptom: "Diarrhea",
          justify: "",
        },
      ],
    },
    {
      name: "appetiteHydration",
      value: "",
      question: "Has your pet's appetite or hydration changed?",
      yesFollowUp:[
        {
          id:0,
          symptom: "Appetite",
          justify: "",
        },
        {
          id:1,
          symptom: "Hydratation",
          justify: "",
        },
      ],
    },
    {
      name: "scratchesItchingAllergies",
      value: "",
      question: "Has your pet been scratching, or had any allergies or scratches on their skin?",
      yesFollowUp:[
        {
          id:0,
          symptom: "Scratches",
          justify: "",
        },
        {
          id:1,
          symptom: "Allergies",
          justify: "",
        },
        {
          id:2,
          symptom: "Itching",
          justify: "",
        },
      ],
    }
  ]);


  const handleNext = () => {
    setBottonNext(false);
    setQvalue("No");

    const updatedQuestions = [...questions]; // crea una copia de la lista questions
    
    if (selectedSymptom === null) {
      console.log("La variable es nula");
    } else {
      selectedSymptom.justify = Qanswer;
      updatedQuestions[currentQuestion].yesFollowUp[selectedSymptom.id].justify=selectedSymptom.justify; 
    }

    updatedQuestions[currentQuestion].value = Qvalue;
    console.log(updatedQuestions[currentQuestion].yesFollowUp[selectedSymptom.id].justify=selectedSymptom.justify)
    
    setQuestions(updatedQuestions); // actualiza el estado de questions con la copia actualizada
    setCurrentQuestion(currentQuestion + 1);
    setQanswer("");
    setSelectedSymptom({ id: 0, symptom: "", justify: "" });
    setShowFollowUpQuestion(false);
    
    console.log(selectedSymptom)
    console.log(questions)
  };

  const handleSubmit = async (e) => {
    
    const questionStrings = questions.map((question) => {
      const yesFollowUpStrings = question.yesFollowUp
        .map((followUp) => {
          if (followUp.justify) {
            return `${followUp.symptom}:${followUp.justify}`;
          } else {
            return null;
          }
        })
        .filter((followUpString) => followUpString !== null)
        .join(',');
      return `${question.question}:${question.value}(${yesFollowUpStrings})`;
    });
    const allQuestions = questionStrings.join("\n");

    console.log(allQuestions)
    e.preventDefault();
    const result = await OpenAIComponentCards(allQuestions);
    setApiResponse(result);
  };

  const handleYes = () => {
    setBottonNext(true);
    setQvalue("yes");

    const followUpQuestion = questions[currentQuestion].yesFollowUp
    setFollowUpQuestion(followUpQuestion);
    setShowFollowUpQuestion(true);
  }

  const handleSymptomClick = (symptom) => {
    setShowTextInput(true);
    setSelectedSymptom(symptom);
    setQanswer("");
  }

  const handleQanswerChange = (event) => {
    setQanswer(event.target.value);
  }

  

  return (
          
    <div className='rectangular-interface'> 
    {currentQuestion < questions.length ? (
      <>
        {showFollowUpQuestion ? (
        <>
        <h1>{followUpQuestion.question}</h1>
        <div>
          {questions[currentQuestion].yesFollowUp.map((symptom, index) => (
            <div className="btn-group" key={symptom.id}>
              <button className='button-form' key={index} onClick={() => handleSymptomClick(symptom)}>
                {symptom.symptom}
              </button>
            </div>
          ))}
          {showTextInput && (
            <>
            <h1>Justifique</h1>
            <textarea
              type="text"
              className='api-response'
              value={Qanswer}
              onChange={handleQanswerChange}
            />
            </>
          )}
        </div>
      </>
    ) : (
      <>
      
        <h1>{questions[currentQuestion].question}</h1>
        {questions[currentQuestion].value !== undefined && (
          <div>
            <button className='button-form' onClick={handleYes}>Yes</button>
            <button className='button-form' onClick={handleNext}>No</button>
              
          </div>
        )}
      </>
      )}
        
        {currentQuestion <= questions.length - 1 && (
          <>
            {bottonNext ? (
              <button className='button-form' onClick={handleNext}>Next</button>
            ) : null}
          </>
        )}
      </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <button className='button-form' type="submit">Diagnosis</button>
            </form>
            <textarea
              className="api-response"
              value={apiResponse}
              readOnly
              rows={10}
              cols={60} 
            />
          </>
        )}
      </div>


    );
};

export default Cards;
