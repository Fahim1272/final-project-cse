import React, { useState } from 'react'
import '../../../node_modules/@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import NavBar from '../navbar/Navbar';
const API_KEY = "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";
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
  }
  
export default function Chatbot() {
    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm BongoMela! Ask me anything about Bangladeshi Culture!!",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleSend = async (message) => {
        const newMessage = {
          message,
          direction: 'outgoing',
          sender: "user"
        };
    
        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);
    
        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat
    
        let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message}
        });
    
    
        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,  // The system message DEFINES the logic of our chatGPT
            ...apiMessages // The messages from our chat with ChatGPT
          ]
        }
    
        await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data);
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        }).catch((error) => {
            console.error('Error while processing the message:', error);
            // Handle the error, e.g., display an error message to the user
          });
      }
   
  return (
    <>
    <NavBar></NavBar>
    <h2 className='mt-5 pt-10  text-3xl  text-center'>BongoMela Chatbot</h2>
    <div className='ms-[500px]  '  style={{ position:"relative", height: "500px", width: "600px"  }}>
    
    <MainContainer className='mt-10'>
      <ChatContainer>       
        <MessageList 
          scrollBehavior="smooth" 
          typingIndicator={isTyping ? <TypingIndicator content="BongoMela is typing" /> : null}
        >
          {messages.map((message, i) => {
            console.log(message)
            return <Message key={i} model={message} />
          })}
        </MessageList>
        <MessageInput placeholder="Type message here" onSend={handleSend} />        
      </ChatContainer>
    </MainContainer>
  </div>
  </>
  )
}

