import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; 
import './Kac.css';
import dinoImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/sena.png';  
import leftImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/alp.png';  
import obstacleImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/engel.png';  
import startSoundFile from '/Users/erenozdemir/album-promotion/src/songnames/kacma/game-music1.mp3';  
import startButtonImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/play.png';  
import restartButtonImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/play.png';  
import gameOverImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/lose.png';

const Kac = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [speedFactor, setSpeedFactor] = useState(1);  
  const [showNickInput, setShowNickInput] = useState(false);  
  const [nick, setNick] = useState('');  
  const audioRef = useRef(null);  
  const location = useLocation();  

  useEffect(() => {
    audioRef.current = new Audio(startSoundFile);

    const handleUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (audioRef.current) {
          audioRef.current.pause();  
          audioRef.current.currentTime = 0;  
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (location.pathname !== '/kac') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play(); // Müzik bittiğinde tekrar başlat
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (isGameStarted) {
      const createObstacle = () => {
        setObstacles(prev => [...prev, { id: Date.now(), left: 1000 }]);
        
        const minimumTimeGap = 1500; 
        const randomAdditionalTime = Math.floor(Math.random() * 1500); 
        
        setTimeout(createObstacle, minimumTimeGap + randomAdditionalTime);
      };
      createObstacle();

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play(); 
      }
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (isGameStarted && !isGameOver) { 
      const moveObstacles = setInterval(() => {
        if (score % 75 === 0 && score !== 0) {
          setSpeedFactor(prev => prev + 0.2);  
        }

        setObstacles(prev =>
          prev.map(obstacle => ({ ...obstacle, left: obstacle.left - 50 * speedFactor })) 
            .filter(obstacle => obstacle.left > -50)
        );
        
        setScore(prev => prev + 1);

        const dino = document.querySelector('.dino');
        const dinoRect = dino?.getBoundingClientRect();

        obstacles.forEach(obstacle => {
          const obstacleElement = document.getElementById(obstacle.id);
          if (obstacleElement && dinoRect) {
            const obstacleRect = obstacleElement.getBoundingClientRect();
            if (
              dinoRect.left < obstacleRect.right &&
              dinoRect.right > obstacleRect.left &&
              dinoRect.bottom > obstacleRect.top &&
              dinoRect.top < obstacleRect.bottom
            ) {
              setIsGameOver(true); 
              clearInterval(moveObstacles); 

              if (audioRef.current) {
                audioRef.current.pause();  
                audioRef.current.currentTime = 0;  
              }

              if (score >= 20) {
                setShowNickInput(true);
              }
            }
          }
        });
      }, 100);

      return () => {
        clearInterval(moveObstacles);
      };
    }
  }, [obstacles, isGameStarted, isGameOver, speedFactor, score]);

  const handleNickSubmit = () => {
    if (nick.trim()) {
      const newScore = { nick, score };

      fetch('http://marulmusic.com/backend/score_save.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          nick: newScore.nick,
          score: newScore.score.toString(),
        }),
      })
        .then(response => response.text())
        .then(data => {
          console.log("Veri gönderildi:", data);
        })
        .catch(error => {
          console.error('Hata:', error);
        });

      setShowNickInput(false);
      setNick('');
    }
  };

  const handleJump = () => {
    if (!isJumping && isGameStarted) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500); 
    }
  };

  const handleStart = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();  
    }
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setObstacles([]);
    setSpeedFactor(1);  
  };

  const handleRestart = () => {
    setIsJumping(false);
    setScore(0);
    setObstacles([]);
    setIsGameOver(false);
    setIsGameStarted(true);
    setSpeedFactor(1);  

    if (audioRef.current) {
      audioRef.current.play();  
    }
  };

  return (
    <div className="game-area" onClick={handleJump} onTouchStart={handleJump}>
      {!isGameStarted && (
        <div className="start-container">
          <img 
            src={startButtonImage} 
            alt="Başla" 
            className="start-button" 
            onClick={handleStart} 
          />
        </div>
      )}
      {!isGameOver && isGameStarted && (
        <>
          <div className="dino-container">
            <div className="left-image">
              <img src={leftImage} alt="Left" className="left-image-content" />
            </div>
            <div className={`dino ${isJumping ? 'jump' : ''}`}>
              <img src={dinoImage} alt="Dino" className="dino-image" />
            </div>
          </div>
          {obstacles.map(obstacle => (
            <div key={obstacle.id} id={obstacle.id} className="obstacle" style={{ left: obstacle.left }}>
              <img src={obstacleImage} alt="Engel" className="obstacle-image" />
            </div>
          ))}
          <div className="score">Skor: {score}</div>
        </>
      )}
      {isGameOver && (
        <div className="game-over-container">
          <img src={gameOverImage} alt="Kaçamadın" className="game-over-image" />
          <div className="score">Skor: {score}</div>
          {showNickInput && (
            <div className="nick-input-container">
              <input 
                type="text" 
                value={nick} 
                onChange={(e) => setNick(e.target.value)} 
                placeholder="Nick'inizi girin" 
              />
              <button onClick={handleNickSubmit}>Gönder</button>
            </div>
          )}
          <img 
            src={restartButtonImage} 
            alt="Tekrar Oyna" 
            className="restart-button" 
            onClick={handleRestart} 
          />
        </div>
      )}
    </div>
  );
};

export default Kac;
