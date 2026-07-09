import { getCollection } from 'astro:content';
import { panduanList } from '../data/panduanEresources';

export async function GET() {
  const berita = await getCollection('berita');
  
  const internalPages = [
    { title: 'Tata Tertib Perpustakaan IAIN Sorong', type: 'informasi', icon: 'flat-color-icons:rules', link: '/tata-tertib' },
    { title: 'Jam Buka Layanan Perpustakaan', type: 'informasi', icon: 'flat-color-icons:clock', link: '/jam-layanan' },
    { title: 'Visi dan Misi Perpustakaan', type: 'informasi', icon: 'flat-color-icons:document', link: '/visi-misi' },
    { title: 'Struktur Organisasi Perpustakaan', type: 'informasi', icon: 'flat-color-icons:document', link: '/struktur' },
    { title: 'Profil Singkat Perpustakaan', type: 'informasi', icon: 'flat-color-icons:document', link: '/profil' },
    { title: 'Fasilitas: Loker, Mushola, Meeting, Pojok Baca - Lantai 1', type: 'fasilitas', icon: 'flat-color-icons:department', link: '/fasilitas/lantai-1' },
    { title: 'Fasilitas: Ruang Baca, Multimedia, Koleksi, Home Teater - Lantai 2', type: 'fasilitas', icon: 'flat-color-icons:department', link: '/fasilitas/lantai-2' },
    { title: 'Fasilitas: Ruang Pertemuan, Kantin, Rooftop - Lantai 3', type: 'fasilitas', icon: 'flat-color-icons:department', link: '/fasilitas/lantai-3' },
  ];

  const beritaIndex = berita.map(post => ({
    title: `Berita: ${post.data.title}`,
    type: 'berita',
    icon: 'flat-color-icons:reading',
    link: `/berita/${post.slug}`
  }));

  const panduanIndex = panduanList.map(panduan => ({
    title: `Panduan E-Resource: ${panduan.title}`,
    type: 'panduan',
    icon: 'flat-color-icons:document',
    link: panduan.url
  }));

  const searchIndex = [...internalPages, ...beritaIndex, ...panduanIndex];

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
