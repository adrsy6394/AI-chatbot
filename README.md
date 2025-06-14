# 🧠 AI-Powered QnA Web App (React.js)

This project is a **React-based frontend web application** that provides an interactive **Question & Answer** experience using **speech-to-text**, **Markdown rendering**, and **Generative AI** (Google Gemini 2.0 Flash).  
It includes features like recent search history, code highlighting, mobile-responsive UI, and AI-powered answer generation.

---

## 📦 Tech Stack

| Area     | Technologies Used                        |
| -------- | ---------------------------------------- |
| Frontend | React.js, Tailwind CSS, JavaScript       |
| Speech   | react-speech-recognition                 |
| Markdown | react-markdown, react-syntax-highlighter |
| AI Model | Google Gemini API (via REST endpoint)    |
| Storage  | LocalStorage (for recent search history) |

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── SpeechTextInput.jsx
│   ├── RecentSearch.jsx
│   ├── QuestionAnswer.jsx
│   ├── Answers.jsx
│   └── helper.js
├── constant.js
├── App.jsx
└── README.md
```

---

## 🗣️ `SpeechTextInput.jsx` – Speech Recognition Input Box

Provides a **text input** and **microphone button** for users to either type or speak questions.  
Automatically stops listening after `10 seconds` of speech input.

### 🔹 Features:

- Voice input via `react-speech-recognition`
- Automatic stop after 10 seconds
- Microphone animation on active listening
- "Ask" button to trigger AI question submission

---

## 🕘 `RecentSearch.jsx` – Sidebar History Panel

Displays a **list of recent searches** from localStorage.  
Includes toggling sidebar for mobile responsiveness and **individual + all clear** options.

### 🔹 Features:

- Toggle button for mobile screens
- Delete single history item or all
- Sidebar is responsive (`sm`, `md`, `lg` views)
- Items saved using `localStorage`

---

## 📥 `QuestionAnswer.jsx` – QnA Renderer

Renders **user questions** and **AI-generated answers**.  
Applies different styles depending on `question` or `answer` type.

### 🔹 Features:

- Distinguishes between questions (`type === "q"`) and answers
- Maps through multiple answers (if array)
- Dynamic style rendering for better UX

---

## 📘 `Answers.jsx` – Markdown + Code Renderer

Responsible for formatting and rendering answers using:

- Markdown (with `react-markdown`)
- Code blocks (highlighted via `react-syntax-highlighter`)
- Heading detection and replacement logic

### 🔹 Features:

- Detects and formats headings (`**heading**`)
- Code block highlighting with dark theme
- Supports multi-line content with Markdown

---

## 🧠 `helper.js` – Utility Functions

Provides two core string helper functions:

| Function                | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `chackHeading(str)`     | Detects if a string is a Markdown heading (`**`) |
| `replaceHeadingStars()` | Removes `**` from start/end of a heading         |

---

## 🌐 `constant.js` – Gemini API Endpoint

Stores the **Google Gemini API endpoint** with your API key to send POST requests.

```js
export const URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY";
```



---

## 🧪 How to Run the App

### ✅ Prerequisites

- Node.js ≥ 14
- npm or yarn
- Internet connection for speech recognition and AI

### 🔧 Installation

```bash
git clone https://github.com/your-repo/ai-qna-react.git
cd ai-qna-react
npm install
```

### 🚀 Start the App

```bash
npm start
```

The app will open on: [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

| Feature Name               | Screenshot Description             |
| -------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Speech Input + Mic**     | ![Mic](./assets/mic.png)           | Allows users to input text via voice using the browser's Speech Recognition API. Includes a microphone icon that visually pulses when listening and auto-stops after 10 seconds.         |
| **Responsive Sidebar**     | ![Sidebar](./assets/sidebar.png)   | A toggleable, responsive sidebar displaying recent search history. Includes clear-all and individual-delete options. Automatically adjusts layout on smaller screens using Tailwind CSS. |
| **Markdown + Code Answer** | ![Markdown](./assets/markdown.png) | Renders bot responses using Markdown syntax. Supports code blocks with syntax highlighting using `react-syntax-highlighter`. Headings are detected and styled conditionally.             |

---

## 🛠️ To Do (Optional Improvements)

- Add backend (Node.js/Express) to store history securely
- Use `dotenv` for API key management
- Add dark/light theme toggle
- Add loading animation on answer fetch

---

## 👨‍💻 Author

**Adarsh Yadav**  
BCA Student, ITM College of Management, GIDA, Gorakhpur  
📫 [LinkedIn](https://www.linkedin.com/in/adarsh-yadav) | 📧 `adarsh@example.com`

---

## 📄 License

This project is open-source and free to use under the [MIT License](./LICENSE).
