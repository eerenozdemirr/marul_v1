import React, { useEffect, useState, useRef } from 'react';
import './BirKadinVarmis.css'; // Stil dosyasını içe aktar
import oldBackground from '/Users/erenozdemir/album-promotion/src/songnames/birkadinvarmis/old-background.PNG'; // Eski arka plan
import newBackground from '/Users/erenozdemir/album-promotion/src/songnames/birkadinvarmis/new-background.png'; // Yeni arka plan
import clickableImage from '/Users/erenozdemir/album-promotion/src/songnames/birkadinvarmis/kadın.png'; // Tıklanabilir PNG
import backgroundMusic from '/Users/erenozdemir/album-promotion/src/songnames/birkadinvarmis/birkadinvarmis.mp3'; // Arka plan müziği
import newSound from '/Users/erenozdemir/album-promotion/src/songnames/birkadinvarmis/caz.mp3'; // Yeni ses
import buttonImage from '/Users/erenozdemir/album-promotion/src/songnames/birkadinvarmis/caz.PNG'; // PNG buton

import spotifyLogo from '/Users/erenozdemir/album-promotion/src/assets/spotify-logo.png'; // Spotify logosu
import youtubeLogo from '/Users/erenozdemir/album-promotion/src/assets/youtube-logo.png'; // YouTube logosu
import appleMusicLogo from '/Users/erenozdemir/album-promotion/src/assets/apple-music-logo.png'; // Apple Müzik logosu


const BirKadinVarmis = () => {
    const [show, setShow] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(oldBackground);
    const [imageVisible, setImageVisible] = useState(true);
    const [imageHidden, setImageHidden] = useState(false); // PNG'nin kaybolma durumu
    const [isNewSoundPlaying, setIsNewSoundPlaying] = useState(false); // Yeni ses durumu
    const audioRef = useRef(null); // Ses referansı
    const newSoundRef = useRef(null); // Yeni ses referansı

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.birkadinvarmis-page').classList.add('show');
            setShow(true); // Sayfa görünür hale geldiğinde
            audioRef.current.play(); // Ses çalmaya başla
        }, 100); // Gecikmeli gösterim için 100 ms

        // Temizlik işlemi için audioRef.current'ı bir değişkene kopyala
        const audioElement = audioRef.current;

        return () => {
            clearTimeout(timeout); // Temizlik işlemi
            if (audioElement) {
                audioElement.pause(); // Sayfa kapandığında sesi durdur
                audioElement.currentTime = 0; // Ses zamanını sıfırla
            }
        };
    }, []);

    const handleImageClick = () => {
        setImageHidden(true); // Tıklanan görüntüyü gizle
        setTimeout(() => {
            setBackgroundImage(newBackground); // Yeni arka planı ayarla
            setImageVisible(false); // Görseli tamamen gizle
        }, 500); // PNG kaybolduktan sonra arka planı değiştir
    };

    const handleNewSoundButtonClick = () => {
        if (isNewSoundPlaying) {
            newSoundRef.current.pause();
            newSoundRef.current.currentTime = 0; // Yeni ses zamanını sıfırla
        } else {
            newSoundRef.current.play();
            audioRef.current.pause(); // Eski sesi durdur
        }
        setIsNewSoundPlaying(!isNewSoundPlaying); // Yeni sesin durumunu değiştir
    };

    return (
        <div className="birkadinvarmis-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <audio ref={audioRef} src={backgroundMusic} loop /> {/* Arka plan sesini ekle */}
            <audio ref={newSoundRef} src={newSound} /> {/* Yeni ses bileşenini ekle */}
            {show && imageVisible && (
                <img
                    src={clickableImage}
                    alt="Clickable"
                    className={`clickable-image ${imageHidden ? 'hidden' : ''}`}
                    onClick={handleImageClick}
                />
            )}
            <img
                src={buttonImage}
                alt="New Sound Button"
                className="new-sound-button"
                onClick={handleNewSoundButtonClick}
            />
            <div className="birkadinvarmis-music-links">
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
        </div>
    );
};

export default BirKadinVarmis;
