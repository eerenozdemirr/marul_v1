import React, { useEffect, useState, useRef } from 'react';
import './Aldirma.css'; // Stil dosyasını içe aktar
import arkaPlanSes from './arka-plan-ses.mp3'; // Ses dosyasını içe aktar
import spotifyLogo from '/Users/erenozdemir/album-promotion/src/assets/spotify-logo.png'; // Spotify logosu
import youtubeLogo from '/Users/erenozdemir/album-promotion/src/assets/youtube-logo.png'; // YouTube logosu
import appleMusicLogo from '/Users/erenozdemir/album-promotion/src/assets/apple-music-logo.png'; // Apple Müzik logosu
import background1 from '/Users/erenozdemir/album-promotion/src/songnames/aldirma/background1.PNG'; // İlk arka plan
import background2 from '/Users/erenozdemir/album-promotion/src/songnames/aldirma/background2.PNG'; // İkinci arka plan
import button1Image from '/Users/erenozdemir/album-promotion/src/songnames/aldirma/button1.PNG'; // Birinci PNG buton
import button2Image from '/Users/erenozdemir/album-promotion/src/songnames/aldirma/button2.PNG'; // İkinci PNG buton

const Aldirma = () => {
    const [show, setShow] = useState(false);
    const [background, setBackground] = useState(''); // Arka plan durumu
    const [buttonsVisible, setButtonsVisible] = useState(true); // Butonların görünürlüğünü kontrol eden state
    const audioRef = useRef(null); // Ses referansı

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
            audioRef.current.play(); // Ses çalmaya başla
        }, 100); // 100 ms gecikme ile göster

        const audioElement = audioRef.current;

        return () => {
            clearTimeout(timer);
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        };
    }, []);

    // Seçimi sunucuya gönderme işlevi
    const sendChoiceToServer = (buttonChoice) => {
        fetch('http://marulmusic.com/backend/aldirma.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ buttonChoice }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Server response:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    // Arka planı değiştiren işlevler ve butonları gizler
    const changeBackgroundToFirst = () => {
        setBackground(`url(${background1})`);
        setButtonsVisible(false); // Butonları gizle
        sendChoiceToServer('fark_eder'); // Sunucuya "fark eder" seçimini gönder
    };

    const changeBackgroundToSecond = () => {
        setBackground(`url(${background2})`);
        setButtonsVisible(false); // Butonları gizle
        sendChoiceToServer('fark_etmez'); // Sunucuya "fark etmez" seçimini gönder
    };

    return (
        <div className={`aldirma-page ${show ? 'show' : ''}`} style={{ backgroundImage: background }}>
            <audio ref={audioRef} src={arkaPlanSes} />

            <div className="aldirma-music-links">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w
" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="music-logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="music-logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="music-logo" />
                </a>
            </div>

            {/* PNG butonları */}
            {buttonsVisible && (
                <div className="aldirma-buttons fade-out"> {/* fade-out sınıfını ekledik */}
                    <img src={button1Image} alt="Buton 1" className="background-button" onClick={changeBackgroundToFirst} />
                    <img src={button2Image} alt="Buton 2" className="background-button" onClick={changeBackgroundToSecond} />
                </div>
            )}
        </div>
    );
};

export default Aldirma;
