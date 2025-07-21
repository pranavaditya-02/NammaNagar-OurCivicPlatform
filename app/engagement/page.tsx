"use client"
import { useState, useEffect, useRef } from "react"
import { Heart, Sparkles, Play, Pause, Star, Sun, Smile } from "lucide-react"

const ComfortScreen = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showGames, setShowGames] = useState(false)
  const [celebrationMode, setCelebrationMode] = useState(false)
  const [showInitialDialog, setShowInitialDialog] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [collectedHearts, setCollectedHearts] = useState(0)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  type Balloon = {
    id: number
    x: number
    y: number
    color: string
    size: number
    floatDelay: number
  }

  type FloatingHeart = {
    id: number
    x: number
    y: number
    collected: boolean
  }

  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [burstBalloons, setBurstBalloons] = useState<Set<number>>(new Set())
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([])
  const [showQuoteCard, setShowQuoteCard] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  // Comforting messages
  const comfortMessages = [
    "Hey beautiful soul... 💕",
    "I know things feel heavy right now",
    "But you're stronger than you know",
    "Every storm passes, every night ends",
    "You deserve all the happiness in the world",
    "Let's turn this around together! 🌈",
  ]

  // Encouraging quotes
  const encouragingQuotes = [
    "You are braver than you believe, stronger than you seem, and smarter than you think. 💪",
    "This too shall pass. You've overcome challenges before, and you'll overcome this one too. 🌅",
    "Your current situation is not your final destination. Better days are coming! 🦋",
    "You are loved, you are valued, and you matter more than you know. ❤️",
    "Every day is a new beginning. Take a deep breath and start again. 🌸",
    "You have survived 100% of your worst days. That's a pretty good track record! ⭐",
  ]

  // Initialize balloons
  useEffect(() => {
    const initialBalloons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 70 + 15,
      y: Math.random() * 50 + 25,
      color: ["bg-pink-400", "bg-purple-400", "bg-blue-400", "bg-yellow-400", "bg-green-400", "bg-orange-400"][
        Math.floor(Math.random() * 6)
      ],
      size: Math.random() * 15 + 40,
      floatDelay: Math.random() * 3,
    }))
    setBalloons(initialBalloons)
  }, [])

  // Initialize floating hearts for collection game
  useEffect(() => {
    if (showGames) {
      const hearts = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        collected: false,
      }))
      setFloatingHearts(hearts)
    }
  }, [showGames])

  // Auto-close initial dialog and start sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialDialog(false)
      setShowMessage(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Message progression
  useEffect(() => {
    if (showMessage && !celebrationMode) {
      const messageTimer = setInterval(() => {
        setCurrentMessage((prev) => {
          if (prev < comfortMessages.length - 1) {
            return prev + 1
          } else {
            setShowGames(true)
            return prev
          }
        })
      }, 3000)
      return () => clearInterval(messageTimer)
    }
  }, [showMessage, celebrationMode])

  // Quote rotation
  useEffect(() => {
    if (showQuoteCard) {
      const quoteTimer = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % encouragingQuotes.length)
      }, 5000)
      return () => clearInterval(quoteTimer)
    }
  }, [showQuoteCard])

  const handleBalloonClick = (balloonId: number) => {
    setBurstBalloons((prev) => new Set([...prev, balloonId]))
    setScore((prev) => prev + 10)

    // Show encouragement after popping some balloons
    if (score >= 50 && !showEncouragement) {
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 3000)
    }
  }

  const handleHeartClick = (heartId: number) => {
    setFloatingHearts((prev) => prev.map((heart) => (heart.id === heartId ? { ...heart, collected: true } : heart)))
    setCollectedHearts((prev) => prev + 1)

    if (collectedHearts >= 6) {
      setCelebrationMode(true)
      setTimeout(() => setShowQuoteCard(true), 1000)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Generate background elements
  const backgroundHearts = Array.from({ length: celebrationMode ? 40 : 20 }, (_, i) => (
    <div
      key={i}
      className={`absolute text-pink-300 ${celebrationMode ? "animate-ping" : "animate-pulse"}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        fontSize: `${celebrationMode ? 16 + Math.random() * 12 : 12 + Math.random() * 8}px`,
      }}
    >
      <Heart className="fill-current" />
    </div>
  ))

  const backgroundSparkles = Array.from({ length: celebrationMode ? 25 : 15 }, (_, i) => (
    <div
      key={i}
      className={`absolute text-yellow-300 ${celebrationMode ? "animate-spin" : "animate-pulse"}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: celebrationMode ? "1s" : "3s",
      }}
    >
      <Sparkles size={celebrationMode ? 20 : 14} className="fill-current" />
    </div>
  ))

  return (
    <div
      className={`min-h-screen ${celebrationMode ? "bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300" : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200"} relative overflow-hidden transition-all duration-1000`}
    >
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto">
        {/* Replace with your YouTube audio URL - you'll need to convert YouTube to audio file */}
        <source src="https://youtu.be/W9IHUEWlEa4?si=oKidIfj10MGUfOWW" type="audio/mpeg" />
      </audio>

      {/* Music Control */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isPlaying ? <Pause className="w-6 h-6 text-purple-600" /> : <Play className="w-6 h-6 text-purple-600" />}
        </button>
      </div>

      {/* Score Display */}
      {showGames && (
        <div className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <div className="text-center">
            <p className="text-sm font-semibold text-purple-600">Balloons Popped</p>
            <p className="text-2xl font-bold text-pink-600">{score}</p>
            <p className="text-sm font-semibold text-purple-600 mt-2">Hearts Collected</p>
            <p className="text-2xl font-bold text-pink-600">{collectedHearts}/8</p>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      {backgroundHearts}
      {backgroundSparkles}

      {/* Initial Comfort Dialog */}
      {showInitialDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative animate-bounce-in">
            <div className="bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-8 rounded-3xl shadow-2xl max-w-md text-center">
              <div className="text-6xl mb-4 animate-bounce">🤗</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                Hey there, beautiful! 💕
              </h2>
              <p className="text-lg text-white/90 mb-4">I see you might be feeling down...</p>
              <p className="text-xl font-semibold text-white drop-shadow">Let me help you smile again! 🌈</p>
              <div className="mt-6 flex justify-center space-x-4">
                <Sun className="w-8 h-8 text-yellow-300 animate-spin" />
                <Heart className="w-8 h-8 text-pink-300 animate-pulse fill-current" />
                <Star className="w-8 h-8 text-purple-300 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Balloons Game */}
      {showGames &&
        balloons.map(
          (balloon) =>
            !burstBalloons.has(balloon.id) && (
              <div
                key={balloon.id}
                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 z-20"
                style={{
                  left: `${balloon.x}%`,
                  top: `${balloon.y}%`,
                }}
                onClick={() => handleBalloonClick(balloon.id)}
              >
                <div
                  className={`${balloon.color} rounded-full shadow-lg relative animate-bounce hover:animate-pulse`}
                  style={{
                    width: `${balloon.size}px`,
                    height: `${balloon.size + 8}px`,
                    animationDelay: `${balloon.floatDelay}s`,
                    animationDuration: "2s",
                  }}
                >
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-600"></div>
                  {/* Click indicator */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/50 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ),
        )}

      {/* Burst Effects */}
      {Array.from(burstBalloons).map((balloonId) => {
        const balloon = balloons.find((b) => b.id === balloonId)
        if (!balloon) return null

        return (
          <div
            key={`burst-${balloonId}`}
            className="absolute z-30 pointer-events-none"
            style={{
              left: `${balloon.x}%`,
              top: `${balloon.y}%`,
            }}
          >
            {/* Burst particles */}
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 ${balloon.color} rounded-full animate-ping`}
                style={{
                  left: `${Math.cos((i * 30 * Math.PI) / 180) * 40}px`,
                  top: `${Math.sin((i * 30 * Math.PI) / 180) * 40}px`,
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: "1s",
                }}
              ></div>
            ))}
            {/* Score popup */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-2xl animate-bounce pointer-events-none">
              +10 🎉
            </div>
            {/* Celebration text */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-purple-600 font-semibold text-sm animate-fade-in pointer-events-none">
              Great job!
            </div>
          </div>
        )
      })}

      {/* Collectible Hearts Game */}
      {showGames &&
        floatingHearts.map(
          (heart) =>
            !heart.collected && (
              <div
                key={heart.id}
                className="absolute cursor-pointer z-20 hover:scale-125 transition-all duration-300"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                }}
                onClick={() => handleHeartClick(heart.id)}
              >
                <div className="relative">
                  <Heart className="w-10 h-10 text-red-500 fill-current animate-bounce drop-shadow-lg" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-10 h-10 bg-red-300 rounded-full blur-sm opacity-50 animate-pulse"></div>
                  {/* Click indicator */}
                  <div className="absolute -inset-2 border-2 border-red-300 rounded-full opacity-0 hover:opacity-100 transition-opacity animate-ping"></div>
                </div>
              </div>
            ),
        )}

      {/* Heart Collection Effects */}
      {floatingHearts.map(
        (heart) =>
          heart.collected && (
            <div
              key={`collected-${heart.id}`}
              className="absolute z-30 pointer-events-none"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
              }}
            >
              {/* Collection burst */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-pink-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.cos((i * 45 * Math.PI) / 180) * 25}px`,
                    top: `${Math.sin((i * 45 * Math.PI) / 180) * 25}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-pink-600 font-bold text-lg animate-bounce">
                💖 +1
              </div>
            </div>
          ),
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Comfort Flower Bouquet */}
        <div
          className={`relative mb-8 transform hover:scale-105 transition-all duration-300 ${celebrationMode ? "animate-spin" : ""}`}
        >
          <div className="relative">
            {/* Sunflower center */}
            <div className="flex justify-center items-end space-x-2 mb-4">
              <div
                className={`w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full relative ${celebrationMode ? "animate-ping" : "animate-pulse"}`}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full"></div>
                <Smile className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-600" />
              </div>
            </div>

            {/* Surrounding flowers */}
            <div className="flex justify-center items-end space-x-3 mb-3">
              {[
                "bg-gradient-to-br from-pink-300 to-pink-500",
                "bg-gradient-to-br from-purple-300 to-purple-500",
                "bg-gradient-to-br from-blue-300 to-blue-500",
                "bg-gradient-to-br from-green-300 to-green-500",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-14 h-14 ${color} rounded-full relative ${celebrationMode ? "animate-ping" : "animate-bounce"}`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <div className="absolute inset-2 bg-white/30 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Stems and leaves */}
            <div className="flex justify-center">
              <div className="w-3 h-24 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {showMessage && !showInitialDialog && (
          <div className="text-center mb-8 transform transition-all duration-1000 animate-fade-in px-4">
            <h1
              className={`text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 ${celebrationMode ? "animate-ping" : "animate-pulse"}`}
            >
              {celebrationMode ? "You're Amazing! 🌟" : "Don't Be Sad, Beautiful"}
            </h1>
            <p
              className={`text-xl sm:text-2xl text-gray-700 font-semibold mb-6 min-h-[3rem] flex items-center justify-center animate-slide-up ${celebrationMode ? "text-purple-800 font-bold" : ""}`}
            >
              {celebrationMode
                ? "Look how much joy you've created! You're incredible! 💖"
                : comfortMessages[currentMessage]}
            </p>
          </div>
        )}

        {/* Game Instructions */}
        {showGames && !celebrationMode && (
          <div className="text-center mb-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-md">
            <h3 className="text-xl font-bold text-purple-600 mb-2">Stress Buster Games! 🎮</h3>
            <p className="text-gray-700 mb-2">Pop the balloons to release stress! 🎈</p>
            <p className="text-gray-700">Collect hearts to fill your joy meter! ❤️</p>
          </div>
        )}

        {/* Interactive Tutorial */}
        {showGames && score === 0 && collectedHearts === 0 && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-sm mx-4 animate-bounce-in">
              <div className="text-center">
                <div className="text-4xl mb-3">👆</div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">Let's Play!</h3>
                <p className="text-gray-700 mb-2">Tap the colorful balloons to pop them! 🎈</p>
                <p className="text-gray-700">Collect the glowing hearts! ❤️</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="w-8 h-8 bg-pink-400 rounded-full animate-bounce"></div>
                  <Heart className="w-8 h-8 text-red-500 fill-current animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Encouragement Pop-up */}
        {showEncouragement && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-2xl animate-bounce-in z-40">
            <div className="text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-xl font-bold">Great job! You're doing amazing!</p>
              <p className="text-lg">Keep going, you've got this! 💪</p>
            </div>
          </div>
        )}

        {/* Quote Card */}
        {showQuoteCard && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-sm mx-4 animate-slide-up z-40">
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3 animate-spin" />
              <p className="text-gray-800 font-medium text-lg leading-relaxed">{encouragingQuotes[currentQuote]}</p>
            </div>
          </div>
        )}
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
  )
}

export default ComfortScreen
