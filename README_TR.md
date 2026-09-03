# FreelanceHub

**React, Vite, Tailwind CSS, React Router ve Framer Motion** ile geliştirilmiş, portföy sunumuna uygun bir **freelance marketplace frontend prototipi**. Uygulama, **müşteri** ve **freelancer** rollerine göre iki taraflı bir freelance platformunun temel iş akışlarını simüle eder.

> **Proje kapsamı:** Bu repository frontend/client-side bir prototiptir. Kimlik doğrulama, başvurular, bildirimler, proje durumları, mesajlar, kazançlar ve ödemeler tarayıcıdaki `localStorage` ile simüle edilir. Gerçek bir backend, veritabanı, production authentication servisi veya ödeme altyapısı bağlı değildir.

## Öne Çıkan Özellikler

- Müşteri ve freelancer için rol bazlı kayıt
- Client-side giriş ve korumalı rotalar
- Proje oluşturma ve proje yönetimi
- Arama ve kategori filtreleme ile iş keşfi
- Kaydedilen işler
- Teklif gönderme ve teklif durum takibi
- Müşteri tarafından teklif onaylama / reddetme
- Proje katılımcıları arasında prototip mesajlaşma
- Simüle edilmiş ödeme onay akışı
- Freelancer kazanç geçmişi
- Müşteri ödeme geçmişi
- Bildirim sistemi
- Freelancer profil ve hesap yönetimi
- Freelancer servis oluşturma ve servis görüntüleme
- Tailwind CSS ile responsive arayüz
- Framer Motion animasyonları

## Kullanıcı Rolleri

### Müşteri
Müşteriler proje oluşturabilir, gelen başvuruları inceleyebilir, freelancerlarla mesajlaşabilir, teklifleri reddedebilir veya onaylayabilir, simüle edilmiş ödeme işlemini tamamlayabilir ve ödeme geçmişini görüntüleyebilir.

### Freelancer
Freelancerlar projeleri inceleyebilir, arama ve filtreleme yapabilir, işleri kaydedebilir, teklif gönderebilir, teklif durumlarını takip edebilir, profil ve servislerini yönetebilir, proje mesajlaşmasını kullanabilir ve kazanç geçmişini görüntüleyebilir.

## Temel Akışlar

### Müşteri akışı
`Kayıt / Giriş → Proje Oluştur → Başvuruları Al → Teklifi İncele → Mesajlaş → Onayla / Reddet → Simüle Ödeme → Ödeme Geçmişi`

### Freelancer akışı
`Kayıt / Giriş → İş Bul → Projeyi Kaydet / Aç → Teklif Gönder → Teklif Durumunu Takip Et → Mesajlaş → Onay → Kazanç Geçmişi`

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

## LocalStorage Veri Yapısı

Prototipte backend entity'lerini simüle etmek için aşağıdaki browser storage anahtarları kullanılır:

- `users`
- `currentUser`
- `token`
- `projects`
- `applications`
- `savedJobs`
- `deletedProjects`
- `earnings`
- `payments`

Bazı akışlarda local değişikliklerden sonra arayüzü güncellemek için `storageUpdated` browser event'i kullanılır.

## Lokal Çalıştırma

### Gereksinimler

- Node.js 18+ önerilir
- npm

### Kurulum

```bash
git clone <repository-url>
cd freelancehub
npm install
npm run dev
```

Vite terminalde lokal adresi gösterecektir; varsayılan olarak genellikle `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

## Portföy Düzenlemeleri

Portföy sürümü daha anlaşılır ve profesyonel sunulması amacıyla gözden geçirildi. Yapılan başlıca düzenlemeler:

- varsayılan Vite README yerine gerçek proje dokümantasyonu
- ESM proje yapısına uygun Tailwind config düzeltmesi
- route'larda kullanılan fakat dosyaları eksik olan Proposals, Earnings ve Payments sayfalarının tamamlanması
- proje yönetiminde referans verilen eksik mesajlaşma ve ödeme paneli bileşenlerinin tamamlanması
- kullanılmayan starter dosyalarının kaldırılması
- Saved Jobs sayfasındaki tekrarlanan layout wrapper'ının düzeltilmesi
- npm paket adının `freelancehub` olarak düzenlenmesi
- client-side veri saklama ve simüle ödeme sınırlarının açık şekilde belgelenmesi

## Mevcut Sınırlamalar

Bu proje production backend altyapısından ziyade frontend mimarisi ve ürün akışlarını göstermeyi amaçlamaktadır.

- Authentication browser storage ve placeholder token ile simüle edilir.
- `localStorage` içinde parola saklamak **güvenli değildir**; yalnızca prototip kapsamındadır.
- Veriler tarayıcıya özeldir, kullanıcılar veya cihazlar arasında senkronize olmaz.
- Ödemeler simülasyondur; gerçek para transferi yapılmaz.
- Mesajlar realtime backend yerine local olarak tutulur.
- Harici görseller için internet bağlantısı gerekir.
- Production sürümünde API, veritabanı, güvenli authentication/authorization, server-side validation, dosya depolama, realtime messaging ve ödeme entegrasyonu gerekir.

## Bu Proje Neyi Gösteriyor?

Proje; **routing, reusable component yapısı, rol bazlı kullanıcı deneyimi, form yönetimi, browser persistence, proje/başvuru iş akışları, arama ve filtreleme, responsive arayüz ve state-driven UI davranışları** konusunda pratik frontend geliştirme becerilerini gösterir.

Ayrıca gerçek bir marketplace ürününün iş akışlarını çalışan interaktif bir prototipe dönüştürme yaklaşımını sergiler.

## English Documentation

English documentation is available in [README.md](README.md).
