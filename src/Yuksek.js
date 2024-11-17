import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate ekleyelim
import './App.css';
import backgroundSound from './background-sound.mp3'; // Ses dosyasını içe aktar

const Yuksek = () => {
    const [animateNewBackground, setAnimateNewBackground] = useState(false);
    const navigate = useNavigate(); // Geri yönlendirme için kullanacağız
    const audioRef = useRef(new Audio(backgroundSound)); // Audio referansı

    const songRoutes = [
        { image: 'song1.png', path: '/yuksegim' },
        { image: 'song2.png', path: '/kacma' },
        { image: 'song3.png', path: '/dur' },
        { image: 'song4.png', path: '/birkadinvarmis' },
        { image: 'song5.png', path: '/olsunolmasin' },
        { image: 'song6.png', path: '/aldirma' },
        { image: 'song7.png', path: '/ruhum' },
        { image: 'song8.png', path: '/tutmazellerim' },
    ];

    const handleBackButtonClick = () => {
        setAnimateNewBackground(true); // Yeni arka planı yukarı kaydır
        setTimeout(() => {
            setAnimateNewBackground(false);
            navigate('/'); // Ana sayfaya geri dön
        }, 1500);
    };

    useEffect(() => {
        const audio = audioRef.current; // Değeri bir değişkene kopyalayalım
        audio.loop = true; // Ses döngüde çalsın
        audio.play().catch(error => {
            console.error("Ses çalma hatası:", error);
        }); // Ses dosyasını çal

        // Temizlik fonksiyonu
        return () => {
            audio.pause(); // Bileşen kaldırıldığında sesi durdur
            audio.currentTime = 0; // Sesin başına dön
        };
    }, []);

    return (
        <div className="App" style={{ backgroundImage: 'url(new-background.jpg)', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div className={`new-background ${animateNewBackground ? 'slide-up' : ''}`}>
                <img
                    src={`${process.env.PUBLIC_URL}back-button.png`}
                    alt="Geri Dön"
                    className="back-button"
                    onClick={handleBackButtonClick}
                    style={{ cursor: 'pointer', width: '80px', height: '40px' }}
                />
                <div className="song-titles">
                    {songRoutes.map((song, index) => (
                        <Link
                            to={{
                                pathname: song.path,
                                state: { songLoaded: true },
                            }}
                            key={index}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/songnames/${song.image}`}
                                alt={`El yazısı ${index + 1}`}
                                className={`handwritten-song ${animateNewBackground ? 'fade-out' : ''}`}
                                style={{ animationDelay: `${index * 0.5}s` }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Yuksek;
