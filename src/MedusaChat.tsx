
import React, { useState } from 'react';
const API_URL = 'https://api.openai.com/v1/chat/completions';

const MedusaChat: React.FC = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        }),
      });
      const data = await response.json();
      const botMessage = data.choices?.[0]?.message;
      if (botMessage) {
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to fetch response.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white subtle-pattern flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto card shadow-xl p-8 mt-12 mb-12">
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">MedusaChat</h2>
        <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg border border-primary-100 p-4 mb-6">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-24">Start the conversation with Medusa!</div>
          )}
          {messages.map((msg: {role: string, content: string}, idx: number) => (
            <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}> 
              <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white border border-primary-100 text-primary-700'}`}
                   style={{ wordBreak: 'break-word' }}>
                <span className="font-semibold mr-2">{msg.role === 'user' ? 'You' : 'Medusa'}:</span> {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-400 text-center">Medusa is typing...</div>}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-primary-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            className="btn-primary px-6 py-2"
            onClick={sendMessage}
            disabled={loading}
          >Send</button>
        </div>
      </div>
    </div>
  );
};

export default MedusaChat;
