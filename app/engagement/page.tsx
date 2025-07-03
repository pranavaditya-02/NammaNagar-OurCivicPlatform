"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';

const ProposalBouquet = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showHeartDialog, setShowHeartDialog] = useState(true);
  type Balloon = {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    floatDelay: number;
  };
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [burstBalloons, setBurstBalloons] = useState<Set<number>>(new Set());
  const [showImageSlideshow, setShowImageSlideshow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [typedLetter, setTypedLetter] = useState('');

  // Add your image URLs here
  const coupleImages = [
    "/assets/1.jpeg",
    "/assets/2.jpeg",
    "/assets/3.jpeg",
    "/assets/4.jpeg",
  ];

  const messages = [
    "You are the strength of my life",
    "You are the girl behind my success",
    "You make everything beautiful",
    "Will you be my best wife?",
    "Marry me, my love!"
  ];

  const letterContent = `My dearest Hemu,

From the moment you entered my life, everything changed for the better. Your smile brightens my darkest days, your laughter is my favorite melody, and your love is my greatest treasure.

I love you from the moon to back, and even more beyond that. Every heartbeat, every breath, every moment—I am grateful for you.

Thank you for being my everything. I can't wait to spend forever with you.

Yours forever,
your sweet and cute purushan`;

  // Initialize balloons with mobile-friendly positioning
  useEffect(() => {
    const initialBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 70 + 15, // 15% to 85% of screen width (mobile-friendly)
      y: Math.random() * 50 + 25, // 25% to 75% of screen height (mobile-friendly)
      color: ['bg-red-400', 'bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400'][Math.floor(Math.random() * 6)],
      size: Math.random() * 15 + 35, // 35px to 50px (mobile-optimized)
      floatDelay: Math.random() * 3
    }));
    setBalloons(initialBalloons);
  }, []);

  interface HandleBalloonClick {
    (balloonId: number): void;
  }

  const handleBalloonClick: HandleBalloonClick = (balloonId) => {
    setBurstBalloons((prev: Set<number>) => new Set([...prev, balloonId]));
  };

  // Auto-close heart dialog after 5 seconds and start image slideshow
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeartDialog(false);
      setShowImageSlideshow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Image slideshow logic
  useEffect(() => {
    if (showImageSlideshow && !celebrationMode) {
      const imageTimer = setInterval(() => {
        setImageTransition(true);
        setTimeout(() => {
          setCurrentImageIndex(prev => (prev + 1) % coupleImages.length);
          setImageTransition(false);
        }, 500);
      }, 3000);

      return () => clearInterval(imageTimer);
    }
  }, [showImageSlideshow, celebrationMode, coupleImages.length]);

  // Hide image slideshow when proposal starts
  useEffect(() => {
    if (showProposal) {
      setShowImageSlideshow(false);
    }
  }, [showProposal]);

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

  // Typewriter effect for the letter
  useEffect(() => {
    if (showLetter && typedLetter.length < letterContent.length) {
      const timeout = setTimeout(() => {
        setTypedLetter(letterContent.slice(0, typedLetter.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [showLetter, typedLetter, letterContent]);

  return (
    <div className={`min-h-screen ${celebrationMode ? 'bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400' : 'bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300'} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated background gradient */}
      <div className={`absolute inset-0 ${celebrationMode ? 'bg-gradient-to-r from-pink-400/50 via-purple-400/50 to-blue-400/50' : 'bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-blue-300/30'} animate-pulse transition-all duration-1000`}></div>
      
      {/* Floating Balloons */}
      {balloons.map((balloon) => !burstBalloons.has(balloon.id) && (
        <div
          key={balloon.id}
          className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 animate-bounce z-10`}
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            animationDelay: `${balloon.floatDelay}s`,
            animationDuration: '2s'
          }}
          onClick={() => handleBalloonClick(balloon.id)}
        >
          {/* Balloon */}
          <div 
            className={`${balloon.color} rounded-full shadow-lg relative`}
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size + 8}px`
            }}
          >
            {/* Balloon shine */}
            <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full"></div>
            {/* Balloon string */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-8 bg-gray-600"></div>
          </div>
        </div>
      ))}

      {/* Burst Effect for balloons */}
      {Array.from(burstBalloons).map((balloonId) => {
        const balloon = balloons.find(b => b.id === balloonId);
        if (!balloon) return null;
        
        return (
          <div
            key={`burst-${balloonId}`}
            className="absolute animate-ping z-10"
            style={{
              left: `${balloon.x}%`,
              top: `${balloon.y}%`,
            }}
          >
            {/* Burst particles */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 ${balloon.color} rounded-full animate-ping`}
                style={{
                  left: `${Math.cos(i * 45 * Math.PI / 180) * 25}px`,
                  top: `${Math.sin(i * 45 * Math.PI / 180) * 25}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        );
      })}

      {/* Floating hearts */}
      {hearts}
      
      {/* Floating sparkles */}
      {sparkles}

      {/* Heart Dialog */}
      {showHeartDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative animate-bounce-in">
            {/* Heart Shape Container */}
            <div className="relative w-72 h-64 sm:w-80 sm:h-72 md:w-96 md:h-80">
              {/* Heart Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 transform rotate-45 rounded-tl-full rounded-tr-full shadow-2xl animate-pulse"></div>
              <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 transform -translate-x-1/2 rounded-full shadow-2xl animate-pulse"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 rounded-full shadow-2xl animate-pulse"></div>
              
              {/* Content inside heart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 transform -rotate-45 translate-y-2 sm:translate-y-4">
                <div className="transform rotate-45 text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 animate-pulse">
                    💕 Heyyyy Cutieee Pieeee 💕
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 animate-bounce">
                    Hemmmmuuu! 😘
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-semibold animate-pulse">
                    Pondatttiiiii! 🥰
                  </p>
                </div>
              </div>

              {/* Heart beat animation rings */}
              <div className="absolute inset-0 border-4 border-pink-300 rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-4 border-2 border-pink-200 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-8 border-2 border-white rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Image Slideshow in Heart Shape */}
      {showImageSlideshow && !showProposal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="relative animate-heart-beat">
            {/* Heart Shape Container for Images */}
            <div className="relative w-80 h-72 sm:w-96 sm:h-80 md:w-[28rem] md:h-[24rem]">
              {/* Heart Shape Mask */}
              <div className="absolute inset-0 overflow-hidden" style={{
                clipPath: 'polygon(50% 90%, 20% 40%, 20% 30%, 30% 20%, 40% 20%, 50% 30%, 60% 20%, 70% 20%, 80% 30%, 80% 40%)',
                WebkitClipPath: 'polygon(50% 90%, 20% 40%, 20% 30%, 30% 20%, 40% 20%, 50% 30%, 60% 20%, 70% 20%, 80% 30%, 80% 40%)'
              }}>
                <img 
                  src={coupleImages[currentImageIndex]} 
                  alt={`Memory ${currentImageIndex + 1}`}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    imageTransition ? 'scale-110 opacity-50 rotate-6' : 'scale-100 opacity-100 rotate-0'
                  }`}
                />
              </div>
              
              {/* Heart Border */}
              <div className="absolute inset-0 border-4 border-pink-400 rounded-full animate-pulse shadow-2xl" style={{
                clipPath: 'polygon(50% 90%, 20% 40%, 20% 30%, 30% 20%, 40% 20%, 50% 30%, 60% 20%, 70% 20%, 80% 30%, 80% 40%)',
                WebkitClipPath: 'polygon(50% 90%, 20% 40%, 20% 30%, 30% 20%, 40% 20%, 50% 30%, 60% 20%, 70% 20%, 80% 30%, 80% 40%)'
              }}></div>

              {/* Floating Hearts around the image */}
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-pink-400 animate-bounce"
                  style={{
                    left: `${Math.cos(i * 30 * Math.PI / 180) * 120 + 50}%`,
                    top: `${Math.sin(i * 30 * Math.PI / 180) * 120 + 50}%`,
                    animationDelay: `${i * 0.2}s`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Heart className="fill-current w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              ))}

              {/* Sparkle effects */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-yellow-300 animate-spin"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '2s'
                  }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              ))}

              {/* Image counter */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-sm font-semibold text-gray-700">
                  {currentImageIndex + 1} / {coupleImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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

        {/* I love you from the moon to back */}
        <div className="flex flex-col items-center mt-4 mb-4 z-20">
          <div className="flex items-center space-x-2">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              I love you from the
            </span>
            <span className="text-4xl md:text-6xl animate-bounce">🌙</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              to back!
            </span>
          </div>
          {/* Love Meter */}
          <div className="w-64 sm:w-96 h-6 bg-gray-200 rounded-full mt-4 shadow-inner relative overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 rounded-full animate-heart-beat" style={{ width: '100%' }}></div>
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg drop-shadow">
              1000000% Love
            </span>
          </div>
        </div>

        {/* Love Letter Envelope */}
        <div className="flex flex-col items-center mt-8 mb-8 z-20">
          {!showLetter ? (
            <button
              className="relative w-32 h-24 sm:w-40 sm:h-28 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-lg shadow-lg border-2 border-pink-400 flex items-center justify-center transition-transform hover:scale-105"
              onClick={() => setShowLetter(true)}
              aria-label="Open Love Letter"
            >
              {/* Envelope Flap */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-pink-300 to-yellow-200 rounded-t-lg z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
              {/* Envelope Body */}
              <div className="absolute bottom-0 left-0 w-full h-3/4 bg-white rounded-b-lg border-t-2 border-pink-300"></div>
              {/* Heart Seal */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-400 animate-pulse" />
              </div>
              <span className="relative z-30 text-pink-600 font-bold text-lg mt-16">Open Letter</span>
            </button>
          ) : (
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border-2 border-pink-300 p-6 animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-2">💌 My Love Letter</h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-base sm:text-lg font-mono min-h-[200px]">{typedLetter}</pre>
            </div>
          )}
        </div>

        {/* Animated Message */}
        {showMessage && !showHeartDialog && !showImageSlideshow && (
          <div className="text-center mb-4 sm:mb-8 transform transition-all duration-1000 animate-fade-in px-4">
            <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4 ${celebrationMode ? 'animate-ping' : 'animate-pulse'}`}>
              My Dearest Love
            </h1>
            <p className={`text-base sm:text-xl md:text-2xl text-gray-700 font-semibold mb-4 sm:mb-6 min-h-[2rem] sm:min-h-[3rem] flex items-center justify-center animate-slide-up ${celebrationMode ? 'text-white font-bold' : ''}`}>
              {celebrationMode ? "Yes! She said YES! 💍❤️" : messages[currentMessage]}
            </p>
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
        
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-heart-beat {
          animation: heart-beat 2s ease-in-out infinite;
        }
        
        /* Mobile-specific animations */
        @media (max-width: 640px) {
          .animate-bounce {
            animation-duration: 1.5s;
          }
          
          .animate-pulse {
            animation-duration: 1.8s;
          }
          
          .animate-ping {
            animation-duration: 1.2s;
          }
        }
      `}</style>
    </div>
  );
};

export default ProposalBouquet;