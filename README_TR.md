# FreelanceHub

**React, Vite, Tailwind CSS, React Router ve Framer Motion** ile geliştirilmiş iki taraflı bir **freelance marketplace frontend prototipi**. Uygulama iki ayrı kullanıcı deneyimi üzerine kuruludur: **Müşteri / İş İlanı Veren** ve **Freelancer**.

[English README](README.md)

## Proje Hakkında

FreelanceHub, aynı platform içinde iki farklı role özel navigasyon, iş akışları ve yönetim araçları sunar. Müşteriler proje yayınlayıp yönetebilir, freelancer başvurularını inceleyebilir, adaylarla iletişim kurabilir, teklifleri onaylayabilir veya reddedebilir ve simüle edilmiş ödeme sürecini yönetebilir. Freelancerlar ise iş fırsatlarını keşfedebilir, ilanları kaydedebilir, teklif gönderebilir, başvuru durumlarını takip edebilir, profesyonel profil ve servislerini yönetebilir ve kazanç geçmişini görüntüleyebilir.

> **Proje kapsamı:** Bu repository frontend/client-side bir prototiptir. Kimlik doğrulama, başvurular, bildirimler, proje durumları, mesajlar, kazançlar ve ödemeler tarayıcıdaki `localStorage` ile simüle edilir. Gerçek bir backend, veritabanı, production authentication servisi veya ödeme altyapısı bağlı değildir.

## Uygulama Görünümü

### Ortak Marketplace Deneyimi

<p align="center"><img src="docs/images/home-dashboard.png" width="900" alt="FreelanceHub ana sayfa" /></p>

## İki Farklı Kullanıcı Deneyimi

### Müşteri / İş İlanı Veren

**Müşteri** tarafı freelancer işe almak isteyen kullanıcılar için tasarlanmıştır. Kullanıcı proje oluşturabilir, yayınladığı projeleri yönetebilir, gelen başvuruları inceleyebilir, freelancerlarla mesajlaşabilir, teklifleri onaylayabilir veya reddedebilir ve simüle edilmiş ödeme akışını tamamlayabilir.

**Müşteri akışı**  
`Kayıt / Giriş → Proje Oluştur → Başvuruları Al → Teklifi İncele → Mesajlaş → Onayla / Reddet → Simüle Ödeme → Ödeme Geçmişi`

### Freelancer

**Freelancer** tarafı iş bulma ve freelance faaliyetlerini yönetme üzerine kuruludur. Freelancerlar projeleri arayabilir ve filtreleyebilir, işleri kaydedebilir, proje detaylarını inceleyebilir, teklif gönderebilir, başvurularının durumunu takip edebilir, profil ve servislerini yönetebilir ve kazanç geçmişini görüntüleyebilir.

**Freelancer akışı**  
`Kayıt / Giriş → İş Bul → Projeyi Kaydet / Aç → Teklif Gönder → Teklif Durumunu Takip Et → Mesajlaş → Onay → Kazanç Geçmişi`

### İş Bulma ve Başvuru

<table>
<tr>
<td width="50%"><img src="docs/images/find-work.png" alt="İş bulma sayfası" /></td>
<td width="50%"><img src="docs/images/job-application-modal.png" alt="İş başvuru penceresi" /></td>
</tr>
<tr>
<td align="center"><b>Find Work</b><br/>Projeleri arama ve kategoriye göre filtreleme.</td>
<td align="center"><b>Proje Başvurusu</b><br/>Proje detaylarını inceleme ve teklif gönderme.</td>
</tr>
</table>

### İşleri Kaydetme ve Teklif Takibi

<table>
<tr>
<td width="50%"><img src="docs/images/saved-jobs.png" alt="Kaydedilen işler" /></td>
<td width="50%"><img src="docs/images/my-proposals.png" alt="Tekliflerim" /></td>
</tr>
<tr>
<td align="center"><b>Saved Jobs</b><br/>İlgilenilen işleri daha sonra incelemek için kaydetme.</td>
<td align="center"><b>My Proposals</b><br/>Bekleyen, onaylanan ve reddedilen başvuruları takip etme.</td>
</tr>
</table>

