"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const ProposalBouquet = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const messages = [
    "You are the strength of my life",
    "You are the girl behind my success",
    "You make everything beautiful",
    "Will you be my best wife?",
    "Marry me, my love!"
  ];

  const handleYesClick = () => {
    setCelebrationMode(true);
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 1000);
  };

  const handleOfCourseClick = () => {
    setCelebrationMode(true);
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 1000);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 2000);
    const timer2 = setTimeout(() => setShowProposal(true), 4000);
    
    const messageTimer = setInterval(() => {
      if (!celebrationMode) {
        setCurrentMessage(prev => (prev + 1) % messages.length);
      }
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(messageTimer);
    };
  }, [celebrationMode]);

  // Generate floating hearts with celebration mode
  const heartCount = celebrationMode ? 50 : 20;
  const hearts = Array.from({ length: heartCount }, (_, i) => (
    <div
      key={i}
      className={`absolute text-pink-400 ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        fontSize: `${celebrationMode ? 16 + Math.random() * 12 : 12 + Math.random() * 8}px`
      }}
    >
      <Heart className="fill-current animate-bounce" />
    </div>
  ));

  // Generate sparkles with celebration mode
  const sparkleCount = celebrationMode ? 30 : 15;
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => (
    <div
      key={i}
      className={`absolute text-yellow-300 ${celebrationMode ? 'animate-ping' : 'animate-spin'}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: celebrationMode ? '1s' : '3s'
      }}
    >
      <Sparkles size={celebrationMode ? 24 : 16} className="fill-current" />
    </div>
  ));

  return (
    <div className={`min-h-screen ${celebrationMode ? 'bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400' : 'bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300'} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated background gradient */}
      <div className={`absolute inset-0 ${celebrationMode ? 'bg-gradient-to-r from-pink-400/50 via-purple-400/50 to-blue-400/50' : 'bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-blue-300/30'} animate-pulse transition-all duration-1000`}></div>
      
      {/* Floating hearts */}
      {hearts}
      
      {/* Floating sparkles */}
      {sparkles}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        {/* Bouquet Container */}
        <div className={`relative mb-4 sm:mb-8 transform hover:scale-105 transition-all duration-300 ${celebrationMode ? 'animate-spin' : ''}`}>
          {/* Bouquet Flowers */}
          <div className="relative">
            {/* Large center flowers */}
            <div className="flex justify-center items-end space-x-1 sm:space-x-2 mb-2 sm:mb-4">
              {/* Rose 1 */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-bounce'}`} style={{ animationDelay: '0s' }}>
                <div className="absolute inset-2 bg-gradient-to-br from-red-300 to-red-500 rounded-full"></div>
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-red-200 to-red-400 rounded-full"></div>
              </div>
              
              {/* Rose 2 - Pink */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-bounce'}`} style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-2 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full"></div>
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-pink-200 to-pink-400 rounded-full"></div>
              </div>
              
              {/* Rose 3 */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-bounce'}`} style={{ animationDelay: '1s' }}>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full"></div>
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full"></div>
              </div>
            </div>

            {/* Second row of flowers */}
            <div className="flex justify-center items-end space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`}>
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>
              </div>
              <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full"></div>
              </div>
              <div className={`w-9 h-9 sm:w-13 sm:h-13 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full"></div>
              </div>
              <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDelay: '0.9s' }}>
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-green-300 to-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Third row - smaller flowers */}
            <div className="flex justify-center items-end space-x-1 sm:space-x-2 mb-2">
              {Array.from({ length: 6 }, (_, i) => (
                <div 
                  key={i}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full relative ${celebrationMode ? 'animate-ping' : 'animate-pulse'} ${
                    ['bg-gradient-to-br from-red-300 to-red-500',
                     'bg-gradient-to-br from-pink-300 to-pink-500',
                     'bg-gradient-to-br from-purple-300 to-purple-500',
                     'bg-gradient-to-br from-blue-300 to-blue-500',
                     'bg-gradient-to-br from-yellow-300 to-yellow-500',
                     'bg-gradient-to-br from-orange-300 to-orange-500'][i]
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="absolute inset-1 bg-white/30 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Stems */}
            <div className="flex justify-center">
              <div className="w-2 h-16 sm:h-24 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            </div>

            {/* Leaves */}
            <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-8 sm:w-6 sm:h-12 bg-gradient-to-br from-green-300 to-green-500 rounded-full transform rotate-45 absolute -left-3 sm:-left-4"></div>
              <div className="w-4 h-8 sm:w-6 sm:h-12 bg-gradient-to-br from-green-300 to-green-500 rounded-full transform -rotate-45 absolute -right-3 sm:-right-4"></div>
            </div>
          </div>
        </div>

        {/* Animated Message */}
        {showMessage && (
          <div className="text-center mb-4 sm:mb-8 transform transition-all duration-1000 animate-fade-in px-4">
            <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4 ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`}>
              My Dearest Love
            </h1>
            <p className={`text-base sm:text-xl md:text-2xl text-gray-700 font-semibold mb-4 sm:mb-6 min-h-[2rem] sm:min-h-[3rem] flex items-center justify-center animate-slide-up ${celebrationMode ? 'text-white font-bold' : ''}`}>
              {celebrationMode ? "Yes! She said YES! 💍❤️" : messages[currentMessage]}
            </p>
          </div>
        )}

        {/* Proposal Section */}
        {showProposal && !showFinalMessage && (
          <div className="text-center transform animate-bounce-in px-4">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl border-4 border-pink-300 mb-6 max-w-lg sm:max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-4 sm:mb-6">
                💍 Will You Marry Me? 💍
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-2 sm:mb-4 leading-relaxed">
                You are not just my girlfriend, you are my
                <span className="font-bold text-pink-600"> best friend</span>,
                my <span className="font-bold text-purple-600">strength</span>,
                and my <span className="font-bold text-blue-600">inspiration</span>.
              </p>
              <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                You are the girl behind my success, the reason I smile every day.
                <br />
                <span className="font-bold text-red-600">Will you be my best wife?</span>
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse active:scale-95"
                >
                  YES! 💕
                </button>
                <button 
                  onClick={handleOfCourseClick}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 sm:px-8 py-3 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  Of Course! 💖
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Final Celebration Message */}
        {showFinalMessage && (
          <div className="text-center transform animate-bounce-in px-4">
            <div className="bg-gradient-to-r from-pink-400/90 to-purple-400/90 backdrop-blur-md rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl border-4 border-yellow-300 mb-6 max-w-lg sm:max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 animate-bounce">
                🎉 WE'RE ENGAGED! 🎉
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-white mb-4 sm:mb-6 leading-relaxed font-semibold">
                Thank you for saying YES! 
                <br />
                You've made me the happiest person alive! 
                <br />
                <span className="text-yellow-200">I love you more than words can say! 💕</span>
              </p>
              <div className="text-4xl sm:text-6xl animate-spin">💍</div>
              <p className="text-sm sm:text-lg text-white mt-4 opacity-90">
                Now let's plan our beautiful future together! ✨
              </p>
            </div>
          </div>
        )}

        {/* Ring Animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-32 h-32 border-4 border-yellow-400 rounded-full animate-spin opacity-20"></div>
          <div className="w-24 h-24 border-4 border-pink-400 rounded-full animate-spin opacity-30 absolute top-4 left-4" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 1.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProposalBouquet;