import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { arByEn, deByEn, dictFromEn, ruByEn, zhByEn } from './locale-by-en.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tr = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/locales/tr.json'), 'utf-8'))

const SKIP_KEYS = new Set([
  'slug', 'href', 'id', 'icon', 'platform', 'image', 'ogImage', 'mapEmbed', 'order',
  'category', 'year', 'value', 'suffix', 'foundedYear', 'domain', 'companyName',
  'logoText', 'primaryPhone', 'primaryEmail', 'enabled', 'type',
])

const en = {
  'Ana Sayfa': 'Home', 'Hakkımızda': 'About Us', 'Hizmetler': 'Services', 'Projeler': 'Projects', 'İletişim': 'Contact',
  'Mamon | Emlak, İnşaat ve Turizm': 'Mamon | Real Estate, Construction & Tourism',
  "2010'dan bu yana emlak, yatay mimari inşaat ve turizm alanlarında güvenilir çözüm ortağınız. mamon.com.tr": 'Your trusted partner in real estate, horizontal architecture construction and tourism since 2010. mamon.com.tr',
  'mamon': 'mamon', 'emlak': 'real estate', 'inşaat': 'construction', 'turizm': 'tourism', 'yatay mimari': 'horizontal architecture', 'gayrimenkul': 'real estate', 'mamon.com.tr': 'mamon.com.tr',
  'Mamon | Emlak, İnşaat ve Turizm Çözümleri': 'Mamon | Real Estate, Construction & Tourism Solutions',
  "2010'dan bu yana emlak, yatay mimari inşaat ve turizm alanlarında kurumsal hizmet. Güven, kalite ve sürdürülebilir değer.": 'Corporate services in real estate, horizontal architecture and tourism since 2010. Trust, quality and sustainable value.',
  'Hakkımızda | Mamon': 'About Us | Mamon',
  '2010 yılından bu yana emlak, inşaat ve turizm sektörlerinde güvenilir kurumsal hizmet anlayışı.': 'Trusted corporate service in real estate, construction and tourism since 2010.',
  'Hizmetlerimiz | Mamon': 'Our Services | Mamon',
  'Emlak danışmanlığı, yatay mimari inşaat projeleri ve turizm yatırımları — Mamon\'un üç ana hizmet alanı.': 'Real estate consulting, horizontal architecture projects and tourism investments — Mamon\'s three core service areas.',
  'Projelerimiz | Mamon': 'Our Projects | Mamon',
  'Tamamlanan ve devam eden emlak, inşaat ve turizm projelerimizi keşfedin.': 'Discover our completed and ongoing real estate, construction and tourism projects.',
  'İletişim | Mamon': 'Contact | Mamon',
  'Mamon ile iletişime geçin. Emlak, inşaat ve turizm projeleriniz için uzman ekibimiz yanınızda.': 'Contact Mamon. Our expert team is ready for your real estate, construction and tourism projects.',
  "2010'dan Bu Yana Güvenilir Çözüm Ortağınız": 'Your Trusted Partner Since 2010',
  'Emlak, İnşaat ve Turizmde\nKurumsal Mükemmellik': 'Corporate Excellence in\nReal Estate, Construction & Tourism',
  'Yatay mimari anlayışıyla hayata geçirdiğimiz projeler, stratejik emlak yatırımları ve turizm alanındaki deneyimimizle sürdürülebilir değer üretiyoruz.': 'We create sustainable value through projects built with horizontal architecture, strategic real estate investments and tourism expertise.',
  'Hizmetlerimizi Keşfedin': 'Explore Our Services', 'Bize Ulaşın': 'Contact Us',
  'Yıllık Deneyim': 'Years of Experience', 'Tamamlanan Proje': 'Completed Projects', 'Ana Hizmet Alanı': 'Core Service Areas',
  'Kurumsal Kimlik': 'Corporate Identity', 'Güvene Dayalı, Uzun Vadeli Değer Yaratıyoruz': 'Building Long-Term Value on Trust',
  'Mamon, 2010 yılından bu yana emlak, inşaat ve turizm sektörlerinde faaliyet gösteren, köklü deneyime sahip bir kurumsal yapıdır. Her projede şeffaflık, kalite ve müşteri memnuniyetini ön planda tutuyoruz.': 'Mamon is an established corporate group operating in real estate, construction and tourism since 2010. We prioritize transparency, quality and client satisfaction in every project.',
  'Yatay mimari yaklaşımımızla doğaya saygılı, sürdürülebilir ve modern yaşam alanları tasarlıyor; emlak faaliyetlerimizi mamonestate.com üzerinden, turizm operasyonlarımızı ise rezervasyonyap.com.tr, rezervasyonyap.tr ve reservationinturkey.com platformları üzerinden sürdürüyoruz.': 'With our horizontal architecture approach we design sustainable modern living spaces; real estate via mamonestate.com and tourism via rezervasyonyap.com.tr, rezervasyonyap.tr and reservationinturkey.com.',
  'Bugün Mamon, sektörün güvenilir markalarından biri olarak büyümeye devam ediyor — çünkü her işimizde uzun vadeli ilişkiler kurmayı hedefliyoruz.': 'Today Mamon continues to grow as one of the industry\'s trusted brands — because we aim to build long-term relationships in everything we do.',
  "2010'dan Beri": 'Since 2010', 'Sektörde köklü ve sürdürülebilir büyüme': 'Deep and sustainable growth in the industry',
  'Çok Disiplinli': 'Multi-Disciplinary', 'Emlak, inşaat ve turizm entegrasyonu': 'Real estate, construction and tourism integration',
  'Yatay Mimari': 'Horizontal Architecture', 'Modern, düşük yoğunluklu yaşam alanları': 'Modern, low-density living spaces',
  'Uzmanlık Alanlarımız': 'Our Expertise', 'Üç Sütun, Tek Güven': 'Three Pillars, One Trust',
  'Emlak, inşaat ve turizm alanlarında entegre hizmet anlayışıyla projelerinize değer katıyoruz.': 'We add value to your projects with integrated services across real estate, construction and tourism.',
  'Emlak': 'Real Estate', 'Stratejik gayrimenkul danışmanlığı ve yatırım yönetimi.': 'Strategic real estate consulting and investment management.',
  'Konut, ticari ve arsa yatırımlarında kapsamlı danışmanlık hizmeti sunuyoruz. Pazar analizi, değerleme, portföy yönetimi ve satış-kiralama süreçlerinde uzman ekibimizle yanınızdayız. Emlak faaliyetlerimizi www.mamonestate.com üzerinden yürütüyoruz.': 'We offer comprehensive consulting for residential, commercial and land investments. Our expert team supports market analysis, valuation, portfolio management and sales-leasing. Real estate operations at www.mamonestate.com.',
  'Gayrimenkul danışmanlığı': 'Real estate consulting', 'Yatırım analizi': 'Investment analysis', 'Portföy yönetimi': 'Portfolio management', 'Değerleme hizmetleri': 'Valuation services',
  'İnşaat': 'Construction', 'Yatay mimari ile modern, sürdürülebilir yaşam alanları.': 'Modern, sustainable living spaces with horizontal architecture.',
  'Yatay mimari anlayışıyla villa, rezidans ve karma kullanım projeleri geliştiriyoruz. Doğayla uyumlu, düşük yoğunluklu ve yüksek yaşam kalitesi sunan projeler tasarlıyor ve hayata geçiriyoruz.': 'We develop villas, residences and mixed-use projects with horizontal architecture — low-density, nature-friendly spaces with high quality of life.',
  'Yatay mimari projeler': 'Horizontal architecture projects', 'Villa & rezidans': 'Villas & residences', 'Anahtar teslim inşaat': 'Turnkey construction', 'Proje yönetimi': 'Project management',
  'Turizm': 'Tourism', 'Turizm yatırımları ve konaklama projelerinde uzmanlık.': 'Expertise in tourism investments and hospitality projects.',
  'Turizm tesisleri, butik oteller ve tatil konutları alanında yatırım danışmanlığı ve proje geliştirme hizmetleri sunuyoruz. Rezervasyon ve turizm operasyonlarımızı www.rezervasyonyap.com.tr, www.rezervasyonyap.tr ve www.reservationinturkey.com platformları üzerinden yürütüyoruz.': 'We provide investment consulting and project development for tourism facilities, boutique hotels and holiday homes. Reservations via www.rezervasyonyap.com.tr, www.rezervasyonyap.tr and www.reservationinturkey.com.',
  'Turizm yatırım danışmanlığı': 'Tourism investment consulting', 'Tesis geliştirme': 'Facility development', 'Online rezervasyon platformları': 'Online booking platforms', 'Bölgesel analiz': 'Regional analysis',
  'Rakamlarla Mamon': 'Mamon in Numbers', 'Güvenin Sayılarla Kanıtı': 'Trust Proven by Numbers',
  'Kuruluş Yılı': 'Founded', 'Ana Sektör': 'Core Sectors', 'Mutlu Müşteri': 'Happy Clients',
  'Referanslarımız': 'Our References', 'Öne Çıkan Projeler': 'Featured Projects',
  'Emlak, inşaat ve turizm alanlarında hayata geçirdiğimiz seçili projeler.': 'Selected projects we have delivered in real estate, construction and tourism.',
  'Yatay mimari konseptiyle tasarlanmış lüks villa kompleksi.': 'Luxury villa complex designed with horizontal architecture.',
  'Butik otel ve tatil konutlarından oluşan entegre turizm projesi.': 'Integrated tourism project with boutique hotel and holiday residences.',
  'A sınıfı ticari gayrimenkul yatırım ve yönetim projesi.': 'Class A commercial real estate investment and management project.',
  'Doğayla bütünleşen düşük yoğunluklu konut projesi.': 'Low-density residential project integrated with nature.',
  '5 yıldızlı otel ve spa kompleksi turizm yatırımı.': 'Five-star hotel and spa complex tourism investment.',
  'Premium ofis alanı kiralama ve yönetim projesi.': 'Premium office space leasing and management project.',
  'İstanbul, Türkiye': 'Istanbul, Turkey', 'Muğla, Türkiye': 'Muğla, Turkey', 'Ankara, Türkiye': 'Ankara, Turkey',
  'Bursa, Türkiye': 'Bursa, Turkey', 'Antalya, Türkiye': 'Antalya, Turkey',
  'Neden Mamon?': 'Why Mamon?', 'Kurumsal Güven, Sektörel Derinlik': 'Corporate Trust, Sector Depth',
  '15 yılı aşkın deneyimimizle her projede kalite, şeffaflık ve uzun vadeli değer sunuyoruz.': 'With over 15 years of experience we deliver quality, transparency and long-term value in every project.',
  'Güvenilirlik': 'Reliability', "2010'dan bu yana sektörde edindiğimiz itibar ve referanslarla güven inşa ediyoruz.": 'We build trust through our reputation and references gained since 2010.',
  'Entegre Hizmet': 'Integrated Service', 'Emlak, inşaat ve turizm alanlarını tek çatı altında birleştiren bütüncül yaklaşım.': 'A holistic approach combining real estate, construction and tourism under one roof.',
  'Yatay Mimari Uzmanlığı': 'Horizontal Architecture Expertise', 'Modern, sürdürülebilir ve doğayla uyumlu yaşam alanları tasarlıyoruz.': 'We design modern, sustainable living spaces in harmony with nature.',
  'Uzman Ekip': 'Expert Team', 'Her alanda deneyimli profesyonellerden oluşan multidisipliner kadro.': 'A multidisciplinary team of experienced professionals in every field.',
  'Değer Odaklı': 'Value-Driven', 'Yatırımlarınıza uzun vadeli ve ölçülebilir getiri sağlayan stratejiler.': 'Strategies that deliver long-term, measurable returns on your investments.',
  'Müşteri Odaklılık': 'Client Focus', 'Her projede kişiselleştirilmiş çözümler ve şeffaf iletişim.': 'Personalized solutions and transparent communication in every project.',
  'Projenizi Birlikte Hayata Geçirelim': 'Let\'s Bring Your Project to Life Together',
  'Emlak, inşaat veya turizm alanındaki projeleriniz için uzman ekibimizle tanışın.': 'Meet our expert team for your real estate, construction or tourism projects.',
  'Ücretsiz Danışmanlık Alın': 'Get Free Consultation',
  'Kesikkapı Mahallesi, Çarşı Caddesi, No:254, Fethiye/Muğla': 'Kesikkapı District, Çarşı Street No:254, Fethiye/Muğla',
  'Pazartesi – Cuma: 09:00 – 18:00': 'Monday – Friday: 09:00 – 18:00',
  "2010'dan bu yana emlak, inşaat ve turizm alanlarında güvenilir çözüm ortağınız.": 'Your trusted partner in real estate, construction and tourism since 2010.',
  '© 2026 Mamon. Tüm hakları saklıdır.': '© 2026 Mamon. All rights reserved.',
}

const deFull = dictFromEn(en, deByEn)
const ruFull = dictFromEn(en, ruByEn)
const arFull = dictFromEn(en, arByEn)
const zhFull = dictFromEn(en, zhByEn)

function translateValue(value, dict) {
  if (typeof value === 'string') {
    if (dict[value]) return dict[value]
    // multi-line
    if (value.includes('\n')) {
      return value.split('\n').map((line) => dict[line] ?? line).join('\n')
    }
    return value
  }
  if (Array.isArray(value)) return value.map((v) => translateValue(v, dict))
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k)) out[k] = v
      else out[k] = translateValue(v, dict)
    }
    return out
  }
  return value
}

const locales = { en, de: deFull, ru: ruFull, ar: arFull, zh: zhFull }
const outDir = path.join(__dirname, '../src/data/locales')

for (const [locale, dict] of Object.entries(locales)) {
  const translated = translateValue(tr, dict)
  fs.writeFileSync(path.join(outDir, `${locale}.json`), JSON.stringify(translated, null, 2), 'utf-8')
  console.log(`Wrote ${locale}.json`)
}
