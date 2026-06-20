import re
import os

with open('../index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def extract_between(text, start_tag, end_tag):
    start = text.find(start_tag)
    if start == -1: return ""
    end = text.find(end_tag, start)
    if end == -1: return ""
    return text[start:end+len(end_tag)]

def extract_section_by_id(text, section_id):
    pattern = r'<section[^>]*id="' + section_id + r'"[^>]*>.*?</section>'
    match = re.search(pattern, text, re.DOTALL)
    return match.group(0) if match else ""

os.makedirs('src/layouts', exist_ok=True)
os.makedirs('src/components', exist_ok=True)

# 1. Layout.astro
layout = """---
interface Props {
	title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="id">
"""
head_content = extract_between(content, "<head>", "</head>")
layout += head_content + """
  <body class="bg-[#F8F9FA] text-[#333333] font-sans antialiased">
    <slot />
  </body>
</html>
"""
with open('src/layouts/Layout.astro', 'w') as f: f.write(layout)

# 2. Header.astro
header_content = extract_between(content, "<!-- Top Bar -->", "</header>")
if not header_content: header_content = extract_between(content, "<header", "</header>")
with open('src/components/Header.astro', 'w') as f: f.write("---\n---\n" + header_content)

# 3. Hero.astro
hero_content = extract_between(content, "<!-- Hero Section -->", "</section>")
if "<!-- Hero Section -->" not in content: hero_content = extract_section_by_id(content, "hero") # Assuming no id="hero" but maybe <section class="relative...
if not hero_content: 
    # Fallback for hero
    match = re.search(r'<section class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">.*?</section>', content, re.DOTALL)
    if match: hero_content = match.group(0)
with open('src/components/Hero.astro', 'w') as f: f.write("---\n---\n" + hero_content)

# 4. Stats.astro
stats_content = extract_between(content, "<!-- Statistik -->", "</section>")
with open('src/components/Stats.astro', 'w') as f: f.write("---\n---\n" + stats_content)

# 5. DigitalEcosystem.astro
# We moved koleksi (Layanan) to top. Let's find it by id
koleksi_content = extract_section_by_id(content, "koleksi")
with open('src/components/DigitalEcosystem.astro', 'w') as f: f.write("---\n---\n" + koleksi_content)

# 6. AcademicServices.astro
layanan_content = extract_section_by_id(content, "layanan")
with open('src/components/AcademicServices.astro', 'w') as f: f.write("---\n---\n" + layanan_content)

# 7. OperationalHours.astro
# Operational hours is a div inside Info section or profil? Wait, it is inside "<!-- Jam Layanan & Tata Tertib -->"
op_hours_match = re.search(r'<!-- Jam Layanan & Tata Tertib -->.*?</div>\s*</div>\s*</div>', content, re.DOTALL)
op_hours_content = op_hours_match.group(0) if op_hours_match else ""
# also need the script
script_content = extract_between(content, "<script>", "</script>")
with open('src/components/OperationalHours.astro', 'w') as f: 
    f.write("---\n---\n<section class=\"py-16 bg-white\">\n  <div class=\"container mx-auto px-4 sm:px-6 lg:px-8\">\n" + op_hours_content + "\n</section>\n" + script_content)

# Remaining sections like profil, berita
profil_content = extract_section_by_id(content, "profil")
with open('src/components/Profil.astro', 'w') as f: f.write("---\n---\n" + profil_content)

berita_content = extract_section_by_id(content, "berita")
with open('src/components/Berita.astro', 'w') as f: f.write("---\n---\n" + berita_content)

# Footer.astro
footer_content = extract_between(content, "<footer", "</footer>")
with open('src/components/Footer.astro', 'w') as f: f.write("---\n---\n" + footer_content)

# index.astro
index_content = """---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Stats from '../components/Stats.astro';
import DigitalEcosystem from '../components/DigitalEcosystem.astro';
import AcademicServices from '../components/AcademicServices.astro';
import OperationalHours from '../components/OperationalHours.astro';
import Profil from '../components/Profil.astro';
import Berita from '../components/Berita.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Perpustakaan IAIN Sorong">
	<Header />
	<main>
		<Hero />
		<Stats />
		<DigitalEcosystem />
		<AcademicServices />
		<OperationalHours />
		<Profil />
		<Berita />
	</main>
	<Footer />
</Layout>
"""
with open('src/pages/index.astro', 'w') as f: f.write(index_content)

print("Astro components generated.")
