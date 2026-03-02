// 3_EmotionList.jsx - Fixed with available icons
import React from "react";
import { 
  ChartBarIcon, 
  FireIcon,
  ArrowTrendingUpIcon 
} from "@heroicons/react/24/outline";

const emotions = [
  { name: "neutral", count: 8638, emoji: "😐" },
  { name: "worry", count: 8459, emoji: "😟" },
  { name: "happiness", count: 5209, emoji: "😊" },
  { name: "sadness", count: 5165, emoji: "😢" },
  { name: "love", count: 3842, emoji: "❤️" },
  { name: "surprise", count: 2187, emoji: "😲" },
  { name: "fun", count: 3776, emoji: "😄" },
  { name: "relief", count: 1526, emoji: "😌" },
  { name: "hate", count: 1323, emoji: "💔" },
  { name: "empty", count: 1827, emoji: "😶" },
  { name: "enthusiasm", count: 1759, emoji: "🤩" },
  { name: "boredom", count: 1179, emoji: "😒" },
  { name: "anger", count: 1111, emoji: "😡" },
];

const getEmotionColor = (emotionName) => {
  const colorMap = {
    neutral: "bg-gradient-to-br from-gray-100 to-gray-50 border-gray-300",
    worry: "bg-gradient-to-br from-amber-50 to-amber-100/30 border-amber-300",
    happiness: "bg-gradient-to-br from-yellow-50 to-yellow-100/30 border-yellow-300",
    sadness: "bg-gradient-to-br from-blue-50 to-blue-100/30 border-blue-300",
    love: "bg-gradient-to-br from-pink-50 to-red-50 border-pink-300",
    surprise: "bg-gradient-to-br from-orange-50 to-orange-100/30 border-orange-300",
    fun: "bg-gradient-to-br from-green-50 to-green-100/30 border-green-300",
    relief: "bg-gradient-to-br from-emerald-50 to-emerald-100/30 border-emerald-300",
    hate: "bg-gradient-to-br from-rose-50 to-rose-100/30 border-rose-300",
    empty: "bg-gradient-to-br from-slate-50 to-slate-100/30 border-slate-300",
    enthusiasm: "bg-gradient-to-br from-purple-50 to-purple-100/30 border-purple-300",
    boredom: "bg-gradient-to-br from-stone-50 to-stone-100/30 border-stone-300",
    anger: "bg-gradient-to-br from-red-50 to-red-100/30 border-red-300",
  };
  return colorMap[emotionName] || "bg-gradient-to-br from-gray-50 to-gray-100";
};

const getTotalCount = () => {
  return emotions.reduce((total, emotion) => total + emotion.count, 0);
};

export default function EmotionList() {
  const totalCount = getTotalCount();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <FireIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Emotion Distribution</h2>
        </div>
        <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
          <span className="text-white text-sm font-bold">{emotions.length} Emotions</span>
        </div>
      </div>

      {/* Total Count */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowTrendingUpIcon className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Dataset Samples</p>
              <p className="text-2xl font-bold text-gray-800">{totalCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">50K+ Dataset</p>
            <p className="text-lg font-semibold text-purple-600">High Quality</p>
          </div>
        </div>
      </div>

      {/* Emotion Grid */}
      <div className="space-y-3   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3  pr-2">
        {emotions.map((emotion) => {
          const percentage = ((emotion.count / totalCount) * 100).toFixed(1);
          
          return (
            <div
              key={emotion.name}
              className={`p-2 rounded-xl border ${getEmotionColor(emotion.name)} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emotion.emoji}</span>
                  <span className="capitalize font-semibold text-gray-800">
                    {emotion.name}
                  </span>
                </div>
                <span className="font-bold text-gray-900 text-lg">
                  {emotion.count.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Percentage</span>
                  <span className="font-semibold text-gray-800">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{emotions.length}</p>
            <p className="text-sm text-gray-600">Emotion Types</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">50K+</p>
            <p className="text-sm text-gray-600">Training Data</p>
          </div>
        </div>
      </div>
    </div>
  );
}