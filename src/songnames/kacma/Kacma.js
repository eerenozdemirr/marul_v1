import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kacma.css';
import kacmaSes from '/Users/erenozdemir/album-promotion/src/songnames/kacma/kacma.mp3';
import playButtonImage from '/Users/erenozdemir/album-promotion/src/songnames/kacma/play.png';
import spotifyLogo from '/Users/erenozdemir/album-promotion/src/assets/spotify-logo.png'; // Spotify logosunu içe aktar
import youtubeLogo from '/Users/erenozdemir/album-promotion/src/assets/youtube-logo.png'; // YouTube logosunu içe aktar
import appleMusicLogo from '/Users/erenozdemir/album-promotion/src/assets/apple-music-logo.png'; // Apple Music logosunu içe aktar

const Kacma = () => {
    const [show, setShow] = useState(false);
    const audioRef = useRef(new Audio(kacmaSes));
    const navigate = useNavigate();

    useEffect(() => {
        const audio = audioRef.current;

        const playAudio = async () => {
            try {
                await audio.play();
            } catch (error) {
                console.error("Ses çalma hatası:", error);
            }
        };

        playAudio();

        const timer = setTimeout(() => {
            setShow(true);
        }, 100);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                audio.pause();
                audio.currentTime = 0;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            audio.pause();
            audio.currentTime = 0;
            clearTimeout(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handlePlayButtonClick = () => {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        navigate('/kac');
    };

    return (
        <div className={`kacma-page ${show ? 'show' : ''}`}>
            <img 
                src={playButtonImage}
                alt="Oyna" 
                className="play-button" 
                onClick={handlePlayButtonClick}
                style={{ cursor: 'pointer' }}
            />

            <div className="logos">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w
" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="logo" />
                </a>
            </div>
        </div>
    );
};

export default Kacma;
