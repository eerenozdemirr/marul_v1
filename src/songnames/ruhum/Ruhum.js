import React, { useState } from 'react';
import './Ruhum.css';
import button1 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button1.PNG';
import button2 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button2.PNG';
import button3 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button3.PNG';
import button4 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button4.PNG';
import button5 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button5.PNG';
import button6 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button6.PNG';
import button7 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button7.PNG';
import button8 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button8.PNG';
import button9 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/button9.PNG';
import videoFile from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/video.mp4';

// Ses dosyalarını import et
import sound1 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound1.mp3';
import sound2 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound2.mp3';
import sound3 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound3.mp3';
import sound4 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound4.mp3';
import sound5 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound5.mp3';
import sound6 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound6.mp3';
import sound7 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound7.mp3';
import sound8 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound8.mp3';
import sound9 from '/Users/erenozdemir/album-promotion/src/songnames/ruhum/sound9.mp3';

// Müzik platformu logolarını import et
import spotifyLogo from '/Users/erenozdemir/album-promotion/src/assets/spotify-logo.png'; 
import youtubeLogo from '/Users/erenozdemir/album-promotion/src/assets/youtube-logo.png'; 
import appleMusicLogo from '/Users/erenozdemir/album-promotion/src/assets/apple-music-logo.png';

const buttonImages = [button1, button2, button3, button4, button5, button6, button7, button8, button9];
const correctOrder = [2, 8, 7, 3, 6, 1, 5, 0, 4]; 

const soundMapping = {
    2: sound1, 
    8: sound2, 
    7: sound3, 
    3: sound4, 
    6: sound5, 
    1: sound6, 
    5: sound7, 
    0: sound8, 
    4: sound9 
};

const blocks = ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9'];

const Ruhum = () => {
    const [blockContents, setBlockContents] = useState(Array(9).fill(null));
    const [hiddenButtons, setHiddenButtons] = useState(new Array(buttonImages.length).fill(false));
    const [currentStep, setCurrentStep] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const handleButtonClick = (index) => {
        if (index === correctOrder[currentStep]) {
            const emptyIndex = blockContents.indexOf(null);
            if (emptyIndex !== -1) {
                const newBlockContents = [...blockContents];
                newBlockContents[emptyIndex] = buttonImages[index];

                const newHiddenButtons = [...hiddenButtons];
                newHiddenButtons[index] = true;

                setBlockContents(newBlockContents);
                setHiddenButtons(newHiddenButtons);
                setCurrentStep(currentStep + 1);

                const audio = new Audio(soundMapping[index]);
                audio.play();

                if (currentStep + 1 === correctOrder.length) {
                    setTimeout(() => {
                        setIsVideoOpen(true);
                    }, 2000);
                }
            }
        }
    };

    return (
        <div className="ruhum-page">
            {blocks.map((block, index) => (
                <div key={index} className={`color-block ${block}`}>
                    {blockContents[index] && (
                        <img src={blockContents[index]} alt={`Block ${index + 1}`} className="block-image" />
                    )}
                </div>
            ))}

            <div className="button-grid">
                {buttonImages.slice(0, 4).map((src, index) => (
                    !hiddenButtons[index] && (
                        <button key={index} className="png-button" onClick={() => handleButtonClick(index)}>
                            <img src={src} alt={`Button ${index + 1}`} />
                        </button>
                    )
                ))}
            </div>
            <div className="button-grid">
                {buttonImages.slice(4).map((src, index) => (
                    !hiddenButtons[index + 4] && (
                        <button key={index + 4} className="png-button" onClick={() => handleButtonClick(index + 4)}>
                            <img src={src} alt={`Button ${index + 5}`} />
                        </button>
                    )
                ))}
            </div>

            {isVideoOpen && (
                <div className="video-container">
                    <video controls autoPlay>
                        <source src={videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {/* Müzik linkleri */}
            <div className="ruhum-links">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="music-logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ
" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="music-logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="music-logo" />
                </a>
            </div>
        </div>
    );
};

export default Ruhum;
