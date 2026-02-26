import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { 
  Instagram, 
  Menu, 
  X, 
  ArrowRight, 
  Globe, 
  ChevronDown 
} from 'lucide-react';

// --- Types & Data ---
interface Artwork {
  image: string;
  title: string;
  materialKey: string;
  dimensions: string;
  year: string;
}

const artworks: Artwork[] = [
  {
    image: "https://static.wixstatic.com/media/784d0e_249a073f04214945ac5bbf3e483e8a87~mv2.jpg",
    title: "Kiss",
    materialKey: "Epoxy Acrylic Paint",
    dimensions: "60x60x20 cm",
    year: "2018"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_36140677f6de4a3d8a71a309a19bcae2~mv2.jpg",
    title: "Apollo Desperately in Love",
    materialKey: "Epoxy & Wood",
    dimensions: "70x70x30 cm",
    year: "2010"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_43899ee23b944458bd7a44f441450612~mv2.png",
    title: "Alexander With Wireless",
    materialKey: "Epoxy & Plastic",
    dimensions: "50x30x25 cm",
    year: "2010"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_e59c1936211a419aa3fb9300d4dc2acf~mv2.jpg",
    title: "Female Figure With Sphere Head",
    materialKey: "Polish Bronze",
    dimensions: "35x25x25 cm",
    year: "2002"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_87cb820026ac44e9986de340a4859d87~mv2.png",
    title: "Get Ridoff Your Tiredness",
    materialKey: "Bottle Caps",
    dimensions: "50x30x20 cm",
    year: "2012"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_26abad4faa864d0187e3457d59c50e09~mv2.jpg",
    title: "Methamorphosis",
    materialKey: "Polish Bronze",
    dimensions: "60x15x15 cm",
    year: "2019"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_ae2d46d147e64e2c86d65509974b5bb7~mv2.jpg",
    title: "Under Siege",
    materialKey: "Polish Bronze",
    dimensions: "20x20x10cm",
    year: "2020"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_463d2071d0f84f21b969d2fc87e879ce~mv2.png",
    title: "Table With Legs",
    materialKey: "Readymade",
    dimensions: "170x100x80 cm",
    year: "2020"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_ca1b0868e7ef4df5a6c9e5c9a42e68af~mv2.jpg",
    title: "Bike",
    materialKey: "Recycle Metal",
    dimensions: "100x120x15 cm",
    year: "2011"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_fc7885ddbbd4452187eb217f12a3e62f~mv2.jpg",
    title: "Le Pain",
    materialKey: "Polish Bronze",
    dimensions: "40x15x10cm",
    year: "2016"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_fb59f123b67941ed8da06eda8df6d996~mv2.png",
    title: "Motion",
    materialKey: "Bronze",
    dimensions: "20x20x10cm",
    year: "2004"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_7be8f3ce6a9246828ecb02871f219de3~mv2.png",
    title: "Escape",
    materialKey: "Ceramic Smoke Firing",
    dimensions: "30x20x20cm",
    year: "2000"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_1030611acf3a4497bc8528de489ba889~mv2.png",
    title: "Wheel Chair With Wings",
    materialKey: "Readymade",
    dimensions: "160x70x70cm",
    year: "2018"
  },
  {
    image: "https://static.wixstatic.com/media/784d0e_e7fc81aaf591426bba877d55ed1f9b27~mv2.png",
    title: "Colorful Wind",
    materialKey: "Stainless Steel",
    dimensions: "220x140x50cm",
    year: "2022"
  }
];

const publicWorksImages = [
  "https://static.wixstatic.com/media/784d0e_3f221ef137bf489b941f9cc33379b1f3~mv2.webp",
  "https://static.wixstatic.com/media/784d0e_9b314ab36ae1428abefb5d8f5afefb55~mv2.webp",
  "https://static.wixstatic.com/media/784d0e_248dfaab3e0a4e568e5f0f6167a77361~mv2.webp",
  "https://static.wixstatic.com/media/784d0e_6cd413bdf61a43d1967b622e4d924d22~mv2.webp"
];

const awardsData = [
  { year: "2000", title: "Rotary Club Seramik Yarışması - Filiz Sarper Eczacıbaşı Ödülü", location: "İZMİR" },
  { year: "2000", title: "Çanakkale Seramik Gençlik Sempozyumu - Diploma", location: "ÇANAKKALE" },
  { year: "2001", title: "Turgut Pura Resim Heykel Yarışması - Heykel Birincilik Ödülü", location: "İZMİR" },
  { year: "2002", title: "Rotary Club Seramik Yarışması - Teşekkür Plaketi", location: "İZMİR" },
  { year: "2002", title: "Turgut Pura Resim ve Heykel Yarışması - Selçuk Müzesi Artemis Ödülü", location: "İZMİR" },
  { year: "2002", title: "Uluslararası Kahire Seramik Bienali - Jüri Gençlik Ödülü", location: "KAHİRE / MISIR" },
  { year: "2003", title: "Turgut Pura Resim Heykel Yarışması - Heykel Birincilik Ödülü", location: "İZMİR" },
  { year: "2005", title: "Art İstanbul Resim Heykel Yarışması - Jüri Özel Ödülü", location: "İSTANBUL" },
  { year: "2010", title: "Uluslararası Salon Sergisi - Özel Ödül - Louvre Müzesi", location: "CARROUSEL DU LOUVRE - PARIS / FRANSA" },
  { year: "2014", title: "İzmir Özel Türk Koleji - Teşekkür Plaketi", location: "İZMİR" },
  { year: "2020", title: "Art Show Paris Prix Du Public - Üç Ayrı Eser Ödülü", location: "PARIS / FRANSA" },
  { year: "2024", title: "International Prize Botticelli ‘Sanatında Fark Yaratan Sanatçı Ödülü’", location: "BORGHESE PALACE - FLORENCE / ITALY" },
  { year: "2024", title: "International Prize Leonardo Da Vinci ‘Universal Artist’ Ödülü", location: "ITALY" }
];

