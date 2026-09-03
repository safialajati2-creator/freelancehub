# FreelanceHub

**React, Vite, Tailwind CSS, React Router ve Framer Motion** ile geliştirilmiş iki taraflı bir **freelance marketplace frontend prototipi**. Uygulama iki ayrı kullanıcı deneyimi üzerine kuruludur: **Müşteri / İş İlanı Veren** ve **Freelancer**.

[English README](README.md)

## Proje Hakkında

FreelanceHub, aynı platform içinde iki farklı role özel navigasyon, iş akışları ve yönetim araçları sunar. Müşteriler proje yayınlayıp yönetebilir, freelancer başvurularını inceleyebilir, adaylarla iletişim kurabilir, teklifleri onaylayabilir veya reddedebilir ve simüle edilmiş ödeme sürecini yönetebilir. Freelancerlar ise iş fırsatlarını keşfedebilir, ilanları kaydedebilir, teklif gönderebilir, başvuru durumlarını takip edebilir, profesyonel profil ve servislerini yönetebilir ve kazanç geçmişini görüntüleyebilir.

> **Proje kapsamı:** Bu repository frontend/client-side bir prototiptir. Kimlik doğrulama, başvurular, bildirimler, proje durumları, mesajlar, kazançlar ve ödemeler tarayıcıdaki `localStorage` ile simüle edilir. Gerçek bir backend, veritabanı, production authentication servisi veya ödeme altyapısı bağlı değildir.

## Uygulama Görünümü

<p align="center"><img src="docs/images/home-dashboard.png" width="900" alt="FreelanceHub ana sayfa" /></p>

## İki Farklı Kullanıcı Deneyimi

### Müşteri / İş İlanı Veren

`Kayıt / Giriş → Proje Oluştur → Başvuruları Al → Teklifi İncele → Mesajlaş → Onayla / Reddet → Simüle Ödeme → Ödeme Geçmişi`

### Freelancer

`Kayıt / Giriş → İş Bul → Projeyi Kaydet / Aç → Teklif Gönder → Teklif Durumunu Takip Et → Mesajlaş → Onay → Kazanç Geçmişi`

### İş Bulma ve Başvuru

<table><tr><td width="50%"><img src="docs/images/find-work.png" alt="İş bulma sayfası" /></td><td width="50%"><img src="docs/images/job-application-modal.png" alt="İş başvuru penceresi" /></td></tr><tr><td align="center"><b>Find Work</b></td><td align="center"><b>Proje Başvurusu</b></td></tr></table>

### İşleri Kaydetme ve Teklif Takibi

<table><tr><td width="50%"><img src="docs/images/saved-jobs.png" alt="Kaydedilen işler" /></td><td width="50%"><img src="docs/images/my-proposals.png" alt="Tekliflerim" /></td></tr><tr><td align="center"><b>Saved Jobs</b></td><td align="center"><b>My Proposals</b></td></tr></table>

### Freelancer İş Araçları

<table><tr><td width="50%"><img src="docs/images/freelancer-services.png" alt="Freelancer servisleri" /></td><td width="50%"><img src="docs/images/freelancer-profile.png" alt="Freelancer profili" /></td></tr><tr><td align="center"><b>Servisler</b></td><td align="center"><b>Profesyonel Profil</b></td></tr></table>

### Kazanç Takibi

<p align="center"><img src="docs/images/earnings.png" width="900" alt="Freelancer kazanç geçmişi" /></p>

## Öne Çıkan Özellikler

- Müşteri ve freelancer için rol bazlı kayıt ve navigasyon
- Client-side giriş ve korumalı rotalar
- Proje oluşturma ve proje yönetimi
- Arama ve kategori filtreleme ile iş keşfi
- Kaydedilen işler ve teklif gönderme
- Aynı projeye tekrar başvuru koruması ve teklif durum takibi
- Müşteri tarafından teklif onaylama / reddetme
- Prototip mesajlaşma ve simüle edilmiş ödeme akışı
- Freelancer kazanç geçmişi ve müşteri ödeme geçmişi
- Bildirim, profil, hesap ve servis yönetimi
- Tailwind CSS ile responsive arayüz ve Framer Motion animasyonları

## Teknolojiler

| Alan | Teknoloji |
| --- | --- |
| Frontend | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 7 |
| Animasyon | Framer Motion |
| State / Veri Saklama | React state + `localStorage` |
| Kod Kontrolü | ESLint |

## Lokal Çalıştırma

```bash
git clone https://github.com/safialajati2-creator/freelancehub.git
cd freelancehub
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Mevcut Sınırlamalar

Bu proje production backend altyapısından ziyade frontend mimarisi ve ürün akışlarını göstermeyi amaçlar. Authentication simüle edilir, tarayıcıda parola saklama production için güvenli değildir, veriler cihaza özeldir, mesajlaşma realtime değildir ve ödeme sistemi gerçek para transferi yapmaz. Production sürümü backend API, veritabanı, güvenli authentication/authorization, server-side validation, dosya depolama, realtime messaging ve gerçek ödeme sağlayıcısı gerektirir.

## Bu Proje Neyi Gösteriyor?

FreelanceHub; **routing, reusable component yapısı, rol bazlı kullanıcı deneyimi, form yönetimi, browser persistence, proje/başvuru iş akışları, arama ve filtreleme, responsive arayüz ve state-driven UI davranışları** konusunda pratik frontend geliştirme becerilerini gösterir.

## Geliştirici

Software Developer

[GitHub](https://github.com/safialajati2-creator) · [LinkedIn](https://www.linkedin.com/in/mustafa-alajati-8a1aa4286/?isSelfProfile=true) · [Email](mailto:Safialajati2@gmail.com)
