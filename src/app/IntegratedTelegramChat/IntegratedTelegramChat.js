import { useEffect, useState } from "react";

const InAppTelegramChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Here you would typically set up a WebSocket connection or polling mechanism
    // to receive messages from your backend that interfaces with the Telegram API
    const fetchMessages = async () => {
      // Placeholder for API call to fetch messages
      // const response = await fetch('/api/messages');
      // const data = await response.json();
      // setMessages(data);
    };

    fetchMessages();
    // Set up polling or WebSocket listener here
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Here you would typically send the message to your backend
    // which would then use the Telegram Bot API to send the message
    // const response = await fetch('/api/send-message', {
    //   method: 'POST',
    //   body: JSON.stringify({ message: inputMessage }),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // For now, we'll just add the message to the local state
    setMessages([...messages, { text: inputMessage, sender: "user" }]);
    setInputMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 rounded-full shadow-lg transition-all duration-300"
        >
          {/* <MessageCircle size={24} /> */}
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h3 className="font-bold">Support Chat</h3>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-100" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg transition-colors duration-300"
              >
                {/* <Send size={20} /> */}
                <div>Send</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InAppTelegramChat;
