import React from 'react';
import Cards from './cards';
import './App.css';

const ChatbotRender = ({ messages, inputValue, handleInputChange, handleSendMessage, botOptionsMenu, handleOptionClick, showButtons }) => {

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>PawwyVot</h2>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "bot" ? "chat-bubble chat-left" : "chat-bubble chat-right"
            }`}
          >
            {message.content}
          </div>
        ))}
        {showButtons && messages[messages.length - 1].sender === "bot" && (
          <div className="bot-options">
            {botOptionsMenu.map((option, index) => (
              <button className="chat-bubble chat-option" key={index} 
              onClick={() => handleOptionClick(index)}>
              {option}
            </button>
            
            ))}
          </div>
        )}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit" onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></button>
      </div>
    </div>
  );
};

export default ChatbotRender;