const materialTranslations: Record<string, Record<string, string>> = {
  "Epoxy Acrylic Paint": { tr: "Epoksi Akrilik Boya", en: "Epoxy Acrylic Paint", fr: "Peinture Acrylique Époxy" },
  "Epoxy & Wood": { tr: "Epoksi & Ahşap", en: "Epoxy & Wood", fr: "Époxy et Bois" },
  "Epoxy & Plastic": { tr: "Epoksi & Plastik", en: "Epoxy & Plastic", fr: "Époxy et Plastique" },
  "Polish Bronze": { tr: "Parlatılmış Bronz", en: "Polished Bronze", fr: "Bronze Poli" },
  "Bottle Caps": { tr: "Şişe Kapakları", en: "Bottle Caps", fr: "Bouchons de Bouteilles" },
  "Recycle Metal": { tr: "Geri Dönüştürülmüş Metal", en: "Recycled Metal", fr: "Métal Recyclé" },
  "Readymade": { tr: "Hazır Nesne", en: "Readymade", fr: "Objet Trouvé" },
  "Bronze": { tr: "Bronz", en: "Bronze", fr: "Bronze" },
  "Ceramic Smoke Firing": { tr: "Seramik (Dumanlı Pişirim)", en: "Ceramic (Smoke Firing)", fr: "Céramique (Cuisson à la fumée)" },
  "Stainless Steel": { tr: "Paslanmaz Çelik", en: "Stainless Steel", fr: "Acier Inoxydable" }
};

