import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = path.resolve('public/images/berita');
const contentDir = path.resolve('src/content/berita');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

const extractImagesFromHTML = (html) => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const urls = [];
    while ((match = regex.exec(html)) !== null) {
        urls.push(match[1]);
    }
    return urls;
};

const run = async () => {
    let allImageUrls = [];
    for (let i = 1; i <= 3; i++) {
        const url = i === 1 ? 'https://iainsorong.ac.id/author/humas-iain-sorong/' : `https://iainsorong.ac.id/author/humas-iain-sorong/page/${i}/`;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const html = await res.text();
                allImageUrls.push(...extractImagesFromHTML(html));
            }
        } catch (e) {
            console.error(`Error fetching page ${i}:`, e.message);
        }
    }

    let uniqueUrls = [...new Set(allImageUrls)].filter(u => !u.includes('logo') && !u.includes('avatar') && !u.includes('gravatar') && u.startsWith('http'));

    const mdxFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    console.log(`Found ${mdxFiles.length} markdown files and ${uniqueUrls.length} valid image URLs.`);

    for (let i = 0; i < mdxFiles.length; i++) {
        const file = mdxFiles[i];
        const imageUrl = uniqueUrls[i % uniqueUrls.length];
        if (!imageUrl) continue;

        let ext = path.extname(imageUrl).split('?')[0];
        if (!ext || ext.length > 5) ext = '.jpg';
        const imgName = `post-${i + 1}${ext}`;
        const dest = path.join(outDir, imgName);
        
        console.log(`Downloading [${i+1}/${mdxFiles.length}] ${imageUrl} -> ${imgName}`);
        try {
            await downloadImage(imageUrl, dest);
            
            const filePath = path.join(contentDir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            content = content.replace(/image:\s*".*?"/, `image: "/images/berita/${imgName}"`);
            fs.writeFileSync(filePath, content);
        } catch (e) {
            console.error(`Error processing ${file}:`, e.message);
        }
    }
    console.log("Done successfully!");
};

run();
