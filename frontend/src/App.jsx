import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import EmotionForm from "./components/1_EmotionForm";
import EmotionResult from "./components/2_EmotionResult";
import EmotionList from "./components/3_EmotionList";
import Examples from "./components/4_Examples";
import Navbar from "./components/Navbar";
import About from "./components/About";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export default function App() {
  const [result, setResult] = useState(null);

  const handlePredict = async (text) => {
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        throw new Error(`Prediction failed: ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* NAVBAR ALWAYS ON TOP */}
      <Navbar />

      <main className="p-8 mx-auto">
                   <h1 className="text-2xl text-center md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                        Emotion Detection from Text
                    </h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <EmotionForm onPredict={handlePredict} />
                <EmotionResult result={result} />
                {/* <EmotionList /> */}
              </>
            }
          />

          <Route path="/examples" element={<Examples />} />
          <Route path="/emotions" element={<EmotionList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}