const exhibitionHistoryData = [
  { year: "2000", events: ["Rotary Club Seramik Yarışması - Filiz Sarper Özel Ödülü / İZMİR", "Turgut Pura Vakfı Heykel Yarışması - Sergileme / İZMİR", "Çanakkale Seramik Gençlik Sempozyumu - Katılım Diploması / ÇANAKKALE"] },
  { year: "2001", events: ["Turgut Pura Vakfı Heykel Yarışması - 1.'lik Ödülü / İZMİR", "Çalıştay (Workshop) - Buluşma / MANİSA"] },
  { year: "2002", events: ["Rotary Club Seramik Yarışması - Teşekkür Plaketi / İZMİR", "Turgut Pura Vakfı Heykel Yarışması - Selçuk Müzesi Artemis Ödülü / İZMİR", "Muammer Çakı Seramik Yarışması - Sergileme / ESKİŞEHİR", "Uluslararası Kahire Seramik Bienali - Jüri Gençlik Ödülü / MISIR"] },
  { year: "2003", events: ["Turgut Pura Vakfı Heykel Yarışması - 1.'lik Ödülü / İZMİR", "T.C. Kültür Bakanlığı Devlet Resim ve Heykel Sergisi - ANKARA / İSTANBUL / İZMİR", "Dokuz Eylül Üniversitesi Güzel Sanatlar Fakültesi Karma Sergi / İZMİR", "Uluslararası Buenos Aires Seramik Bienali / ARJANTİN"] },
  { year: "2004", events: ["T.C. Kültür Bakanlığı Devlet Resim ve Heykel Sergisi - ANKARA / İSTANBUL / İZMİR", "Karma Sergi - Galeri El Turko, Maya Up Town / İSTANBUL"] },
  { year: "2005", events: ["Uluslararası Paris Maison & Objet Fuarı / FRANSA", "Art İstanbul Uluslararası Modern Sanatlar Fuarı - Galeri Çağla Çabaoğlu / İSTANBUL", "Art İstanbul Heykel Yarışması - Jüri Ödülü / İSTANBUL", "İlk Anıt Heykelini Yaptı / DİDİM"] },
  { year: "2006", events: ["İkili Sergi - Birol Kutadgu, Uğur Çakı - Galeri Çağla Çabaoğlu / İSTANBUL", "Uluslararası Paris Maison & Objet Fuarı / FRANSA", "Karma Sergi - Ertuğrul Ateş, Günseli Kato, Cem Sağbil, Bedri Baykam, Gülveli Kaya, Uğur Çakı - Galeri Çağla Çabaoğlu / ANTALYA", "Kişisel Sergi - The Marmara Hotel / BODRUM", "Art Ankara Uluslararası Modern Sanatlar Fuarı - Galeri Piano Piano / ANKARA", "Uluslararası Çağdaş Sanatlar Fuarı - Contemporary Art İstanbul, Galeri Article / İSTANBUL"] },
  { year: "2007", events: ["Kişisel Sergi - The Future - Galeri Çağla Çabaoğlu / İSTANBUL", "Kişisel Sergi - Insects - Les Ottomans Hotel, Galeri Çağla Çabaoğlu / İSTANBUL", "Uluslararası Contemporary İstanbul Sanat Fuarı - Galeri Çağla Çabaoğlu / İSTANBUL"] },
  { year: "2008", events: ["Anıt Heykel - Mövenpick / İZMİR", "Kişisel Sergi - Devinim - Pier / İZMİR", "Uluslararası Contemporary İstanbul Sanat Fuarı - Galeri K2 / İSTANBUL", "Anıt Heykel - Pier / İZMİR", "Kişisel Sergi - Devinim - Plato / İSTANBUL"] },
  { year: "2009", events: ["Uluslararası Contemporary İstanbul Sanat Fuarı - Galeri Çağla Çabaoğlu / İSTANBUL", "Kişisel Sergi - Remanere - Ekav Art Galeri / İSTANBUL", "Kişisel Sergi - Galeri Ardıç Kuşu, Alaçatı / İZMİR", "Kişisel Sergi - Art Room - K2 Güncel Sanatlar Merkezi / İZMİR"] },
  { year: "2010", events: ["Karma Sergi - Genç Ustalar - İyi Galeri, Alaçatı / İZMİR", "Uluslararası Modern Sanatlar Fuarı - Marb Art (Onur Konuğu: Salvador Dali) - Camden Sanat Galerisi, Marbella / İSPANYA", "Kişisel Sergi - Paralel Frekans - Ekav Art Galeri / İSTANBUL", "Uluslararası Contemporary İstanbul Sanat Fuarı - Restoration de Arts / İSTANBUL", "Uluslararası Salon Sergisi - Fransız Güzel Sanatlar Kurumu, Louvre Müzesi Carrousel du Louvre Notre Salonu, Paris / FRANSA", "Karma Sergi - Kağıt İşler - Artium Modern Galeri / İSTANBUL"] },
  { year: "2011", events: ["Karma Sergi - Bir İstanbul Mirası - Bedri Baykam, Uğur Çakı - Lahd Galeri, Londra / İNGİLTERE", "Uluslararası Elite Art Sanat Fuarı - Grimaldi Forum / MONAKO", "Kişisel Sergi - Wine Way Sanat Galerisi, Çeşme / İZMİR", "Uluslararası Contemporary İstanbul Sanat Fuarı - Galeri Çağla Çabaoğlu / İSTANBUL"] },
  { year: "2012", events: ["Kişisel Sergi - Oyun Oynamayı Sevdiğini Biliyorum - Lin Art Galeri / İSTANBUL", "Uluslararası Contemporary İstanbul Sanat Fuarı - Lin Art Galeri / İSTANBUL", "Karma Sergi - Başkalaşım - Agora Galeri, New York / AMERİKA", "Uluslararası Salon Sergisi - Fransız Güzel Sanatlar Kurumu, Louvre Müzesi Carrousel du Louvre Notre Salonu, Paris / FRANSA", "Kişisel Sergi - Hiçbir Yere Yolculuk - Backside Galeri, Marsilya / FRANSA"] },
  { year: "2013", events: ["Uluslararası New York Bienali (Küratör: Pietro Franesi) - New York / AMERİKA", "Venedik Bienali Eşzamanlı Sergisi - Venedik / İTALYA", "Karma Sergi - Elgiz Müzesi / İSTANBUL", "Kişisel Sergi - Backside Gallery, Marsilya / FRANSA", "Kişisel Sergi - Alaçatı Melazoti Gallery, Çeşme / İZMİR", "Contemporary Art İstanbul - Linart Gallery / İSTANBUL"] },
  { year: "2014", events: ["Karma Sergi - Movement - Sumahan Karaköy / İSTANBUL", "Contemporary Art İstanbul - Çağla Çabaoğlu Gallery / İSTANBUL"] },
  { year: "2015", events: ["Contemporary Art İstanbul - Merkür Gallery / İSTANBUL"] },
  { year: "2016", events: ["Kişisel Sergi - Now Is The Time - Sabancı Kültür Merkezi / İZMİR", "Karma Sergi - Point Art - Çağla Çabaoğlu Gallery / İZMİR"] },
  { year: "2017", events: ["Kişisel Sergi - İsimsiz - Cafeco Art Galeri / İZMİR", "Karma Sergi - Confusion - Macao Squad Müzesi, Milano / İTALYA"] },
  { year: "2018", events: ["Karma Sergi - Art in Action - Bellemure Art Project, Paris / FRANSA", "Anıt Heykel - Özel Koleksiyon / İZMİR"] },
  { year: "2019", events: ["Kişisel Sergi - Çakı Müze Evi, Urla / İZMİR", "Kişisel Sergi - Bellemure Art Project, Paris / FRANSA", "Kişisel Sergi - Zamansız - Güzelyalı Kültür Merkezi / İZMİR"] },
  { year: "2020", events: ["Art Capital - Grand Palais, Paris / FRANSA", "Büyük Efes Sanat Günleri - Swiss Hotel / İZMİR", "Nordic Art Fair - Kopenhag / DANİMARKA", "Kişisel Sergi - Nazım Hikmet Kültür Merkezi / İZMİR"] },
  { year: "2021", events: ["Art Capital - Grand Palais Ephemere, Paris / FRANSA", "Karma Sergi - Be Contemporary Art Gallery, Soho House / İSTANBUL", "Karma Sergi - Galerie Sonia Monti, Paris / FRANSA", "Kişisel Sergi - Be Contemporary Art Gallery, Urla / İZMİR"] },
  { year: "2022", events: ["Art Capital - Grand Palais Ephemere, Paris / FRANSA", "Karma Sergi - Awc Gallery / DUBAİ", "Kişisel Sergi - Marvilla Art District, Lizbon / PORTEKİZ", "Art Show Paris - Bastille Center, Paris / FRANSA"] },
  { year: "2023", events: ["Art Capital - Grand Palais Ephemere, Paris / FRANSA", "Karma Sergi - Auguste Rodin ve Genç Ustalar / İNGİLTERE", "Karma Sergi - Miart Gallery, Londra / İNGİLTERE", "Karma Sergi - Caresse Art, Bodrum / MUĞLA"] },
  { year: "2024", events: ["Art Capital - Grand Palais Ephemere, Paris / FRANSA"] }
];

