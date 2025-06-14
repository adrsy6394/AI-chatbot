import React, { useEffect, useRef, useState } from "react";
import { URL } from "./constant";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";
import SpeechTextInput from "./components/SpeechTextInput";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrolltoAns = useRef();
  const [loader, setLoader] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");

  const askQuestion = async () => {
    if (!question && !selectedHistory) return;

    if (question) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = [question, ...history.slice(0, 19)];
      history = [...new Set(history)].map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1).trim()
      );
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    const payloadData = question || selectedHistory;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloadData,
            },
          ],
        },
      ],
    };

    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text
      .split("* ")
      .map((item) => item.trim());

    showLineByLineAnswer(payloadData, dataString);
    setQuestion("");

    setTimeout(() => {
      scrolltoAns.current.scrollTop = scrolltoAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key === "Enter") askQuestion();
  };

  useEffect(() => {
    askQuestion();
  }, [selectedHistory]);

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const showLineByLineAnswer = (questionText, answerLines) => {
    setResult((prev) => [...prev, { type: "q", text: questionText }]);
    let index = 0;
    const interval = setInterval(() => {
      if (index < answerLines.length) {
        setResult((prev) => {
          const lastItem = prev[prev.length - 1];
          if (lastItem?.type === "a") {
            return [
              ...prev.slice(0, -1),
              { type: "a", text: [...lastItem.text, answerLines[index]] },
            ];
          } else {
            return [...prev, { type: "a", text: [answerLines[index]] }];
          }
        });
        index++;
        scrolltoAns.current.scrollTop = scrolltoAns.current.scrollHeight;
      } else {
        clearInterval(interval);
        setLoader(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen dark:bg-zinc-900 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full overflow-hidden md:px-10">
        <div className="md:col-span-1 h-full overflow-y-auto p-2 border-r border-zinc-700 ">
          <RecentSearch
            recentHistory={recentHistory}
            setRecentHistory={setRecentHistory}
            setSelectedHistory={setSelectedHistory}
          />
        </div>

        <div className="md:col-span-4 flex flex-col h-full sm:pl-48 sm:pr-12 md:px-10 ">
          <div className="p-4 text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent sm:pl-24 bg-gradient-to-r from-pink-700 to-violet-700">
              Hello User, Ask me Anything
            </h1>
          </div>

          {loader && (
            <div className="text-center">
              <svg
                className="inline w-8 h-8 animate-spin text-purple-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="opacity-25"
                />
                <path d="M93.9676 39.0409C96.393..." fill="currentFill" />
              </svg>
            </div>
          )}

          <div
            ref={scrolltoAns}
            className="flex-1 overflow-y-auto px-4 pb-32 text-zinc-800 dark:text-zinc-300"
          >
            <ul>
              {result.map((item, index) => (
                <QuestionAnswer key={index} item={item} index={index} />
              ))}
            </ul>
          </div>

          <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white dark:bg-zinc-800 border-t dark:border-zinc-700 flex flex-col sm:flex-col sm:w-screen sm:ml-40 sm:px-12 rounded-2xl items-center gap-2">
            <div className="flex-1 w-full max-w-4xl">
              <SpeechTextInput
                question={question}
                setQuestion={setQuestion}
                askQuestion={askQuestion}
              />
            </div>
            <select
              onChange={(event) => setDarkMode(event.target.value)}
              className="w-full sm:w-20 sm:mr-24 p-2 rounded-md dark:bg-zinc-700 bg-zinc-200 text-sm"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
