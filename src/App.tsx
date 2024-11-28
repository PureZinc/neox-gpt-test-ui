import { useState } from "react";
import { apiLinks } from "./Data";


function InteractionArea() {
  const [inputText, setInputText] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!inputText) return;

    try {
      // Placeholder for NeoX-GPT API call
      const response = await fetch(apiLinks.neoGPT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText }),
      });
      const data = await response.json();
      setResponses([...responses, `You: ${inputText}`, `AI: ${data.response}`]);
      setInputText('');
    } catch (error) {
      console.error('Error communicating with NeoX-GPT:', error);
    }
  };

  const handleVoicePlayback = async (text: string) => {
    try {
      // Placeholder for Coqui TTS API call
      await fetch(apiLinks.coquiTTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch (error) {
      console.error('Error with voice playback:', error);
    }
  };

  return (
    <>
      <div style={styles.chat}>
        {responses.map((response, index) => (
          <div key={index} style={styles.message}>
            <p>{response}</p>
            {response.startsWith('AI:') && (
              <button onClick={() => handleVoicePlayback(response.slice(4))} style={styles.button}>
                Play Voice
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your query..."
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
      </div>
    </>
  )
}

function FeedbackForm() {
  const [feedback, setFeedback] = useState({ rating: '', comment: '' });

    const handleFeedbackSubmit = async () => {
    try {
      await fetch(apiLinks.feedback, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      setFeedback({ rating: '', comment: '' });
      alert('Feedback submitted. Thank you!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div style={styles.feedback}>
      <h3>Feedback</h3>
      <input
        type="text"
        placeholder="Rating (1-5)"
        value={feedback.rating}
        onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
        style={styles.input}
      />
      <textarea
        placeholder="Comments"
        value={feedback.comment}
        onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
        style={styles.textarea}
      />
      <button onClick={handleFeedbackSubmit} style={styles.button}>
        Submit Feedback
      </button>
    </div>
  )
}


function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>AI Prototype Tester</h1>
      </header>

      <main style={styles.main}>
        <InteractionArea/>
        <FeedbackForm/>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AI Prototype Tester. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    width: '100vw',
    backgroundColor: '#282c34',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chat: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflowY: 'auto',
  },
  message: {
    marginBottom: '1rem',
  },
  inputArea: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  feedback: {
    backgroundColor: '#fff',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  footer: {
    width: '100vw',
    backgroundColor: '#282c34',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
  },
};

export default App
