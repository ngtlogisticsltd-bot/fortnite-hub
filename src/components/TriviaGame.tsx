"use client";

import { useState } from 'react';
import { Target, Trophy, XCircle } from 'lucide-react';

const questions = [
  {
    q: "What season did Tilted Towers first appear?",
    options: ["Season 1", "Season 2", "Season 3", "Season 4"],
    a: 1
  },
  {
    q: "What is the maximum amount of health and shields you can have normally?",
    options: ["100", "150", "200", "250"],
    a: 2
  },
  {
    q: "Which of these is NOT a rarity tier in Fortnite?",
    options: ["Mythic", "Legendary", "Exotic", "Supreme"],
    a: 3
  },
  {
    q: "What is the name of the monster that fought the Mecha Team Leader?",
    options: ["Cattus", "Doggus", "The Leviathan", "Galactus"],
    a: 0
  },
  {
    q: "Which character is the leader of the Seven?",
    options: ["The Visitor", "The Paradigm", "The Foundation", "The Scientist"],
    a: 2
  }
];

export default function TriviaGame() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQ].a) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="bg-gradient-to-br from-[#181926] to-[#0f1016] border border-primary/20 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-black text-2xl uppercase flex items-center gap-2">
          <Target className="text-primary" />
          Trivia <span className="text-primary">Hub</span>
        </h3>
        {!showResult && (
          <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full">
            {currentQ + 1} / {questions.length}
          </span>
        )}
      </div>

      {showResult ? (
        <div className="text-center py-8">
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4 animate-bounce" />
          <h4 className="text-3xl font-black uppercase mb-2">You Scored {score}/{questions.length}</h4>
          <p className="text-white/60 mb-6">Want to try again and earn more points?</p>
          <button 
            onClick={resetGame}
            className="bg-primary text-black font-black uppercase px-6 py-3 rounded hover:bg-primary-hover transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-medium mb-6 min-h-[60px]">{questions[currentQ].q}</h4>
          <div className="space-y-3">
            {questions[currentQ].options.map((opt, i) => {
              let btnClass = "w-full text-left p-4 rounded border font-bold transition-all duration-300 ";
              
              if (selectedAnswer === null) {
                btnClass += "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50";
              } else if (i === questions[currentQ].a) {
                btnClass += "bg-green-500/20 border-green-500 text-green-400";
              } else if (selectedAnswer === i) {
                btnClass += "bg-red-500/20 border-red-500 text-red-400";
              } else {
                btnClass += "bg-white/5 border-white/10 opacity-50";
              }

              return (
                <button 
                  key={i}
                  onClick={() => selectedAnswer === null && handleAnswer(i)}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