### Freelancer İş Araçları

<table>
<tr>
<td width="50%"><img src="docs/images/freelancer-services.png" alt="Freelancer servisleri" /></td>
<td width="50%"><img src="docs/images/freelancer-profile.png" alt="Freelancer profili" /></td>
</tr>
<tr>
<td align="center"><b>Servisler</b><br/>Freelance hizmetlerini oluşturma ve yönetme.</td>
<td align="center"><b>Profesyonel Profil</b><br/>Uygunluk, yetenekler, eğitim, ücret ve deneyim bilgilerini yönetme.</td>
</tr>
</table>

### Kazanç Takibi

<p align="center"><img src="docs/images/earnings.png" width="900" alt="Freelancer kazanç geçmişi" /></p>

Kazanç ekranı prototip içinde onaylanmış ve ödenmiş freelance çalışmaların client-side kaydını gösterir.

## Öne Çıkan Özellikler

- Müşteri ve freelancer için rol bazlı kayıt ve navigasyon
- Client-side giriş ve korumalı rotalar
- Proje oluşturma ve proje yönetimi
- Arama ve kategori filtreleme ile iş keşfi
- Kaydedilen işler ve teklif gönderme
- Aynı projeye tekrar başvuru koruması
- Teklif durum takibi
- Müşteri tarafından teklif onaylama / reddetme
- Proje katılımcıları arasında prototip mesajlaşma
- Simüle edilmiş ödeme onay akışı
- Freelancer kazanç geçmişi ve müşteri ödeme geçmişi
- Bildirim, profil ve hesap yönetimi
- Freelancer servis oluşturma ve servis görüntüleme
- Tailwind CSS ile responsive arayüz
- Framer Motion animasyonları

## Teknolojiler

| Alan | Teknoloji |
| --- | --- |
| Frontend | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Routing | React Router |
| Animasyon | Framer Motion |
| State / Veri Saklama | React state + `localStorage` |
| Kod Kontrolü | ESLint |

## Önemli Rotalar

| Route | Amaç |
| --- | --- |
| `/` / `/home` | Ana marketplace sayfası |
| `/login` | Giriş |
| `/signup` | Rol bazlı kayıt |
| `/find-work` | Proje arama ve görüntüleme |
| `/saved-jobs` | Kaydedilen işler |
| `/create-project` | Müşteri proje oluşturma |
| `/my-projects` | Müşteri proje ve başvuru yönetimi |
| `/my-proposals` | Freelancer teklif takibi |
| `/my-service` | Freelancer servis yönetimi |
| `/profile` | Freelancer profili |
| `/my-account` | Hesap ayarları |
| `/earnings` | Freelancer kazanç geçmişi |
| `/payments` | Müşteri ödeme geçmişi |

## Lokal Çalıştırma

### Gereksinimler

- Node.js 18+
- npm

```bash
git clone https://github.com/safialajati2-creator/freelancehub.git
cd freelancehub
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Mevcut Sınırlamalar

Bu proje production backend altyapısından ziyade frontend mimarisi ve ürün akışlarını göstermeyi amaçlar. Authentication simüle edilir, tarayıcıda parola saklama production için güvenli değildir, veriler cihaza özeldir, mesajlaşma realtime değildir ve ödeme sistemi gerçek para transferi yapmaz. Production sürümü backend API, veritabanı, güvenli authentication/authorization, server-side validation, dosya depolama, realtime messaging ve gerçek ödeme sağlayıcısı gerektirir.

## Bu Proje Neyi Gösteriyor?

FreelanceHub; **routing, reusable component yapısı, rol bazlı kullanıcı deneyimi, form yönetimi, browser persistence, proje/başvuru iş akışları, arama ve filtreleme, responsive arayüz ve state-driven UI davranışları** konusunda pratik frontend geliştirme becerilerini gösterir. Ayrıca tek uygulama içinde müşteri ve freelancer için farklı ürün deneyimleri tasarlama yaklaşımını sergiler.

## Geliştirici

**Mustafa Alajati**  
Software Engineering Student — Beykoz University, Istanbul, Türkiye
