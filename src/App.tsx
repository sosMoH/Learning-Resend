import { useState } from 'react';

function App() {
  const [status, setStatus] = useState('');

  const handleSendEmail = async () => {
    setStatus('Sending...');
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Replace with your actual email address to test
          userEmail: 'mohislamedu@gmail.com', 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus('Email sent successfully! Check your inbox.');
        console.log(data);
      } else {
        setStatus(`Failed to send: ${data.error}`);
        console.error(data);
      }
    } catch (error) {
      setStatus('An error occurred.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Test Resend API</h1>
        
        <button 
          onClick={handleSendEmail}
          className="bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
        >
          Send Apple Receipt Email
        </button>
        
        {status && (
          <p className="mt-4 text-sm font-medium text-gray-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;