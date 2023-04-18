import React, { useState } from 'react';
import OpenAIComponent from './ApiGpt';
import Cards from './cards';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('Hi VOT, what can you do?');
  const [selectedInput, setSelectedInput] = useState('');
  const [saludData, setSaludData] = useState(false);
  const [botOptions, setBotOptions] = useState([false, false, false]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue) {
      setMessages((prevMessages) => [...prevMessages, { content: inputValue, sender: 'user' }]);
      setInputValue('');

      try {
        if ((botOptions[0])) {
          const response = "Ok, I will make some questions...";
          const botResponse = { content: response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          await new Promise(resolve => setTimeout(resolve, 2000));
          setSaludData(true)
        }else {
          const response = await OpenAIComponent(inputValue);
          const botResponse = { content: response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }
        
      } catch (error) {
        console.error('Error al obtener respuesta del chatbot:', error);
      }
    }
    return true
  };

  const handleOptionClick = async (option) => {
    if (option === 'Salud') {
      //Wait for the answer 
      
      

    } else if (option === 'Datos') {
      
    }
  };



  return (
    <div className="chatbot-container">
      {saludData ? (
        <Cards />
      ) : (
        <>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
          <div className="chatbot-options">
            <button
              onClick={() => {
                handleOptionClick("Salud");
                setInputValue("Quiero consultar la salud de mi mascota.");
                setBotOptions((prevBotOptions) => {
                  // Crear una copia del arreglo anterior para mantener la inmutabilidad
                  const newBotOptions = [...prevBotOptions];
                  // Actualizar el primer elemento del arreglo a true
                  newBotOptions[0] = true;
                  // Retornar el nuevo arreglo actualizado
                  return newBotOptions;
                });
              }}
            >
              Opción 1
            </button>
            <button
              onClick={() => {
                handleOptionClick("Alimentación");
                setInputValue("Quiero saber sobre la alimentación de mi mascota");
                console.log(selectedInput);
              }}
            >
              Opción 2
            </button>
            <button
              onClick={() => {
                handleOptionClick("Juguetes");
                setInputValue("Quiero información sobre los juguetes para mi mascota");
              }}
            >
              Opción 3
            </button>
          </div>
          <div className="selected-option">
            Opción seleccionada: {selectedInput}
          </div>
        </>
      )}
    </div>
);
};

export default function App(props) {
  return (
    <div>
      {/* Aquí puedes agregar otros componentes o contenido de tu aplicación */}
      <Chatbot />
    </div>
  );
}