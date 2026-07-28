function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function buildEmbedUrl(videoId, options = {}) {
  const {
    autoplay = false,
    mute = false,
    controls = true,
    loop = false,
    modestbranding = false,
    privacy = false,
  } = options;

  const base = privacy
    ? 'https://www.youtube-nocookie.com/embed/'
    : 'https://www.youtube.com/embed/';

  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  if (mute) params.set('mute', '1');
  if (!controls) params.set('controls', '0');
  if (loop) { params.set('loop', '1'); params.set('playlist', videoId); }
  if (modestbranding) params.set('modestbranding', '1');

  const query = params.toString();
  return base + videoId + (query ? '?' + query : '');
}

export function generateEmbed(url, options = {}) {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return { success: false, error: 'URL inválida. Formatos aceitos: youtube.com/watch?v=, youtu.be/, /shorts/' };
  }

  const embedUrl = buildEmbedUrl(videoId, options);
  

  return { success: true, videoId, embedUrl };
}