const translations = {
  tr: {
    nav: { home: "Ana Sayfa", about: "Hakkında", gallery: "Galeri", exhibitions: "Sergiler", contact: "İletişim" },
    manifesto: ["HAYATIN ÖZÜNE", "GÖTÜREN YOL", "SANATTIR."],
    heroSubtitle: "BEDENİN, NESNENİN VE DÖNÜŞÜMÜN ARAŞTIRILDIĞI BİR YOLCULUK.",
    sectionLabels: { collection: "01 — KOLEKSİYON", profile: "02 — PROFİL", exhibitions: "03 — SERGİLER & ÖDÜLLER", contact: "04 — İLETİŞİM" },
    about: {
      title: "HAKKINDA",
      bio: "29 Mayıs 1974 doğumlu sanatçı, eğitimini 2005 yılında DEÜ Güzel Sanatlar Fakültesi Seramik Bölümü'nde tamamladı. Eğitimi sırasında pek çok karma sergiye katıldı. 2002 yılında \"Kahire Seramik Bienali\"ne davet edildi ve \"Gençlik Jüri Ödülü\"ne layık görüldü. İlk kişisel sergisini 2006 yılında İstanbul'da açtı.",
      highlights: "Bugüne kadar 40 karma sergiye katılan ve 12 kişisel sergi açan sanatçı, 10 prestijli sanat ödülünün sahibidir. 2010 yılında Louvre Salon sergisine davet edildi ve \"Prix Special\" ile ödüllendirildi. 2013 yılında New York Çağdaş Sanat Bienali'nde onur konuğu olarak ağırlandı.",
      studios: "Sanatçı, çalışmalarını İstanbul ve Urla'daki atölyelerinde sürdürmektedir.",
      quoteTitle: "GEÇİP GİDERKEN NOTLAR",
      quote: "\"Ben de herkes gibi bu formun içinden geçip giden biriyim... Tek farkım; sanatımı kendi dilim olarak kullanıyor olmam... Hem de en sofistike olanını.\""
    },
    gallery: {
      titleLines: ["SERGİLENEN", "ESERLER"],
      intro: "Bedenin, nesnenin ve dönüşümün araştırıldığı heykel çalışmalarından bir seçki. Malzeme, bellek ve anlamın kesiştiği bir an. Bu heykeller cevaplar değil, insanlık durumuyla şekillenen bir yolculuğun izleridir.",
      publicWorksTitle: ["KAMUSAL", "ÇALIŞMALAR"],
      publicWorksText: "Bu eserler galerinin ötesine geçerek çevreyle sürekli diyalog halinde olan eserlerdir. Zaman, ışık ve hareket, bu eserlerin devam eden dönüşümünün bir parçası olarak tanımlanmaktadır.",
    },
    exhibitions: {
      title: "SERGİLER & ÖDÜLLER",
      solo: "Kişisel Sergiler",
      awards: "Ödüller",
      history: "Sergi Geçmişi",
      viewFullHistory: "Geçmiş Sergiler",
      upcoming: "Gelecek Sergiler",
      hideHistory: "Gizle"
    },
    contact: {
      title: "İLETİŞİM",
      manager: "Menajer: Beste Tekelioğlu",
      galleries: "Galeriler",
      formSend: "Gönder",
      placeholders: { name: "İSİM", email: "E-POSTA", message: "MESAJ" }
    },
    interlude: "BEN DE HERKES GİBİ BU FORMUN İÇİNDEN GEÇİP GİDEN BİRİYİM",
    footer: "HEYKEL ARŞİVİ"
  },
  en: {
    nav: { home: "Home", about: "About", gallery: "Gallery", exhibitions: "Exhibitions", contact: "Contact" },
    manifesto: ["ART IS THE PATH", "THAT LEADS TO THE", "ESSENCE OF LIFE."],
    heroSubtitle: "A JOURNEY EXPLORING THE BODY, THE OBJECT, AND TRANSFORMATION.",
    sectionLabels: { collection: "01 — COLLECTION", profile: "02 — THE PROFILE", exhibitions: "03 — EXHIBITIONS & AWARDS", contact: "04 — CONTACT" },
    about: {
      title: "ABOUT",
      bio: "Born in 1974, the artist completed his education in 2005 at DEU Faculty of Fine Arts. In 2002, he was invited to the \"Cairo Ceramics Biennale\" and awarded the \"Youth Jury Award.\" He opened his first solo exhibition in 2006 in Istanbul.",
      highlights: "Recipient of 10 prestigious awards, he was invited to the Louvre Salon in 2010 and received the \"Prix Special.\" In 2013, he was the guest of honor at the New York Contemporary Art Biennale.",
      studios: "The artist continues his work in his studios in Istanbul and Urla.",
      quoteTitle: "NOTES WHILE PASSING THROUGH",
      quote: "\"I am someone passing through this form just like everyone else... My difference is that I use my art as my own language... And the most sophisticated one.\""
    },
    gallery: {
      titleLines: ["EXHIBITED", "WORKS"],
      intro: "A selection of sculpture works exploring the body, the object, and transformation. A moment where material and memory intersect. These sculptures are not answers, but traces of a journey shaped by the human condition.",
      publicWorksTitle: ["PUBLIC", "WORKS"],
      publicWorksText: "These works transcend the gallery's boundaries, remaining in constant dialogue with the environment. Time, light, and movement become part of their ongoing transformation.",
    },
    exhibitions: {
      title: "EXHIBITIONS & AWARDS",
      solo: "Solo Exhibitions",
      awards: "Awards",
      history: "Exhibition History",
      viewFullHistory: "View Full History",
      upcoming: "Upcoming Exhibitions",
      hideHistory: "Hide"
    },
    contact: {
      title: "CONTACT",
      manager: "Manager: Beste Tekelioğlu",
      galleries: "Galeriler",
      formSend: "Send",
      placeholders: { name: "NAME", email: "EMAIL", message: "MESSAGE" }
    },
    interlude: "I AM SOMEONE PASSING THROUGH THIS FORM LIKE EVERYONE ELSE",
    footer: "SCULPTURAL ARCHIVE"
  },
  fr: {
    nav: { home: "Accueil", about: "À Propos", gallery: "Galerie", exhibitions: "Expositions", contact: "Contact" },
    manifesto: ["L'ART EST LE CHEMIN", "VERS L'ESSENCE", "DE LA VIE."],
    heroSubtitle: "UN VOYAGE EXPLORANT LE CORPS, L'OBJET ET LA TRANSFORMATION.",
    sectionLabels: { collection: "01 — COLLECTION", profile: "02 — LE PROFIL", exhibitions: "03 — EXPOSITIONS & PRIX", contact: "04 — CONTACT" },
    about: {
      title: "À PROPOS",
      bio: "Né in 1974, l'artiste a terminé ses études en 2005 à la Faculté des Beaux-Arts DEU. En 2002, il a été invité à la Biennale du Caire and a reçu le Prix du Jury Jeunesse.",
      highlights: "Lauréat de 10 prix prestigieux, il a été invité au Salon du Louvre en 2010 et a reçu le Prix Spécial. En 2013, il était l'invité d'honneur de la Biennale de New York.",
      studios: "L'artiste poursuit son travail dans ses ateliers d'Istanbul et d'Urla.",
      quoteTitle: "NOTES EN PASSANT",
      quote: "\"Je suis quelqu'un qui traverse cette forme como tout le monde... Ma seule différence est que j'utilise l'art como ma propre langue... Et la plus sophistiquée.\""
    },
    gallery: {
      titleLines: ["ŒUVRES", "EXPOSÉES"],
      intro: "Une sélection d'œuvres sculpturales explorant le corps, l'objet et la transformation. Matière, mémoire ve sens. Ces sculptures ne sont pas des réponses, maar les traces d'un voyage façonné par la condition humaine.",
      publicWorksTitle: ["ŒUVRES", "PUBLIQUES"],
      publicWorksText: "Ces œuvres transcendent les limites de la galerie, restant en dialogue constant with l'environnement. Le temps, la lumière et le movement font partie de leur transformation continue.",
    },
    exhibitions: {
      title: "EXPOSITIONS & PRIX",
      solo: "Expositions Personnelles",
      awards: "Prix",
      history: "Historique",
      viewFullHistory: "Voir l'historique complet",
      upcoming: "Expositions à Venir",
      hideHistory: "Masquer"
    },
    contact: {
      title: "CONTACT",
      manager: "Agent: Beste Tekelioğlu",
      galleries: "Galeries",
      formSend: "Envoyer",
      placeholders: { name: "NOM", email: "E-MAIL", message: "MESSAGE" }
    },
    interlude: "JE SUIS QUELQU'UN QUI TRAVERSE CETTE FORME COMME TOUT LE MONDE",
    footer: "ARCHIVE SCULPTURALE"
  }
};

