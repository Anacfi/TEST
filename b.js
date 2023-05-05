import React, { useEffect, useState } from 'react';
import OpenAIComponent from './ApiGpt';
import Cards from './cards';
import $ from 'jquery';
import './App.css'

import ChatbotRender from './ChatVotRender';

const Chatbot = () => {


  const [messages, setMessages] = useState([{
    content: "Hi there!",
    sender: "bot"
  },
  {
    content: "Hi there! I'm VOT, your friendly polyglot veterinarian. I'm here to answer any questions you may have about veterinary health. Please select a pet to start",
    sender: "bot"
  }
  ]); // Estado para almacenar los mensajes del chatbot
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input de mensaje del usuario
  const [selectedInput, setSelectedInput] = useState(''); // Estado para almacenar la opción seleccionada por el usuario
  const [saludData, setSaludData] = useState(false); // Estado para determinar si se muestran los datos de salud o no
  const [botOptions, setBotOptions] = useState([false, false, false]); // Estado para almacenar las opciones seleccionadas por el bot
  const [botOptionsMenu, setBotOptionsMenu] = useState(["Pet Healt", "Pet Nutrition", "Pet Entertainment"]);
  const [showButtons, setShowButtons] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Maneja el cambio en el input de mensaje del usuario
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (selectedIndex >= 0) {
      handleSendMessage();
      console.log(inputValue);
      console.log(selectedIndex);
      console.log(botOptions);
      setSelectedIndex(-1);
      setBotOptions((prevBotOptions) => {
        // Crear una copia del arreglo anterior para mantener la inmutabilidad
        const newBotOptions = [...prevBotOptions];
        // Actualizar el primer elemento del arreglo a true
        newBotOptions[0] = false;
        // Retornar el nuevo arreglo actualizado
        return newBotOptions;
      });
    }
  }, [selectedIndex]);

  // Maneja el envío de un mensaje del usuario
  const handleSendMessage = async () => {
    if (inputValue) {
      // Agrega el mensaje del usuario al estado de mensajes
      setMessages((prevMessages) => [...prevMessages, { content: inputValue, sender: 'user' }]);
      setInputValue(''); // Limpia el valor del input de mensaje del usuario
  
      try {
        if (botOptions[0]) {
          // Si la primera opción del bot está seleccionada, muestra un mensaje de respuesta y espera 2 segundos antes de mostrar los datos de salud
          const response = 'Ok, I will make some questions...';
          const botResponse = { content: response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setSaludData(true); // Muestra los datos de salud
          
        } else {
          // Si no, utiliza el componente OpenAIComponent para obtener una respuesta del bot y agrega la respuesta al estado de mensajes
          const response = await OpenAIComponent(inputValue);
          const botResponse = { content: response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }
  
        $('.chat-body').animate({ scrollTop: $('.chat-body').prop('scrollHeight') }, 500);
  
      } catch (error) {
        console.error('Error al obtener respuesta del chatbot:', error);
      }
    }
    return true;
  };
  // Maneja el click en una opción del bot
  const handleOptionClick = async (index) => {
    if (index === 0) {
      setInputValue("Quiero consultar la salud de mi mascota.");
      setBotOptions((prevBotOptions) => {
        // Crear una copia del arreglo anterior para mantener la inmutabilidad
        const newBotOptions = [...prevBotOptions];
        // Actualizar el elemento correspondiente del arreglo a true
        newBotOptions[index] = true;
        // Retornar el nuevo arreglo actualizado
        return newBotOptions;
      });
    } else if (index === 1) {
      setInputValue("Quiero saber de nutricion para mi mascota.");
      // Haz algo con la opción Datos
    }
    setSelectedIndex(index);
  };

  return (
    <ChatbotRender
      messages={messages}
      inputValue={inputValue}
      handleInputChange={handleInputChange}
      handleSendMessage={handleSendMessage}
      botOptionsMenu={botOptionsMenu}
      handleOptionClick={handleOptionClick}
      showButtons={true}
    />
  );
}

export default Chatbot;
