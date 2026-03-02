// 2_EmotionResult.jsx - Updated version
import React from "react";
import { TrophyIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const emotionEmojis = {
  neutral: "😐",
  worry: "😟",
  happiness: "😊",
  sadness: "😢",
  love: "❤️",
  surprise: "😲",
  fun: "😄",
  relief: "😌",
  hate: "💔",
  empty: "😶",
  enthusiasm: "🤩",
  boredom: "😒",
  anger: "😡",
};

const getEmotionColor = (emotion) => {
  const colorMap = {
    neutral: "from-gray-400 to-gray-500",
    worry: "from-amber-400 to-amber-500",
    happiness: "from-yellow-400 to-yellow-500",
    sadness: "from-blue-400 to-blue-500",
    love: "from-pink-400 to-red-500",
    surprise: "from-orange-400 to-orange-500",
    fun: "from-green-400 to-green-500",
    relief: "from-emerald-400 to-emerald-500",
    hate: "from-rose-400 to-rose-500",
    empty: "from-slate-400 to-slate-500",
    enthusiasm: "from-purple-400 to-purple-500",
    boredom: "from-stone-400 to-stone-500",
    anger: "from-red-500 to-red-600",
  };
  return colorMap[emotion] || "from-gray-400 to-gray-500";
};

export default function EmotionResult({ result }) {
  if (!result) return null;

  const emoji = emotionEmojis[result.emotion] || "❓";
  const confidencePercentage = Math.round(result.score * 1.);
  const emotionColor = getEmotionColor(result.emotion);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <TrophyIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Analysis Result</h2>
      </div>

      <div className={`bg-gradient-to-r ${emotionColor} rounded-2xl p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{emoji}</span>
            <div>
              <p className="text-white text-sm font-medium">Detected Emotion</p>
              <p className="text-white text-3xl font-bold capitalize">
                {result.emotion}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-white text-sm font-medium">Confidence Score</p>
            <p className="text-white text-3xl font-bold">{confidencePercentage}%</p>
          </div>
        </div>
      </div>

      

      

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}