// --- Helper Functions ---

const getUppercase = (str: string, lang: string) => {
  if (lang === 'tr') {
    return str.toLocaleUpperCase('tr-TR');
  }
  return str.toUpperCase();
};

const getTitleUppercase = (str: string) => {
  return str.toUpperCase(); 
};

// --- Sub-components ---

const FloatingSquares = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const squares = useMemo(() => {
    return Array.from({ length: 20  }).map((_, i) => {
      const size = 20 + Math.random() * 35;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      const speed = 1.6 + Math.random() * 1;
      const opacity = 0.1 + Math.random() * 0.4;
      
      return { id: i, size, initialX, initialY, speed, opacity };
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {squares.map((sq) => (
        <SquareItem key={sq.id} sq={sq} mousePos={mousePos} />
      ))}
    </div>
  );
};

interface SquareData {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  speed: number;
  opacity: number;
}

const SquareItem: React.FC<{ sq: SquareData, mousePos: { x: number, y: number } }> = ({ sq, mousePos }) => {
  const squareRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: sq.initialX, y: sq.initialY });

  useEffect(() => {
    let frameId: number;
    const move = () => {
      setPos(prev => ({
        x: (prev.x + 0.02 * sq.speed) % 110,
        y: (prev.y - 0.02 * sq.speed) < -10 ? 110 : prev.y - 0.02 * sq.speed
      }));
      frameId = requestAnimationFrame(move);
    };
    frameId = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frameId);
  }, [sq.speed]);

  const repulsion = useMemo(() => {
    if (!squareRef.current) return { x: 0, y: 0 };
    const rect = squareRef.current.getBoundingClientRect();
    const sqX = rect.left + sq.size / 2;
    const sqY = rect.top + sq.size / 2;
    
    const dx = mousePos.x - sqX;
    const dy = mousePos.y - sqY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;
    
    if (dist < maxDist) {
      const force = (maxDist - dist) / maxDist;
      return {
        x: -dx * force * 0.5,
        y: -dy * force * 0.5
      };
    }
    return { x: 0, y: 0 };
  }, [mousePos, sq.size]);

  return (
    <motion.div
      ref={squareRef}
      className="absolute bg-[#ede8e2]"
      style={{
        width: sq.size,
        height: sq.size,
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        opacity: sq.opacity,
        x: repulsion.x,
        y: repulsion.y
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    />
  );
};

const AutoSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-sm shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={images[index]} 
            className="w-full h-full object-cover brightness-95 hover:brightness-100 transition-all duration-[2s]"
            alt={`Public Work ${index + 1}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 right-6 flex gap-3 z-10">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`w-8 h-[2px] transition-all duration-500 ${index === i ? 'bg-[#E3BD33] w-12' : 'bg-white/20 hover:bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const SmoothScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 80,
    mass: 2,
    restDelta: 0.001
  });

  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full flex flex-col pointer-events-auto"
      >
        {children}
      </motion.div>
    </>
  );
};

