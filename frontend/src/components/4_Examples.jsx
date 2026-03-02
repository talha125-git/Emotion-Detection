// EmotionSentences.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardIcon,
  CheckIcon,
  ArrowLeftIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const emotions = [
  { emoji: "😐", name: "neutral", sentence: "Today is just another normal day." },
  { emoji: "😟", name: "worry", sentence: "I hope everything goes well with my exams." },
  { emoji: "😊", name: "happiness", sentence: "I'm so glad we won the match!" },
  { emoji: "😢", name: "sadness", sentence: "I miss my best friend who moved away." },
  { emoji: "❤️", name: "love", sentence: "I love spending time with my family." },
  { emoji: "😲", name: "surprise", sentence: "Wow! I didn't expect that at all!" },
  { emoji: "😄", name: "fun", sentence: "This party is amazing, I'm having a great time!" },
  { emoji: "😌", name: "relief", sentence: "I finally finished all my assignments." },
  { emoji: "💔", name: "hate", sentence: "I really hate being stuck in traffic." },
  { emoji: "😶", name: "empty", sentence: "I don't react to anything anymore it all feels blank." },
  { emoji: "🤩", name: "enthusiasm", sentence: "This trip is going to be incredible, I am counting down the days." },
  { emoji: "😒", name: "boredom", sentence: "Everything feels slow and uninteresting today." },
  { emoji: "😡", name: "anger", sentence: "I am furious about what happened yesterday!" },
];

export default function EmotionSentences() {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const getEmotionColor = (emotionName) => {
    const colorMap = {
      neutral: "border-l-4 border-gray-400",
      worry: "border-l-4 border-amber-400",
      happiness: "border-l-4 border-yellow-400",
      sadness: "border-l-4 border-blue-400",
      love: "border-l-4 border-pink-400",
      surprise: "border-l-4 border-orange-400",
      fun: "border-l-4 border-green-400",
      relief: "border-l-4 border-emerald-400",
      hate: "border-l-4 border-rose-400",
      empty: "border-l-4 border-slate-400",
      enthusiasm: "border-l-4 border-purple-400",
      boredom: "border-l-4 border-stone-400",
      anger: "border-l-4 border-red-500",
    };
    return colorMap[emotionName] || "border-l-4 border-gray-400";
  };

  const getEmotionTextColor = (emotionName) => {
    const colorMap = {
      neutral: "text-gray-700",
      worry: "text-amber-700",
      happiness: "text-yellow-700",
      sadness: "text-blue-700",
      love: "text-pink-700",
      surprise: "text-orange-700",
      fun: "text-green-700",
      relief: "text-emerald-700",
      hate: "text-rose-700",
      empty: "text-slate-700",
      enthusiasm: "text-purple-700",
      boredom: "text-stone-700",
      anger: "text-red-700",
    };
    return colorMap[emotionName] || "text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">


          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
              Emotion Examples
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse through emotion examples. Click any example to copy it for testing.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="font-semibold text-gray-800">{emotions.length}</span>
              <span className="text-gray-600 ml-2">Emotion Types</span>
            </div>
            {/* <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="font-semibold text-purple-600">Click to Copy</span>
              <span className="text-gray-600 ml-2">Any Example</span>
            </div> */}
          </div>
        </div>

        {/* Two Column List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200/50 ${getEmotionColor(emotion.name)}`}
            >
              <div className="p-2">
                {/* Emotion Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{emotion.emoji}</span>
                    <span className={`font-bold text-lg capitalize ${getEmotionTextColor(emotion.name)}`}>
                      {emotion.name}
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(emotion.sentence, index)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
                      ${copiedIndex === index
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 hover:from-purple-100 hover:to-blue-100'
                      }`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Sentence */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-gray-700 italic">
                    "{emotion.sentence}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>




        {/* Footer */}
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <button
            onClick={() => navigate("/")}
            className="mb-6 bottom-0 left-0 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5  text-blue-600" />

          </button>
          <div>
            <p>Emotion Detection System • Software Verification & Validation Lab BSSE-Sec-A</p>
            <p className="mt-1">Examples for testing and validation purposes</p>
          </div>
        </footer>
      </div>

    </div>
  );
}