import React, { useEffect, useState } from 'react';
import './Yuksegim.css';
import sound from './sound.mp3';
import sound2 from './sound2.mp3';
import sound3 from './sound3.mp3';
import sound4 from './sound4.mp3';
import alpImage from './alp.PNG';
import senaImage from './sena.PNG';
import emreImage from './emre.PNG';
import erenImage from './eren.PNG';
import videoFile from './video.mp4';

import spotifyLogo from '/Users/erenozdemir/album-promotion/src/assets/spotify-logo.png';
import youtubeLogo from '/Users/erenozdemir/album-promotion/src/assets/youtube-logo.png';
import appleMusicLogo from '/Users/erenozdemir/album-promotion/src/assets/apple-music-logo.png';

const Yuksegim = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageClass, setImageClass] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [clickOrder, setClickOrder] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showNotepad, setShowNotepad] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState('');
    const [fourthRegionClickCount, setFourthRegionClickCount] = useState(0);
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const preloadAssets = async () => {
            const sounds = [new Audio(sound), new Audio(sound2), new Audio(sound3), new Audio(sound4)];
            const images = [alpImage, senaImage, emreImage, erenImage];

            await Promise.all([
                ...sounds.map(sound => sound.load()),
                ...images.map(src => {
                    const img = new Image();
                    img.src = src;
                    return img.decode();
                })
            ]);

            setIsLoading(false);
        };

        preloadAssets();
    }, []);

    useEffect(() => {
        if (showVideo) {
            fetch('http://marulmusic.com/backend/kayit.php', {
                method: "GET",
            })
            .then(response => response.text())
            .then(data => console.log("Kayıt başarılı:", data))
            .catch(error => console.error("Kayıt hatası:", error));
        }
    }, [showVideo]);

    const handlePasswordSubmit = () => {
        if (password === 'sifre123') {  
            setShowNotepad(true);
            setShowPasswordPrompt(false);
            setPassword('');
        } else {
            alert('Yanlış şifre! Tekrar deneyin.');
        }
    };

    const handleSubmitNote = async () => {
        if (noteText.trim() === "") {
            alert("Not boş olamaz!");
            return;
        }

        try {
            const response = await fetch("http://marulmusic.com/backend/save_note.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    note_text: noteText,
                }),
            });

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error("Not kaydedilemedi:", error);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch("http://marulmusic.com/backend/get_notes.php");
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Notlar alınamadı:", error);
        }
    };

    const handleClick = (event) => {
        const { clientX, clientY } = event;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const newClickOrder = [...clickOrder];

        // Koordinat kontrolleri
        if (
            clientX >= screenWidth * 0.105 &&
            clientX <= screenWidth * 0.285 &&
            clientY >= screenHeight * 0.397 &&
            clientY <= screenHeight * 0.483
        ) {
            const audio = new Audio(sound);
            audio.play();
            setImageSrc(alpImage);
            setImageClass('photo-in-region-alp');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 1000);
            if (newClickOrder.length === 0) {
                newClickOrder.push(1);
            }
        } else if (
            clientX >= screenWidth * 0.407 &&
            clientX <= screenWidth * 0.573 &&
            clientY >= screenHeight * 0.429 &&
            clientY <= screenHeight * 0.515
        ) {
            const audio2 = new Audio(sound2);
            audio2.play();
            setImageSrc(senaImage);
            setImageClass('photo-in-region-sena');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 2500);
            if (newClickOrder.length === 1 && newClickOrder[0] === 1) {
                newClickOrder.push(2);
            } else {
                newClickOrder.length = 0;
            }
        } else if (
            clientX >= screenWidth * 0.628 &&
            clientX <= screenWidth * 0.837 &&
            clientY >= screenHeight * 0.429 &&
            clientY <= screenHeight * 0.558
        ) {
            const audio3 = new Audio(sound3);
            audio3.play();
            setImageSrc(emreImage);
            setImageClass('photo-in-region-emre');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 1000);
            if (newClickOrder.length === 2 && newClickOrder[1] === 2) {
                newClickOrder.push(3);
            } else {
                newClickOrder.length = 0;
            }
        } else if (
            clientX >= screenWidth * 0.348 &&
            clientX <= screenWidth * 0.569 &&
            clientY >= screenHeight * 0.536 &&
            clientY <= screenHeight * 0.644
        ) {
            const audio4 = new Audio(sound4);
            audio4.play();
            setImageSrc(erenImage);
            setImageClass('photo-in-region-eren');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 2800);
            setFourthRegionClickCount(prevCount => prevCount + 1);

            if (fourthRegionClickCount + 1 === 4) {
                setShowPasswordPrompt(true);
                setFourthRegionClickCount(0);
            }
        }

        setCoordinates(`X: ${clientX}, Y: ${clientY}`);
        setClickOrder(newClickOrder);
    };

    if (isLoading) {
        return (
            <div className="loading-spinner">
                Yükleniyor...
            </div>
        );
    }

    return (
        <div className="yuksegim-page" onClick={handleClick}>
            {coordinates && (
                <div className="coordinates-display">        
                </div>
            )}

            {showImage && imageSrc && (
                <img src={imageSrc} alt="Selected" className={imageClass} />
            )}

            {showVideo && (
                <video className="video" controls autoPlay>
                    <source src={videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* Şifre Ekranı */}
            {showPasswordPrompt && (
                <div className="password-prompt">
                    <h3>Not defterine erişmek için şifreyi girin</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Şifre"
                    />
                    <button onClick={handlePasswordSubmit}>Onayla</button>
                </div>
            )}

            {/* Not Defteri */}
            {showNotepad && (
                <div className="notepad-container">
                    <div className="notepad-header">
                        <span className="notepad-date">{new Date().toLocaleDateString()}</span>
                    </div>
                    <textarea
                        className="notepad-textarea"
                        placeholder="Notlarınızı buraya yazın..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                    <button className="notepad-submit-button" onClick={handleSubmitNote}>
                        Gönder
                    </button>
                    <button className="fetch-notes-button" onClick={fetchNotes}>
                        Notları Göster
                    </button>
                    <div className="notes-list">
                        {notes.map((note, index) => (
                            <div key={index} className="note-item">
                                {note.note_text}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="region first-region" />
            <div className="region second-region" />
            <div className="region third-region" />
            <div className="region fourth-region" />
        </div>
    );
};

export default Yuksegim;
