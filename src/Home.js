import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Home = () => {
    const [background] = useState('url(background.jpg)');
    const [showChair, setShowChair] = useState(true); // Sandalye gösteriliyor
    const [animateChair, setAnimateChair] = useState(false); // Sandalye animasyonu
    const [showNewImage, setShowNewImage] = useState(false); // Yeni görüntü gösterilmiyor
    const [showLeftButton, setShowLeftButton] = useState(false); // Sol buton ilk başta gizli
    const [showRightButton, setShowRightButton] = useState(true); // Sağ buton gösteriliyor
    const navigate = useNavigate();

    const changeBackground = () => {
        setAnimateChair(true); // Sandalyeyi yukarı kaldır
        setTimeout(() => {
            setShowChair(false); // Sandalyeyi kaybettir
            navigate('/yuksek'); // Yeni sayfaya yönlendirme
        }, 1000); // Animasyon süresi
    };

    const handleRightButtonClick = () => {
        setShowChair(false); // Sandalyeyi gizle
        setShowNewImage(true); // Yeni görüntüyü göster
        setShowRightButton(false); // Sağ butonu gizle
        setShowLeftButton(true); // Sol butonu göster
    };

    const handleLeftButtonClick = () => {
        setShowChair(true); // Sandalyeyi geri getir
        setShowNewImage(false); // Yeni görüntüyü gizle
        setShowRightButton(true); // Sağ butonu geri getir
        setShowLeftButton(false); // Sol butonu gizle
    };

    return (
        <div className="App" style={{ backgroundImage: background, height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {showChair && (
                <img
                    src={`${process.env.PUBLIC_URL}/chair1.PNG`}
                    alt="Sandalye"
                    className={`chair ${animateChair ? 'fly' : ''}`} // Sandalye animasyonu
                    onClick={changeBackground} // Sandalyeye tıklayınca fonksiyon çalışır
                />
            )}

{showNewImage && (
    <img
        src={`${process.env.PUBLIC_URL}/credit.png`} // Yeni görüntü
        alt="Yeni Görüntü"
        className="credit" // Sınıf adını 'new-image' yerine 'credit' yap
    />
)}
    

            {showLeftButton && (
                <img 
                    src={`${process.env.PUBLIC_URL}/left.PNG`} 
                    alt="Sol Buton" 
                    className="side-button left-button" 
                    onClick={handleLeftButtonClick} // Sol butona tıklama
                />
            )}

            {showRightButton && (
                <img 
                    src={`${process.env.PUBLIC_URL}/right.PNG`} 
                    alt="Sağ Buton" 
                    className="side-button right-button" 
                    onClick={handleRightButtonClick} // Sağ butona tıklama
                />
            )}
        </div>
    );
};

export default Home;
