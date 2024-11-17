import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Home bileşenini içe aktar
import Yuksek from './Yuksek'; // Yuksek bileşenini ekliyoruz
import Yuksegim from './songnames/yuksegim/Yuksegim';
import Kacma from './songnames/kacma/Kacma';
import Dur from './songnames/dur/Dur';
import BirKadinVarmis from './songnames/birkadinvarmis/BirKadinVarmis';
import OlsunOlmasin from './songnames/olsunolmasin/OlsunOlmasin';
import Aldirma from './songnames/aldirma/Aldirma';
import Ruhum from './songnames/ruhum/Ruhum';
import TutmazEllerim from './songnames/tutmazellerim/TutmazEllerim';
import Kac from './songnames/kacma/Kac'; // Kac bileşenini içe aktardık

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/yuksegim" element={<Yuksegim />} />
                <Route path="/kacma" element={<Kacma />} />
                <Route path="/dur" element={<Dur />} />
                <Route path="/birkadinvarmis" element={<BirKadinVarmis />} />
                <Route path="/olsunolmasin" element={<OlsunOlmasin />} />
                <Route path="/aldirma" element={<Aldirma />} />
                <Route path="/ruhum" element={<Ruhum />} />
                <Route path="/tutmazellerim" element={<TutmazEllerim />} />
                <Route path="/yuksek" element={<Yuksek />} />
                <Route path="/kac" element={<Kac />} /> {/* Kac rotasını ekledik */}
            </Routes>
        </Router>
    );
}

export default App;
