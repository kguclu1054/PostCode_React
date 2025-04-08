import React, { useState } from "react";
import './App.css';

const PostaKoduSecimi = () => {
  const [iller, setIller] = useState([
    { id: 1, ad: "Adana" },
    { id: 2, ad: "Adıyaman" },
    { id: 3, ad: "Afyon" },
    { id: 4, ad: "Ağrı" },
    { id: 5, ad: "Amasya" },
    { id: 6, ad: "Ankara" },
    { id: 7, ad: "Antalya" },
    { id: 8, ad: "Artvin" },
    { id: 9, ad: "Aydın" },
    { id: 10, ad: "Balıkesir" },
    { id: 11, ad: "Bilecik" },
    { id: 12, ad: "Bingöl" },
    { id: 13, ad: "Bitlis" },
    { id: 14, ad: "Bolu" },
    { id: 15, ad: "Burdur" },
    { id: 16, ad: "Bursa" },
    { id: 17, ad: "Çanakkale" },
    { id: 18, ad: "Çankırı" },
    { id: 19, ad: "Çorum" },
    { id: 20, ad: "Denizli" },
    { id: 21, ad: "Diyarbakır" },
    { id: 22, ad: "Edirne" },
    { id: 23, ad: "Elâzığ" },
    { id: 24, ad: "Erzincan" },
    { id: 25, ad: "Erzurum" },
    { id: 26, ad: "Eskişehir" },
    { id: 27, ad: "Gaziantep" },
    { id: 28, ad: "Giresun" },
    { id: 29, ad: "Gümüşhane" },
    { id: 30, ad: "Hakkâri" },
    { id: 31, ad: "Hatay" },
    { id: 32, ad: "Isparta" },
    { id: 33, ad: "Mersin" },
    { id: 34, ad: "İstanbul" },
    { id: 35, ad: "İzmir" },
    { id: 36, ad: "Kars" },
    { id: 37, ad: "Kastamonu" },
    { id: 38, ad: "Kayseri" },
    { id: 39, ad: "Kırklareli" },
    { id: 40, ad: "Kırşehir" },
    { id: 41, ad: "Kocaeli" },
    { id: 42, ad: "Konya" },
    { id: 43, ad: "Kütahya" },
    { id: 44, ad: "Malatya" },
    { id: 45, ad: "Manisa" },
    { id: 46, ad: "Kahramanmaraş" },
    { id: 47, ad: "Mardin" },
    { id: 48, ad: "Muğla" },
    { id: 49, ad: "Muş" },
    { id: 50, ad: "Nevşehir" },
    { id: 51, ad: "Niğde" },
    { id: 52, ad: "Ordu" },
    { id: 53, ad: "Rize" },
    { id: 54, ad: "Sakarya" },
    { id: 55, ad: "Samsun" },
    { id: 56, ad: "Siirt" },
    { id: 57, ad: "Sinop" },
    { id: 58, ad: "Sivas" },
    { id: 59, ad: "Tekirdağ" },
    { id: 60, ad: "Tokat" },
    { id: 61, ad: "Trabzon" },
    { id: 62, ad: "Tunceli" },
    { id: 63, ad: "Şanlıurfa" },
    { id: 64, ad: "Uşak" },
    { id: 65, ad: "Van" },
    { id: 66, ad: "Yozgat" },
    { id: 67, ad: "Zonguldak" },
    { id: 68, ad: "Aksaray" },
    { id: 69, ad: "Bayburt" },
    { id: 70, ad: "Karaman" },
    { id: 71, ad: "Kırıkkale" },
    { id: 72, ad: "Batman" },
    { id: 73, ad: "Şırnak" },
    { id: 74, ad: "Bartın" },
    { id: 75, ad: "Ardahan" },
    { id: 76, ad: "Iğdır" },
    { id: 77, ad: "Yalova" },
    { id: 78, ad: "Karabük" },
    { id: 79, ad: "Kilis" },
    { id: 80, ad: "Osmaniye" },
    { id: 81, ad: "Düzce" }
  ]);


  const [seciliIl, setSeciliIl] = useState("");
  const [seciliIlce, setSeciliIlce] = useState("");
  const [seciliSemt, setSeciliSemt] = useState("");
  const [ilceler, setIlceler] = useState([]);
  const [semtler, setSemtler] = useState([]);
  const [mahalleler, setMahalleler] = useState([]);
  const [postaKodu , setPostaKodu] = useState("");

  const handleIlSec = async (e) => {
    const ilId = e.target.value;
    setSeciliIl(ilId);
    setSeciliIlce("");
    setSeciliSemt("");
    setIlceler([]);
    setSemtler([]);
    setMahalleler([]);
    setPostaKodu("");

    if (!ilId) return;

    try {
      const response = await fetch(`https://api.zumbo.net/postakodu/il/${ilId}`);
      const data = await response.json();

      if (data.success) {
        const ilceListesi = [...new Set(data.postakodu.map((item) => item.ilce))];
        setIlceler(ilceListesi);
      }
    } catch (err) {
      console.error("Hata:", err);
    }
  };

  const handleIlceSec = async (e) => {
    const ilce = e.target.value;
    setSeciliIlce(ilce);
    setSeciliSemt("");
    setSemtler([]);
    setMahalleler([]);

    if (!ilce) return;

    try {
      const response = await fetch(`https://api.zumbo.net/postakodu/il/${seciliIl}`);
      const data = await response.json();

      if (data.success) {
        const semtListesi = [...new Set(
          data.postakodu.filter(item => item.ilce === ilce).map(item => item.semt_bucak_belde)
        )];
        setSemtler(semtListesi);
      }
    } catch (err) {
      console.error("Hata:", err);
    }
  };

  const handleSemtSec = async (e) => {
    const semt = e.target.value;
    setSeciliSemt(semt);
    setMahalleler([]);
    setPostaKodu("");

    if (!semt) return;

    try {
      const response = await fetch(`https://api.zumbo.net/postakodu/il/${seciliIl}`);
      const data = await response.json();

      if (data.success) {
        const mahalleListesi = [...new Set(
          data.postakodu.filter(item => item.ilce === seciliIlce && item.semt_bucak_belde === semt).map(item => item.mahalle)
        )];
        setMahalleler(mahalleListesi);
      }
    } catch (err) {
      console.error("Hata:", err);
    }
  };

  const handleMahalleSec = async (e) => {
    const mahalle = e.target.value;
    setPostaKodu("");
  
    if (!mahalle) return;
  
    try {
      const response = await fetch(`https://api.zumbo.net/postakodu/il/${seciliIl}`);
      const data = await response.json();
  
      // Yanıtı kontrol et
      console.log(data);
  
      if (data.success) {
        // Mahalleyi bulmak için find fonksiyonunu kullan
        const bulunan = data.postakodu.find(
          (item) =>
            item.ilce === seciliIlce &&
            item.semt_bucak_belde === seciliSemt &&
            item.mahalle === mahalle
        );
  
        if (bulunan && bulunan.pk) {
          setPostaKodu(bulunan.pk);  // pk değerini set et
        } else {
          setPostaKodu("Posta Kodu Çekilemedi");  // pk mevcut değilse mesaj göster
        }
      }
    } catch (err) {
      console.error("Posta Kodu bulunamadı", err);
    }
  };
  
  

  return (
    <div>
      <h2>İl Seç</h2>
      <select value={seciliIl} onChange={handleIlSec}>
        <option value="">İl Seçiniz</option>
        {iller.map(il => (
          <option key={il.id} value={il.id}>{il.ad}</option>
        ))}
      </select>

      <h2>İlçe Seç</h2>
      <select value={seciliIlce} onChange={handleIlceSec}>
        <option value="">İlçe Seçiniz</option>
        {ilceler.map((ilce, index) => (
          <option key={index} value={ilce}>{ilce}</option>
        ))}
      </select>

      <h2>Semt/Bucak/Belde Seç</h2>
      <select value={seciliSemt} onChange={handleSemtSec}>
        <option value="">Semt Seçiniz</option>
        {semtler.map((semt, index) => (
          <option key={index} value={semt}>{semt}</option>
        ))}
      </select>

      <h2>Mahalle Seç</h2>
      <select onChange={handleMahalleSec}>
        <option value="">Mahalle Seçiniz</option>
        {mahalleler.map((mahalle, index) => (
          <option key={index} value={mahalle}>{mahalle}</option>
        ))}
      </select>

      <h2>Posta Kodu: {postaKodu}</h2> {/* Burada posta kodunu gösteriyoruz */}
    </div>
  );
};

export default PostaKoduSecimi;















