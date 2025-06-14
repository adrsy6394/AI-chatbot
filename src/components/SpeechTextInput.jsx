import React, { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function SpeechTextInput({ question, setQuestion, askQuestion }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const timerRef = useRef(null);

  useEffect(() => {
    setQuestion(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>🎤 Speech Recognition not supported in this browser</p>;
  }

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    timerRef.current = setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 10000);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    clearTimeout(timerRef.current);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") askQuestion();
  };

  return (
    <div className="flex h-11 w-screen pr-8 items-center gap-2 p-2 xs:flex-row  sm:flex-row  md:w-auto
    lg:w-auto">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-3 rounded-xl bg-transparent border dark:border-zinc-600 border-zinc-400
                   dark:text-white text-zinc-900 placeholder:text-zinc-400 outline-none 
                   xs:w-auto sm:w-auto
                  lg:w-auto
                   text-sm
                     sm:text-base"
        placeholder="Type or speak your question..."
      />

      <div className="flex gap-2 justify-center xs:w-full  sm:mr-44">
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          className={`p-3 rounded-full transition-all duration-200 
            ${
              listening
                ? "bg-green-500 animate-pulse"
                : "dark:bg-zinc-700 bg-red-300"
            } 
            text-white`}
          title="Hold to speak"
        >
          🎤
        </button>

        <button
          onClick={askQuestion}
          className="p-3 rounded-full dark:bg-zinc-700 bg-red-300 dark:text-white text-black"
          title="Click to ask"
        >
          Ask
        </button>
      </div>
    </div>
  );
}

export default SpeechTextInput;
