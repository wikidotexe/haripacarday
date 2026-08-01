export type Reason = {
  id: string;
  emoji: string;
  title: string;
  teaser: string;
  body: string;
};

export type QuizOption = {
  label: string;
  score: number;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export type Moment = {
  id: string;
  caption: string;
  note: string;
  image: string;
};

export type Letter = {
  id: string;
  title: string;
  preview: string;
  body: string[];
};

export const REASONS: Reason[] = [
  {
    id: 'r1',
    emoji: '💗',
    title: 'Ketawa Kamu',
    teaser: 'Bahkan lelah seharian bisa hilang cuma dengar suara ketawa kamu.',
    body: 'Ada satu suara yang selalu berhasil bikin hari paling berantakan jadi terasa ringan: ketawa kamu. Nggak peduli seberapa capek, begitu kamu mulai ketawa lepas, semua beban di kepalaku otomatis pindah ke belakang antrian.',
  },
  {
    id: 'r2',
    emoji: '🌸',
    title: 'Sama-sama Paling Waras',
    teaser: 'Kamu bisa marah, tapi tetap milih ngomong baik-baik.',
    body: 'Kita berdua nggak sempurna, tapi kamu selalu milih jalan yang dewasa. Kamu boleh kesal, boleh kecewa, tapi kamu tetap duduk dan bilang "kita bahas pelan-pelan ya". Itu jarang, dan aku nggak pernah menganggapnya biasa saja.',
  },
  {
    id: 'r3',
    emoji: '💜',
    title: 'Teman Ngobrol Terbaik',
    teaser: 'Dari topik receh sampai rencana lima tahun ke depan.',
    body: 'Obrolan kita bisa loncat dari gosip tetangga, teori random tentang alam semesta, sampai rencana kita lima tahun lagi — semuanya dalam satu malam. Nggak pernah ada bagian yang membosankan kalau ngomong sama kamu.',
  },
  {
    id: 'r4',
    emoji: '☕',
    title: 'Perhatian di Detail Kecil',
    teaser: 'Kamu ingat hal-hal yang bahkan aku sendiri lupa.',
    body: 'Kamu ingat aku alergi apa, aku benci kopi yang kemanisan, aku selalu murung tiap Minggu malam. Perhatian sekecil itu yang bikin aku merasa benar-benar diperhatikan, bukan sekadar ditemani.',
  },
  {
    id: 'r5',
    emoji: '✨',
    title: 'Gemesin & Unik',
    teaser: 'Tingkah lucu kamu yang nggak ada duanya.',
    body: 'Cara kamu ngomel sambil senyum, kebiasaan nyanyi salah lirik dengan percaya diri penuh, ekspresi wajah kamu waktu makanannya enak — semua itu paket lengkap yang bikin aku selalu kangen.',
  },
  {
    id: 'r6',
    emoji: '🏡',
    title: 'Bikin Tenang',
    teaser: 'Kamu itu versi rumah yang bisa jalan sendiri.',
    body: 'Ada orang yang bikin ramai, ada orang yang bikin tenang. Kamu yang kedua. Duduk diam berdua tanpa ngomong apa-apa pun tetap terasa nyaman, dan itu ukuran paling jujur soal betah atau nggaknya seseorang.',
  },
  {
    id: 'r7',
    emoji: '🍜',
    title: 'Partner Kuliner & Jalan-jalan',
    teaser: 'Mau makan di pinggir jalan atau restoran, seru terus.',
    body: 'Kamu nggak pernah ribet soal tempat. Mau warung kaki lima jam 11 malam atau tempat yang harus reservasi, yang penting kita berdua. Daftar tempat yang mau kita datangi masih panjang, dan aku niat mencoret semuanya bareng kamu.',
  },
];

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Apa hal pertama yang paling aku suka dari kamu saat pertama kali ketemu?',
    options: [
      { label: 'Senyuman manis kamu 😊', score: 2 },
      { label: 'Cara kamu ketawa yang tulus 😄', score: 3 },
      { label: 'Fashion & style kamu ✨', score: 1 },
      { label: 'Semuanya! Kombinasi sempurna 💖', score: 3 },
    ],
  },
  {
    id: 'q2',
    question: 'Kalau kita punya satu hari bebas tanpa kerjaan, kamu paling mau ngapain?',
    options: [
      { label: 'Rebahan seharian sambil maraton film 🎬', score: 2 },
      { label: 'Road trip dadakan tanpa tujuan 🚗', score: 3 },
      { label: 'Masak bareng terus makan di lantai 🍳', score: 3 },
      { label: 'Hunting kafe baru sampai malam ☕', score: 2 },
    ],
  },
  {
    id: 'q3',
    question: 'Kalau lagi berantem, cara paling ampuh bikin kamu luluh itu apa?',
    options: [
      { label: 'Dipeluk tanpa banyak omong 🤗', score: 3 },
      { label: 'Dibeliin makanan favorit 🍰', score: 2 },
      { label: 'Diajak ngobrol jujur sampai tuntas 💬', score: 3 },
      { label: 'Dikirimin meme sampai ketawa 😂', score: 1 },
    ],
  },
  {
    id: 'q4',
    question: 'Panggilan sayang yang kamu diam-diam paling suka?',
    options: [
      { label: 'Sayang, klasik tapi nggak pernah gagal 💕', score: 2 },
      { label: 'Nama panggilan aneh khas kita 🙃', score: 3 },
      { label: 'Cukup nama asli, tapi nadanya beda 🥰', score: 2 },
      { label: 'Bebas, asal dari kamu 💫', score: 3 },
    ],
  },
  {
    id: 'q5',
    question: 'Lima tahun lagi, kamu bayangin kita lagi apa?',
    options: [
      { label: 'Punya rumah kecil dengan dapur yang wangi 🏡', score: 3 },
      { label: 'Keliling negara sambil kerja remote ✈️', score: 2 },
      { label: 'Bangun usaha bareng dari nol 📈', score: 2 },
      { label: 'Apa pun itu, yang penting masih berdua 💞', score: 3 },
    ],
  },
];

