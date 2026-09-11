export type Lang = "en" | "id";

export interface Dict {
  nav: {
    home: string;
    gallery: string;
    albums: string;
    favorites: string;
    about: string;
    add: string;
  };
  common: {
    photo: string;
    photos: string;
    noDate: string;
    browseByMonth: string;
    allPhotos: string;
  };
  hero: {
    eyebrow: string;
    lines: string[];
    outlined: string;
    subtitle: string;
    scroll: string;
  };
  sections: {
    featured: { eyebrow: string; heading: string };
    albums: { eyebrow: string; heading: string };
    favorites: { eyebrow: string; heading: string };
    timeline: { eyebrow: string; heading: string };
    gallery: { eyebrow: string; heading: string };
    favoritesPage: { eyebrow: string; heading: string };
    about: { eyebrow: string; heading: string };
  };
  cta: {
    lines: string[];
    subtitle: string;
    openArchive: string;
    addMemory: string;
  };
  footer: {
    tagline: string;
  };
  gallery: {
    filters: {
      ALL: string;
      RECENT: string;
      FAVORITES: string;
      PEOPLE: string;
      PLACES: string;
      EVENTS: string;
    };
    sort: { Newest: string; Oldest: string };
    sortBy: string;
  };
  album: {
    browseHint: string;
  };
  upload: {
    title: string;
    dropHint: string;
    selectHint: string;
    album: string;
    date: string;
    dateHint: string;
    location: string;
    favorite: string;
    caption: string;
    captionPlaceholder: string;
    save: string;
    saving: string;
    checkingDate: string;
    noDateDetected: string;
    needPhoto: string;
    saved: string;
    errorPrefix: string;
    errorGeneric: string;
  };
  login: {
    welcome: string;
    subtitle: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    google: string;
    forgot: string;
  };
  about: {
    paragraph: string;
  };
  timeline: { year: string; title: string; description: string }[];
  favoritesEmpty: string;
  monthLocale: string;
}

