// 1_EmotionForm.jsx - Updated version
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PaperAirplaneIcon,
  BeakerIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function EmotionForm({ onPredict }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPredict(text);
    setText("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <BeakerIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Analyze Your Text</h2>
      </div>

      

      <form onSubmit={handleSubmit} className="space-y-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Text Input
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white resize-y"
            placeholder="Type your text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{ minHeight: "120px", maxHeight: "300px" }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {text.length} characters
            </span>
            <span className="text-sm text-gray-500">
              Enter 10+ characters for better accuracy
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="submit"
            disabled={!text.trim()}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${text.trim()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            Predict Emotion
          </button>

          <Link
            to="/examples"
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Examples
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </form>


    </div>
  );
}