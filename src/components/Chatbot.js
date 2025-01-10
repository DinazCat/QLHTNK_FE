import React, { useState, useEffect, useRef } from "react";
import '../views/mistyles.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Chatbot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sources, setSources] = useState({});  // Store sources for each message
  const [visibleSources, setVisibleSources] = useState(new Set());  // Track which messages show sources
  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      const { scrollHeight, clientHeight } = chatBodyRef.current;
      chatBodyRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const formatMessage = (text) => {
    // Add spacing after punctuation if missing
    text = text.replace(/([.!?])([^\s])/g, '$1 $2');
    
    // Ensure proper spacing around list markers
    text = text.replace(/([^\n])([-*])\s/g, '$1\n$2 ');
    
    // Add newlines before headings if missing
    text = text.replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2');
    
    // Ensure proper list formatting
    text = text.replace(/^[*-]\s/gm, '- ');
    text = text.replace(/^\d+\.\s/gm, '1. ');
    
    // Add newlines around code blocks
    text = text.replace(/```(\w+)?([^`]+)```/g, '\n```$1\n$2\n```\n');
    
    return text;
  };

  const toggleSources = (messageId) => {
    setVisibleSources(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const handleSend = async () => {
    if (newMessage.trim() === "" || isLoading) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      align: "right",
      type: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);
    setIsTyping(true);

    // Create bot message ID outside try block
    const botMessageId = messages.length + 2;
    let currentSources = [];
    
    try {
      // Make POST request to chat endpoint
      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: newMessage,
          k: 5
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Sorry, there was an error connecting to the server.";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: botMessageId,
          text: `Error: ${errorMessage}`,
          align: "left",
          type: "bot"
        }]);
        throw new Error(errorMessage);
      }

      // Create reader for streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let isFirstToken = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the received chunk
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        // Process each line (SSE format: "data: {...}")
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'token') {
                if (isFirstToken) {
                  // On first token, remove typing indicator and add bot message
                  setIsTyping(false);
                  setMessages(prev => [...prev, {
                    id: botMessageId,
                    text: "",
                    align: "left",
                    type: "bot"
                  }]);
                  isFirstToken = false;
                }
                
                // Accumulate text
                accumulatedText += data.content;
                // Format and update bot message
                const formattedText = formatMessage(accumulatedText);
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, text: formattedText }
                    : msg
                ));
              } else if (data.type === 'sources') {
                // Store sources for this message
                currentSources = data.content;
                setSources(prev => ({
                  ...prev,
                  [botMessageId]: data.content
                }));
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: botMessageId,
        text: "Sorry, there was an error connecting to the server.",
        align: "left",
        type: "bot"
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 1000 }}>
      {!isChatbotVisible && (
        <button 
          className="circle-button"
          onClick={toggleChatbot}
          aria-label="Open chat"
        >
          <img src="/images/bot.png" alt="Chat bot" />
        </button>
      )}
      
      {isChatbotVisible && (
        <div className="chat-container" style={{ position: 'absolute', bottom: '100px', right: '30px' }}>
          <div className="chat-box">
            <div className="chat-header">
              <h3>Dental Assistant</h3>
              <div className="chat-tools">
                <button className="btn btn-tool" onClick={toggleChatbot}>
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            
            <div className="chat-body" ref={chatBodyRef}>
              <div className="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-message ${message.align === "right" ? "right" : ""}`}
                  >
                    {message.align === "right" ? (
                      <div className="chat-text">{message.text}</div>
                    ) : (
                      <>
                        <img
                          className="chat-img"
                          src="/images/bot.png"
                          alt="bot"
                        />
                        <div className="chat-content">
                          <div className="chat-text markdown-content">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({node, ...props}) => <p style={{margin: '0 0 8px 0'}} {...props} />,
                                ul: ({node, ...props}) => <ul style={{margin: '8px 0', paddingLeft: '20px'}} {...props} />,
                                ol: ({node, ...props}) => <ol style={{margin: '8px 0', paddingLeft: '20px'}} {...props} />,
                                li: ({node, ...props}) => <li style={{margin: '4px 0'}} {...props} />,
                                h1: ({node, ...props}) => <h1 style={{margin: '16px 0 8px 0', fontSize: '1.5em'}} {...props} />,
                                h2: ({node, ...props}) => <h2 style={{margin: '14px 0 8px 0', fontSize: '1.3em'}} {...props} />,
                                h3: ({node, ...props}) => <h3 style={{margin: '12px 0 8px 0', fontSize: '1.1em'}} {...props} />,
                                code: ({node, inline, ...props}) => (
                                  inline 
                                    ? <code style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        padding: '2px 4px',
                                        borderRadius: '4px',
                                        fontSize: '0.9em'
                                      }} {...props} />
                                    : <code style={{
                                        display: 'block',
                                        background: 'rgba(255,255,255,0.1)',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        margin: '8px 0',
                                        whiteSpace: 'pre-wrap',
                                        fontSize: '0.9em'
                                      }} {...props} />
                                ),
                                pre: ({node, ...props}) => <pre style={{margin: '8px 0'}} {...props} />,
                                strong: ({node, ...props}) => <strong style={{fontWeight: '600'}} {...props} />,
                                em: ({node, ...props}) => <em style={{fontStyle: 'italic'}} {...props} />,
                                blockquote: ({node, ...props}) => (
                                  <blockquote style={{
                                    borderLeft: '3px solid rgba(255,255,255,0.3)',
                                    margin: '8px 0',
                                    paddingLeft: '12px',
                                    fontStyle: 'italic'
                                  }} {...props} />
                                )
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          </div>
                          {sources[message.id] && (
                            <div className="chat-actions">
                              <button 
                                className="source-button"
                                onClick={() => toggleSources(message.id)}
                              >
                                {visibleSources.has(message.id) ? 'Hide Sources' : 'Show Sources'}
                              </button>
                              {visibleSources.has(message.id) && (
                                <div className="sources-list">
                                  {sources[message.id].map((source, index) => (
                                    <a 
                                      key={index}
                                      href={source.source}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="source-link"
                                    >
                                      {new URL(source.source).pathname}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-message">
                    <img
                      className="chat-img"
                      src="/images/bot.png"
                      alt="bot"
                    />
                    <div className="chat-text">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="chat-footer">
              <div className="input-group">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !newMessage.trim()}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
