const fs = require('fs');
const path = require('path');

const iconMap = {
  "alt-arrow-down-linear": "flat-color-icons:expand",
  "archive-linear": "flat-color-icons:archive",
  "armchair-linear": "flat-color-icons:vip",
  "arrow-right-linear": "flat-color-icons:next",
  "arrow-right-up-linear": "flat-color-icons:up-right",
  "barcode-read-linear": "flat-color-icons:barcode-reader",
  "bell-bing-linear": "flat-color-icons:appointment-reminders",
  "book-2-linear": "flat-color-icons:reading",
  "book-bookmark-linear": "flat-color-icons:bookmark",
  "book-open-linear": "flat-color-icons:reading-ebook",
  "bookmark-circle-linear": "flat-color-icons:bookmark",
  "books-linear": "flat-color-icons:library",
  "box-minimalistic-linear": "flat-color-icons:box",
  "buildings-2-linear": "flat-color-icons:department",
  "buildings-linear": "flat-color-icons:company",
  "calendar-add-linear": "flat-color-icons:calendar",
  "calendar-date-linear": "flat-color-icons:calendar",
  "calendar-mark-linear": "flat-color-icons:calendar",
  "card-2-linear": "flat-color-icons:business-contact",
  "card-send-linear": "flat-color-icons:invite",
  "chat-round-check-linear": "flat-color-icons:sms",
  "chat-round-dots-bold": "flat-color-icons:speech-balloon",
  "check-circle-linear": "flat-color-icons:ok",
  "city-linear": "flat-color-icons:department",
  "clipboard-check-linear": "flat-color-icons:inspection",
  "clipboard-list-linear": "flat-color-icons:list",
  "clock-circle-linear": "flat-color-icons:clock",
  "close-circle-linear": "flat-color-icons:cancel",
  "danger-triangle-linear": "flat-color-icons:high-priority",
  "database-linear": "flat-color-icons:database",
  "diploma-verified-linear": "flat-color-icons:diploma-1",
  "document-text-linear": "flat-color-icons:document",
  "emoji-circle-linear": "flat-color-icons:happy",
  "emoji-funny-circle-linear": "flat-color-icons:landscape",
  "emoji-sad-circle-linear": "flat-color-icons:sad",
  "emoji-sad-square-linear": "flat-color-icons:sad",
  "eye-linear": "flat-color-icons:view-details",
  "file-check-linear": "flat-color-icons:file",
  "floor-plan-linear": "flat-color-icons:grid",
  "folder-with-files-linear": "flat-color-icons:folder",
  "gallery-linear": "flat-color-icons:gallery",
  "global-linear": "flat-color-icons:globe",
  "hamburger-menu-linear": "flat-color-icons:menu",
  "heart-pulse-linear": "flat-color-icons:like",
  "info-circle-linear": "flat-color-icons:info",
  "laptop-minimalistic-linear": "flat-color-icons:laptop",
  "letter-linear": "flat-color-icons:letter",
  "library-linear": "flat-color-icons:library",
  "lightbulb-bolt-linear": "flat-color-icons:idea",
  "lock-keyhole-linear": "flat-color-icons:lock",
  "magnifer-linear": "flat-color-icons:search",
  "map-arrow-up-linear": "flat-color-icons:map",
  "map-linear": "flat-color-icons:map",
  "map-point-linear": "flat-color-icons:marker",
  "microphone-3-linear": "flat-color-icons:voice-presentation",
  "minimalistic-magnifer-linear": "flat-color-icons:search",
  "monitor-camera-linear": "flat-color-icons:webcam",
  "monitor-linear": "flat-color-icons:monitor",
  "monitor-smartphone-linear": "flat-color-icons:multiple-devices",
  "moon-sleep-linear": "flat-color-icons:night-landscape",
  "pen-new-round-linear": "flat-color-icons:edit-image",
  "phone-calling-linear": "flat-color-icons:phone",
  "plain-2-linear": "flat-color-icons:paper-plane",
  "plain-linear": "flat-color-icons:paper-plane",
  "play-circle-bold": "flat-color-icons:play",
  "play-circle-linear": "flat-color-icons:play",
  "play-linear": "flat-color-icons:play",
  "printer-linear": "flat-color-icons:print",
  "restroom-linear": "flat-color-icons:shop",
  "rocket-linear": "flat-color-icons:startup",
  "scanner-linear": "flat-color-icons:print",
  "server-path-linear": "flat-color-icons:server",
  "server-square-update-linear": "flat-color-icons:server",
  "shield-check-linear": "flat-color-icons:safe",
  "shield-warning-linear": "flat-color-icons:warning-shield",
  "shop-linear": "flat-color-icons:shop",
  "smartphone-linear": "flat-color-icons:cell-phone",
  "smartphone-rotate-2-linear": "flat-color-icons:two-smartphones",
  "star-fall-linear": "flat-color-icons:rating",
  "target-linear": "flat-color-icons:bullish",
  "tea-cup-linear": "flat-color-icons:coffee-to-go",
  "user-id-linear": "flat-color-icons:businessman",
  "user-linear": "flat-color-icons:manager",
  "user-plus-linear": "flat-color-icons:add-male-user-group",
  "users-group-rounded-linear": "flat-color-icons:conference-call",
  "users-group-two-rounded-linear": "flat-color-icons:collaboration",
  "videocamera-record-linear": "flat-color-icons:video-projector",
  "volume-cross-linear": "flat-color-icons:mute",
  "waterdrops-linear": "flat-color-icons:water"
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      content = content.replace(/icon="solar:([^"]+)"/g, (match, iconName) => {
        if (iconMap[iconName]) {
          modified = true;
          return `icon="${iconMap[iconName]}"`;
        }
        return match;
      });
      
      // Remove text-[#hex] and text-[color] classes from iconify-icon since flat-color-icons have their own colors
      if (modified) {
        content = content.replace(/<iconify-icon([^>]+)class="([^"]*text-[^"]*)"([^>]*)>/g, (match, p1, p2, p3) => {
          let newClass = p2.replace(/text-[a-zA-Z0-9-\[\]#]+/g, '').replace(/\s+/g, ' ').trim();
          if (newClass === '') {
            return `<iconify-icon${p1}${p3}>`;
          }
          return `<iconify-icon${p1}class="${newClass}"${p3}>`;
        });
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', fullPath);
      }
    }
  }
}

processDirectory('./src');