interface GalleryItemProps {
  art: Artwork;
  index: number;
  lang: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ art, index, lang }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const translatedMaterial = materialTranslations[art.materialKey]?.[lang] || art.materialKey;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="relative group aspect-square overflow-hidden bg-[#CDC6BD]/10 rounded-sm shadow-lg"
    >
      <motion.img 
        whileHover={{ scale: 1.1 }}
        src={art.image} 
        alt={art.title} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x800?text=" + art.title;
        }}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-[#343148]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 text-center backdrop-blur-sm">
        <h4 className="text-lg font-bold tracking-tight text-[#E3BD33] leading-tight mb-2 uppercase">
          {getTitleUppercase(art.title)}
        </h4>
        <p className="text-[10px] text-white/70 font-medium tracking-widest mb-3 uppercase">
          {getUppercase(translatedMaterial, lang)}
        </p>
        <div className="flex items-center gap-3 text-[10px] text-white/50 font-normal tracking-[0.1em]">
          <span>{art.dimensions}</span>
          <span className="w-1 h-1 rounded-full bg-[#E3BD33]/30" />
          <span>{art.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ lang, setLang }: { lang: string; setLang: (l: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang as keyof typeof translations];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setIsOpen(false);
      const top = el.offsetTop;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-10 flex justify-between items-center mix-blend-difference pointer-events-auto">
        <div className="text-white text-xl font-bold tracking-[0.4em] cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>UĞUR ÇAKI</div>
        
        <div className="hidden md:flex items-center space-x-10 uppercase text-[10px] tracking-[0.4em] font-bold text-white">
          {Object.entries(t.nav).filter(([key]) => key !== 'home').map(([key, value]) => (
            <button key={key} onClick={() => scrollTo(key)} className="hover:text-[#E3BD33] transition-colors">
              {getUppercase(value, lang)}
            </button>
          ))}
          <div className="flex space-x-4 border-l border-white/20 pl-8 ml-4">
            {['tr', 'en', 'fr'].map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l)} 
                className={`transition-all ${lang === l ? 'text-[#E3BD33] font-bold border-b border-[#E3BD33]' : 'opacity-40 hover:opacity-100'}`}
              >
                {getUppercase(l, lang)}
              </button>
            ))}
          </div>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Darkened Overlay to create the "Paspartu" look */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-[105] backdrop-blur-sm"
            />
            
            {/* Menu Card with Paspartu (m-6) and inner black border */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-6 bg-[#F4F5F0] flex flex-col justify-center items-center space-y-10 uppercase tracking-widest z-[110] shadow-2xl overflow-hidden"
            >
              {/* Inner black border (frame) */}
              <div className="absolute inset-4 border border-black pointer-events-none" />
              
              <button className="absolute top-10 right-8 text-[#343148] z-[111]" onClick={() => setIsOpen(false)}>
                <X size={32} />
              </button>
              
              <div className="flex flex-col items-center space-y-6 relative z-[111]">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button 
                    key={key} 
                    onClick={() => scrollTo(key)} 
                    className="text-[18px] text-[#343148] font-regular hover:text-[#E3BD33] transition-colors"
                  >
                    {getUppercase(value, lang)}
                  </button>
                ))}
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex space-x-6 pt-10 border-t border-[#343148]/10 w-2/3 justify-center relative z-[111]">
                {['tr', 'en', 'fr'].map((l) => (
                  <button 
                    key={l} 
                    onClick={() => { setLang(l); setIsOpen(false); }} 
                    className={`text-xs tracking-[0.4em] transition-all pb-2 ${lang === l ? 'text-[#E3BD33] font-bold border-b-2 border-[#E3BD33]' : 'text-[#343148]/40'}`}
                  >
                    {getUppercase(l, lang)}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [lang, setLang] = useState('tr');
  const t = translations[lang as keyof typeof translations];
  
  const { scrollY } = useScroll();
  const stickyTextY = useTransform(scrollY, [0, 1000], [0, 800]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  
  return (
    <div className="bg-[#F4F5F0] text-[#343148] min-h-screen selection:bg-[#E2552D] selection:text-white font-normal">
      <Navbar lang={lang} setLang={setLang} />

      <SmoothScrollWrapper>
        {/* Section: Home */}
        <section id="home" className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#343148]">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://static.wixstatic.com/media/784d0e_1528dca85e394fb79c6a09b2dd41231e~mv2.png" 
              className="w-full h-full object-cover grayscale opacity-80 brightness-75"
              alt="Uğur Çakı"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F4F5F0]/20 via-[#343148]/50 to-[#343148]/80" />
          </div>

          <FloatingSquares />

          <motion.div 
            style={{ y: stickyTextY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-20 text-center px-6 max-w-5xl"
          >
            <h1 className={`text-4xl md:text-[44pt] font-bold uppercase tracking-[-0.02em] text-[#F4F5F0] drop-shadow-2xl mb-8
              ${lang === 'tr' ? 'leading-[1.0]' : 'leading-[0.9]'}`}>
              {t.manifesto.map((line, i) => (
                <span key={i} className="block last:text-[#E3BD33]">{getUppercase(line, lang)}</span>
              ))}
            </h1>
            <p className="text-[#F4F5F0]/70 text-[14px] md:text-[16px] tracking-[0.5em] font-medium uppercase mt-4">
              {getUppercase(t.heroSubtitle, lang)}
            </p>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-[1px] bg-[#E3BD33] mx-auto mt-12 opacity-60" 
            />
          </motion.div>
          
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
            <div className="w-px h-16 bg-gradient-to-b from-[#E3BD33] to-transparent animate-pulse" />
          </div>
        </section>

        {/* Section: Gallery */}
        <section id="gallery" className="py-24 md:py-32 bg-[#F4F5F0] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 lg:px-24 relative z-10 mb-8 md:mb-12">
            <motion.div 
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2 }}
               className="max-w-4xl"
            >
              <span className="text-[#E2552D] text-[11px] uppercase tracking-[0.7em] mb-4 block font-bold">{getUppercase(t.sectionLabels.collection, lang)}</span>
              <h2 className="text-[28pt] md:text-[40pt] font-bold mb-8 text-[#343148] tracking-[-0.02em] leading-none uppercase">
                 {t.gallery.titleLines.map((line, idx) => (
                   <span key={idx} className="block">{getUppercase(line, lang)}</span>
                 ))}
              </h2>
              <div className="flex items-start gap-8">
                <div className="w-12 h-[1px] bg-[#E3BD33] mt-4 flex-shrink-0" />
                <p className="text-[12pt] md:text-[16pt] text-[#343148]/70 font-normal leading-relaxed max-w-2xl italic">
                  {t.gallery.intro}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-7xl mx-auto px-8 lg:px-24 gap-8 md:gap-12 relative">
               {artworks.map((art, i) => (
                 <GalleryItem key={i} art={art} index={i} lang={lang} />
               ))}
          </div>
        </section>

        {/* Section: Public Works */}
        <section id="public-works" className="py-24 md:py-48 bg-[#F4F5F0] relative overflow-hidden border-t border-[#343148]/5 px-4 md:px-8 lg:grid lg:px-12">
          <div className="w-full max-w-[1600px] mx-auto relative z-10 border border-[#343148]/20 p-6 md:p-12 lg:p-24 rounded-sm">
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <motion.div 
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1.2 }}
                   className="flex flex-col items-center md:items-start"
                >
                   <h3 className="text-[28pt] md:text-[40pt] font-bold mb-12 text-[#343148] leading-[0.85] tracking-[-0.02em] uppercase text-center md:text-left">
                     {t.gallery.publicWorksTitle.map((word, idx)=>(<span key={idx} className="block">{getUppercase(word, lang)}</span>))}
                   </h3>
                   <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                      <div className="w-12 h-[1px] bg-[#E3BD33] md:mt-4 flex-shrink-0" />
                      <p className="text-[12pt] md:text-[16pt] text-[#343148]/70 font-normal leading-relaxed italic text-center md:text-left">
                        {t.gallery.publicWorksText}
                      </p>
                   </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                   <AutoSlider images={publicWorksImages} />
                </motion.div>
             </div>
          </div>
        </section>

        {/* Section: Interlude */}
        <section className="relative h-screen w-full bg-[#343148] overflow-hidden flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full flex overflow-hidden"
          >
            <motion.div 
              className="flex h-full w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 40, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              <img 
                src="https://static.wixstatic.com/media/784d0e_11e4093fab1447be99e54c2c8d664a8c~mv2.png" 
                className="h-full w-auto max-w-none object-cover"
                alt="Interlude Artwork Part 1"
              />
              <img 
                src="https://static.wixstatic.com/media/784d0e_11e4093fab1447be99e54c2c8d664a8c~mv2.png" 
                className="h-full w-auto max-w-none object-cover"
                alt="Interlude Artwork Part 2"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#343148] via-transparent to-transparent opacity-60" />
          </motion.div>
          
          <div className="absolute bottom-20 left-0 w-full px-8 md:px-24 text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="font-normal leading-tight tracking-[0.3em] uppercase text-[14px] md:text-[16pt]"
              style={{ color: '#F4F5F0' }}
            >
              {getUppercase(t.interlude, lang)}
            </motion.h3>
          </div>
        </section>

        {/* Section: About */}
        <section id="about" className="py-24 md:py-48 px-8 lg:px-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
              <div className="aspect-[3/4] bg-[#CDC6BD]/10 overflow-hidden rounded-sm shadow-2xl relative">
                <img src="https://static.wixstatic.com/media/784d0e_7586edda0e4f4875aeceb351edeafdd6~mv2.png" className="w-full h-full object-cover grayscale brightness-95" alt="Uğur Çakı Profile" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
              <span className="text-[#E2552D] text-[11px] uppercase tracking-[0.6em] mb-6 block font-bold">{getUppercase(t.sectionLabels.profile, lang)}</span>
              <h2 className="text-[28pt] md:text-[40pt] font-bold mb-12 text-[#343148] tracking-[-0.02em] leading-none">{getUppercase(t.about.title, lang)}</h2>
              <div className="space-y-8 text-[12pt] md:text-[16pt] font-normal leading-relaxed text-[#343148]/80">
                <p>{t.about.bio}</p>
                <p>{t.about.highlights}</p>
                <p className="text-sm text-[#343148]/40 italic tracking-widest uppercase">{t.about.studios}</p>
              </div>
              
              <div className="mt-20 pt-16 border-t border-[#343148]/10 italic relative">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-[2px] bg-[#E3BD33]" />
                   <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#E3BD33] font-bold">{getUppercase(t.about.quoteTitle, lang)}</h4>
                 </div>
                 <p className="text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[#343148] leading-tight">
                   {t.about.quote}
                 </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section: Awards & Exhibitions */}
        <section id="exhibitions" className="bg-[#F4F5F0]">
          {/* Block 1: Awards */}
          <div className="py-24 md:py-48 px-8 lg:px-24 border-b border-[#343148]/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="lg:w-1/2"
              >
                <div className="aspect-[4/5] bg-[#CDC6BD]/10 overflow-hidden rounded-sm shadow-2xl relative group">
                  <img 
                    src="https://static.wixstatic.com/media/784d0e_07be1424f55f4771a343235609614767~mv2.webp" 
                    className="w-full h-full object-cover brightness-90 transition-all duration-1000" 
                    alt="Uğur Çakı Awards" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#343148]/40 to-transparent opacity-60" />
                </div>
              </motion.div>

              {/* Content Column */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <span className="text-[#E2552D] text-[11px] uppercase tracking-[0.6em] mb-6 block font-bold">{getUppercase(t.sectionLabels.exhibitions, lang)}</span>
                <h3 className="text-[28pt] md:text-[40pt] font-bold mb-12 text-[#343148] tracking-[-0.02em] leading-tight uppercase">{getUppercase(t.exhibitions.awards, lang)}</h3>
                <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 scrollbar-custom">
                  {awardsData.slice().reverse().map((award, idx) => (
                    <div key={idx} className="border-b border-[#343148]/10 pb-6">
                      <span className="text-[#E2552D] font-bold text-lg">{award.year}</span>
                      <h4 className="text-[14pt] md:text-2xl font-bold tracking-[-0.02em] mt-2 text-[#343148] leading-tight">{getTitleUppercase(award.title)}</h4>
                      <p className="text-[#343148]/50 uppercase tracking-widest text-[9px] mt-2 font-normal">{getTitleUppercase(award.location)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Past Exhibitions */}
          <div className="py-24 md:py-48 px-8 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 lg:gap-24">
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="lg:w-1/2"
              >
                <div className="aspect-[4/5] bg-[#CDC6BD]/10 overflow-hidden rounded-sm shadow-2xl relative group">
                  <img 
                    src="https://static.wixstatic.com/media/784d0e_6a4f4fc6bdc94e22a208eff72f967bdf~mv2.webp" 
                    className="w-full h-full object-cover brightness-90 transition-all duration-1000" 
                    alt="Uğur Çakı Past Exhibitions" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#343148]/40 to-transparent opacity-60" />
                </div>
              </motion.div>

              {/* Content Column */}
              <div className="lg:w-1/2">
                <span className="text-[#E2552D] text-[11px] uppercase tracking-[0.6em] mb-6 block font-bold">{getUppercase(t.nav.exhibitions, lang)}</span>
                <h3 className="text-[28pt] md:text-[40pt] font-bold mb-12 text-[#343148] tracking-[-0.02em] leading-tight uppercase">{getUppercase(t.exhibitions.viewFullHistory, lang)}</h3>
                
                <div className="space-y-12 max-h-[800px] overflow-y-auto pr-8 scrollbar-custom">
                  {exhibitionHistoryData.slice().reverse().map((group, idx) => (
                    <div key={idx} className="space-y-6">
                      <h4 className="text-[13.5pt] md:text-2xl font-bold text-[#E3BD33] border-b border-[#E3BD33]/30 pb-4 inline-block">{group.year}</h4>
                      <ul className="space-y-4">
                        {group.events.map((event, eIdx) => (
                          <li key={eIdx} className="text-[#343148]/80 text-[12pt] md:text-sm font-normal leading-relaxed">• {event}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Upcoming Exhibitions */}
          <div className="py-24 md:py-48 px-8 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[#E2552D] text-[11px] uppercase tracking-[0.6em] mb-6 block font-bold">{getUppercase(t.nav.exhibitions, lang)}</span>
                <h3 className="text-[28pt] md:text-[40pt] font-bold text-[#343148] tracking-[-0.02em] leading-tight uppercase">{getUppercase(t.exhibitions.upcoming, lang)}</h3>
                <div className="w-24 h-px bg-[#E3BD33] mx-auto mt-8 opacity-40" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  "https://static.wixstatic.com/media/784d0e_3f37aa0ea6494c5ca24d4b7ca94558d6~mv2.webp",
                  "https://static.wixstatic.com/media/784d0e_cb16deeb65c9496da8d749edb3d0deee~mv2.webp",
                  "https://static.wixstatic.com/media/784d0e_6466cfdc87c2482285cb138295c6f32c~mv2.webp"
                ].map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl bg-[#CDC6BD]/10"
                  >
                    <img 
                      src={img} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                      alt={`Upcoming Exhibition ${idx + 1}`} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" className="py-24 md:py-48 px-8 lg:px-24 bg-[#343148] text-white relative overflow-hidden">
          <FloatingSquares />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-20">
            <div>
              <span className="text-[#E3BD33] text-[11px] uppercase tracking-[0.8em] mb-8 block font-bold">{getUppercase(t.sectionLabels.contact, lang)}</span>
              <h2 className="text-[28pt] md:text-[40pt] font-bold mb-16 tracking-[-0.02em] leading-none">{getUppercase(t.contact.title, lang)}</h2>
              <div className="space-y-12">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#E3BD33] mb-4">{t.contact.manager}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-6 font-normal">{getUppercase(t.contact.galleries, lang)}</h4>
                  <div className="text-xl font-normal space-y-4 opacity-80 uppercase tracking-widest">
                    <p>{getTitleUppercase("Miart Gallery — London")}</p>
                    <p>{getTitleUppercase("Caresse Art — Bodrum")}</p>
                    <p>{getTitleUppercase("Bap Gallery — Paris")}</p>
                  </div>
                </div>
                <div className="flex space-x-10 pt-10">
                  <a 
                    href="https://www.instagram.com/ugurcaki/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#E3BD33] transition-colors"
                  >
                    <Instagram size={36} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-12 md:p-16 rounded-sm border border-white/10 shadow-2xl backdrop-blur-lg">
              <form className="space-y-12" onSubmit={e => e.preventDefault()}>
                <div className="relative group">
                  <input placeholder={getUppercase(t.contact.placeholders.name, lang)} className="w-full bg-transparent border-b border-white/20 py-6 outline-none focus:border-[#E3BD33] text-sm uppercase tracking-widest placeholder-white/20 transition-all font-normal" />
                </div>
                <div className="relative group">
                  <input placeholder={getUppercase(t.contact.placeholders.email, lang)} className="w-full bg-transparent border-b border-white/20 py-6 outline-none focus:border-[#E3BD33] text-sm uppercase tracking-widest placeholder-white/20 transition-all font-normal" />
                </div>
                <div className="relative group">
                  <textarea placeholder={getUppercase(t.contact.placeholders.message, lang)} rows={4} className="w-full bg-transparent border-b border-white/20 py-6 outline-none focus:border-[#E3BD33] text-sm uppercase tracking-widest resize-none placeholder-white/20 transition-all font-normal" />
                </div>
                <button className="group w-full bg-[#E3BD33] text-[#343148] font-bold py-8 text-xl flex items-center justify-center gap-6 hover:bg-[#E2552D] hover:text-white transition-all shadow-xl">
                  <span>{getUppercase(t.contact.formSend, lang)}</span>
                  <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="py-20 text-center text-[10px] tracking-[1.5em] text-white/10 uppercase bg-[#343148] border-t border-white/5 font-normal">
           &copy; {new Date().getFullYear()} {getUppercase("UĞUR ÇAKI", lang)} — {getUppercase(t.footer, lang)}
        </footer>
      </SmoothScrollWrapper>
      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(52, 49, 72, 0.05);
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #E3BD33;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);