export const QUIZ_MAX_SCORE = QUIZ.length * 3;

export const MOMENTS: Moment[] = [
  {
    id: 'm1',
    caption: 'Pekan Raya Jakarta yang paling seru',
    note: 'Belanja sebanyak, banyaknya~',
    image: '/momen/pekanrayajakarta.jpg',
  },
  {
    id: 'm2',
    caption: 'Scooteran di Taman Bogor',
    note: 'jalan pelan, ngobrol panjang',
    image: '/momen/kebunrayabogor.jpg',
  },
  {
    id: 'm3',
    caption: 'Curug Cibereum Bogor',
    note: 'Tempat yang kamu jarang kunjungi',
    image: '/momen/curugbogor.JPG',
  },
  {
    id: 'm4',
    caption: 'Malam Paling Berkesan di Bandung',
    note: 'Foto koran, yang viral itu',
    image: '/momen/bragabandung.jpg',
  },
];

export const LETTERS: Letter[] = [
  {
    id: 'l1',
    title: 'Untuk Pacar Terpenyabar',
    preview: 'Terima kasih sudah bertahan bareng aku bahkan di hari-hari yang paling nggak menarik.',
    body: [
      'Aku tahu aku bukan orang yang paling gampang dihadapi. Ada hari-hari di mana aku diam terlalu lama, ada hari di mana aku terlalu sibuk sampai lupa nanya kabar kamu.',
      'Tapi kamu tetap di situ. Nggak menuntut aku jadi versi yang lain, cuma pelan-pelan nunggu aku balik jadi diriku sendiri. Kesabaran seperti itu bukan hal yang bisa dibeli, dan aku sadar betul betapa beruntungnya aku.',
      'Terima kasih ya, sudah memilih tetap tinggal setiap hari.',
    ],
  },
  {
    id: 'l2',
    title: 'Catatan Kecil Buat Kamu',
    preview: 'Kalau suatu hari kamu ragu sama nilai dirimu sendiri, baca ini pelan-pelan.',
    body: [
      'Kamu mungkin nggak selalu merasa cukup. Kadang kamu bandingin diri kamu sama orang lain, terus diam-diam merasa kurang.',
      'Aku mau kamu tahu: kamu itu cukup. Lebih dari cukup. Kamu berani meskipun takut, tetap baik meskipun capek, dan tetap berusaha meskipun hasilnya belum kelihatan.',
      'Kalau nanti kamu lupa lagi, aku akan ingatkan sebanyak yang kamu butuhkan. Sesering itu, selama itu.',
    ],
  },
];

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/alasan', label: 'Alasan' },
  { href: '/kuis', label: 'Kuis' },
  { href: '/momen', label: 'Momen' },
  { href: '/surat', label: 'Surat' },
];

export const QUIZ_RESULTS = [
  { min: 14, emoji: '💞', title: 'Soulmate Level Dewa', desc: 'Kalian nyambung sampai ke level yang nggak butuh kata-kata. Serius, ini langka.' },
  { min: 11, emoji: '💖', title: 'Pasangan Super Kompak', desc: 'Kalian saling paham hampir di semua hal. Tinggal jaga api kecilnya tetap nyala.' },
  { min: 8, emoji: '💗', title: 'Makin Klop Tiap Hari', desc: 'Masih ada hal baru untuk ditemukan dari satu sama lain — dan itu bagian paling seru.' },
  { min: 0, emoji: '💫', title: 'Petualangan Baru Dimulai', desc: 'Belum semua terjawab, tapi justru itu alasan untuk ngobrol lebih lama malam ini.' },
];