export const translations: Record<Lang, Dict> = {
  en: {
    nav: {
      home: "HOME",
      gallery: "GALLERY",
      albums: "ALBUMS",
      favorites: "FAVORITES",
      about: "ABOUT",
      add: "ADD",
    },
    common: {
      photo: "PHOTO",
      photos: "PHOTOS",
      noDate: "NO DATE",
      browseByMonth: "BROWSE BY MONTH",
      allPhotos: "ALL PHOTOS",
    },
    hero: {
      eyebrow: "PERSONAL ARCHIVE · 2021 — 2026",
      lines: ["SHARED", "MOMENTS", "KEEPING"],
      outlined: "KEEPING",
      subtitle:
        "A private collection of photographs, places, and people — arranged the way you'd lay them out on a desk.",
      scroll: "SCROLL TO EXPLORE",
    },
    sections: {
      featured: {
        eyebrow: "FEATURED MEMORIES",
        heading: "The moments I want to remember.",
      },
      albums: {
        eyebrow: "ALBUMS",
        heading: "Stories, places, and people.",
      },
      favorites: {
        eyebrow: "FAVORITE MOMENTS",
        heading: "The photographs I keep coming back to.",
      },
      timeline: {
        eyebrow: "ARCHIVE TIMELINE",
        heading: "Why I keep photos.",
      },
      gallery: {
        eyebrow: "THE ARCHIVE",
        heading: "Every photograph has a story.",
      },
      favoritesPage: {
        eyebrow: "FAVORITES",
        heading: "The photographs I keep coming back to.",
      },
      about: {
        eyebrow: "ABOUT",
        heading: "Why I keep photos.",
      },
    },
    cta: {
      lines: ["KEEP", "THE", "MOMENTS."],
      subtitle: "Some memories deserve more than a camera roll.",
      openArchive: "OPEN THE ARCHIVE",
      addMemory: "ADD A NEW MEMORY",
    },
    footer: {
      tagline: "PERSONAL MEMORY ARCHIVE",
    },
    gallery: {
      filters: {
        ALL: "ALL",
        RECENT: "RECENT",
        FAVORITES: "FAVORITES",
        PEOPLE: "PEOPLE",
        PLACES: "PLACES",
        EVENTS: "EVENTS",
      },
      sort: {
        Newest: "Newest",
        Oldest: "Oldest",
      },
      sortBy: "SORT BY",
    },
    album: {
      browseHint: "BROWSE — DRAG TO SEE MORE",
    },
    upload: {
      title: "ADDING MEMORIES",
      dropHint: "Drag photos here",
      selectHint: "OR SELECT PHOTOS",
      album: "Album",
      date: "Date",
      dateHint: "Auto-filled from photo EXIF — override if needed",
      location: "Location",
      favorite: "Mark as favorite",
      caption: "Caption",
      captionPlaceholder: "One of those days I wish I could replay.",
      save: "SAVE MEMORIES",
      saving: "SAVING…",
      checkingDate: "Checking date…",
      noDateDetected: "No date detected",
      needPhoto: "Add at least one photo first.",
      saved: "Memories saved.",
      errorPrefix: "Something went wrong:",
      errorGeneric: "Something went wrong while saving.",
    },
    login: {
      welcome: "Welcome back.",
      subtitle: "Your memories are waiting.",
      email: "EMAIL",
      password: "PASSWORD",
      signIn: "SIGN IN",
      signingIn: "SIGNING IN…",
      google: "CONTINUE WITH GOOGLE",
      forgot: "FORGOT PASSWORD?",
    },
    about: {
      paragraph:
        "Photographs preserve moments that cannot be repeated — a light, a face, a place exactly as it was for one afternoon. This archive exists so those moments aren't left to scroll past in a camera roll, but kept somewhere they can be revisited on purpose.",
    },
    timeline: [
      { year: "2021", title: "First memories", description: "Where the archive begins." },
      { year: "2022", title: "New places", description: "A year of first trips." },
      { year: "2023", title: "Important people", description: "The faces that stayed." },
      { year: "2024", title: "New chapter", description: "Everything changed, quietly." },
      { year: "2025", title: "More moments", description: "Small adventures, often." },
      { year: "2026", title: "Still collecting memories", description: "The archive continues." },
    ],
    favoritesEmpty:
      "No favorites yet — tap the heart on any photograph to keep it here.",
    monthLocale: "en-US",
  },
  id: {
    nav: {
      home: "BERANDA",
      gallery: "GALERI",
      albums: "ALBUM",
      favorites: "FAVORIT",
      about: "TENTANG",
      add: "TAMBAH",
    },
    common: {
      photo: "FOTO",
      photos: "FOTO",
      noDate: "TANPA TANGGAL",
      browseByMonth: "JELAJAHI PER BULAN",
      allPhotos: "SEMUA FOTO",
    },
    hero: {
      eyebrow: "ARSIP PRIBADI · 2021 — 2026",
      lines: ["MOMEN", "BERSAMA", "DIKENANG"],
      outlined: "DIKENANG",
      subtitle:
        "Koleksi pribadi foto, tempat, dan orang-orang — disusun seperti kamu menatanya di atas meja.",
      scroll: "GULIR UNTUK MENJELAJAH",
    },
    sections: {
      featured: {
        eyebrow: "MOMEN PILIHAN",
        heading: "Momen yang ingin selalu kuingat.",
      },
      albums: {
        eyebrow: "ALBUM",
        heading: "Cerita, tempat, dan orang-orang.",
      },
      favorites: {
        eyebrow: "MOMEN FAVORIT",
        heading: "Foto yang selalu ingin kulihat lagi.",
      },
      timeline: {
        eyebrow: "LINI MASA ARSIP",
        heading: "Kenapa aku menyimpan foto.",
      },
      gallery: {
        eyebrow: "ARSIP",
        heading: "Setiap foto punya ceritanya sendiri.",
      },
      favoritesPage: {
        eyebrow: "FAVORIT",
        heading: "Foto yang selalu ingin kulihat lagi.",
      },
      about: {
        eyebrow: "TENTANG",
        heading: "Kenapa aku menyimpan foto.",
      },
    },
    cta: {
      lines: ["SIMPAN", "SETIAP", "MOMEN."],
      subtitle: "Sebagian kenangan pantas mendapat lebih dari sekadar galeri ponsel.",
      openArchive: "BUKA ARSIP",
      addMemory: "TAMBAH KENANGAN BARU",
    },
    footer: {
      tagline: "ARSIP KENANGAN PRIBADI",
    },
    gallery: {
      filters: {
        ALL: "SEMUA",
        RECENT: "TERBARU",
        FAVORITES: "FAVORIT",
        PEOPLE: "ORANG",
        PLACES: "TEMPAT",
        EVENTS: "ACARA",
      },
      sort: {
        Newest: "Terbaru",
        Oldest: "Terlama",
      },
      sortBy: "URUTKAN",
    },
    album: {
      browseHint: "JELAJAHI — GESER UNTUK LIHAT LEBIH BANYAK",
    },
    upload: {
      title: "MENAMBAH KENANGAN",
      dropHint: "Seret foto ke sini",
      selectHint: "ATAU PILIH FOTO",
      album: "Album",
      date: "Tanggal",
      dateHint: "Terisi otomatis dari EXIF foto — bisa diubah bila perlu",
      location: "Lokasi",
      favorite: "Tandai sebagai favorit",
      caption: "Keterangan",
      captionPlaceholder: "Salah satu hari yang ingin kuulangi.",
      save: "SIMPAN KENANGAN",
      saving: "MENYIMPAN…",
      checkingDate: "Memeriksa tanggal…",
      noDateDetected: "Tanggal tidak terdeteksi",
      needPhoto: "Tambahkan minimal satu foto dulu.",
      saved: "Kenangan tersimpan.",
      errorPrefix: "Terjadi kesalahan:",
      errorGeneric: "Terjadi kesalahan saat menyimpan.",
    },
    login: {
      welcome: "Selamat datang kembali.",
      subtitle: "Kenanganmu sudah menunggu.",
      email: "EMAIL",
      password: "KATA SANDI",
      signIn: "MASUK",
      signingIn: "MASUK…",
      google: "LANJUTKAN DENGAN GOOGLE",
      forgot: "LUPA KATA SANDI?",
    },
    about: {
      paragraph:
        "Foto menyimpan momen yang tidak bisa terulang — cahaya, wajah, tempat, persis seperti adanya di satu sore itu. Arsip ini ada supaya momen-momen itu tidak sekadar lewat begitu saja di galeri ponsel, tapi tersimpan di tempat yang bisa dibuka kembali kapan pun.",
    },
    timeline: [
      { year: "2021", title: "Kenangan pertama", description: "Tempat arsip ini dimulai." },
      { year: "2022", title: "Tempat-tempat baru", description: "Setahun penuh perjalanan pertama." },
      { year: "2023", title: "Orang-orang penting", description: "Wajah-wajah yang tetap tinggal." },
      { year: "2024", title: "Babak baru", description: "Semua berubah, perlahan." },
      { year: "2025", title: "Lebih banyak momen", description: "Petualangan kecil, lebih sering." },
      { year: "2026", title: "Masih terus mengumpulkan kenangan", description: "Arsip ini terus berlanjut." },
    ],
    favoritesEmpty:
      "Belum ada favorit — ketuk ikon hati pada foto mana pun untuk menyimpannya di sini.",
    monthLocale: "id-ID",
  },
};
