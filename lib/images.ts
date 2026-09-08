/**
 * Centralized image catalogue — every photo on the site, keyed by where it is
 * used. All imagery is from Lummi (lummi.ai) and served from its CDN; swap an
 * id here and it propagates everywhere. These are placeholders — replace them
 * with your own photography before production.
 */

// Bare asset URL — the loader in lummi-loader.ts adds the width per srcset slot.
const lm = (id: string) => `https://assets.lummi.ai/assets/${id}`;

export const IMAGES = {
  // Hero — the three left-panel portraits, and the small tiles beside them
  hero1: lm("QmbhX4pnYKBxoWgNGGacR3twUDXjcKWthc4dux1nCGgiqb"), // orange visor portrait
  hero2: lm("QmPW9u4rVDRcTzizXTgpNVyvVGy4yR67im93W4QeL971xS"), // bold fashion portrait
  hero3: lm("QmQB9Ufpi2ua2y2P6LEB1E7dXYNZjWgZxb55YdbpQwiBgR"), // cheerful pastel portrait
  panel1: lm("QmbJzH9XewqejybUgCDhuvaxwikU4WcW8FSoqnZxcUvyrW"),
  panel2: lm("QmYrS9Vp4UKbXmUWz8h3ZdnvSPGFenm2mdoBig31xpihDF"),
  panel3: lm("QmPSRqV5UJZwA8iGPqEieLKh7Vs3gjdACMxXA9WKvc8uYV"),

  // "Who we are" split
  studio: lm("QmeerareXKmvKpq6XdDz5RJaQnyL4FyTptQQG7rVSumeb1"),

  // Studio page feature rows
  feature1: lm("QmNcq2ySRZiKbAdzAPwRvJZVTYmoXJQtajPJbPiZzMnwZy"), // colourburst cosmetics
  feature2: lm("QmbFBX1QqDqw4S5PQog5FfP9W3cNfVu7Xy8hmi3n72sUtJ"), // on-set portrait
  feature3: lm("QmPrMdUzTMQCFSAXWKdCHLLr5ssTPARNrcMWWdPVcuryUX"), // studio scene

  // Featured work + the filterable grid
  project1: lm("Qmf2xzy4ZbqMjGXngdE4ZNxUf9aaKDjsuWyRnP8jUHxw8L"), // Maison Lune
  project2: lm("QmX3EzH1r8e3ma5TpdTmv32R5ZHLTGAX3RWd9xp2ykvH7a"), // Bloom Beauty
  project3: lm("QmRFLfKvUfjuSh1tjrxytki4st7ccJfzDu6KfRaqCkhDh8"), // Solstice Swim
  project4: lm("QmQEu4GKyToT72dN79PoSJ1xJvYHgJ8gHByqDRrjdSf28d"), // Atelier Rue
  work5: lm("QmQvzSZA9MDCFNksffFYygPg6FJoauwZJeeYM77TKEKUs7"), // Velvet Hour
  work6: lm("QmdWiL5XTzjN6uZqB73NLkTYGTdPR9c8ngRQRTkzgvByzm"), // Petal & Co
  work7: lm("QmP37rkTzYwXMZJPdQ3Zve2VvBx75iWVSp6q8SM8JFuM5o"), // Nova Eyewear
  work8: lm("QmeAcM3kaK5gbZPn6Xu3LVsfXN72NSVbhuhH4B2PnaeqpG"), // Golden Hour

  // Inner-page heroes
  pageStudio: lm("QmQzGE3vnfvENMsg6haF4n7Gu71LeWkN5mrUTgvSWsqq5E"),
  pageWork: lm("QmPdy3qFqQF8gDQ6KuuUrRaqez3cbdeaYw3GMrxBynLfGd"),
  pageVoices: lm("QmNqHSWtvLAq6s47wodRJhkpVCcwFTqaD2siN7RaAPCsRS"),

  // Testimonial portraits — 1200px covers 3× on the largest slot
  avatar1: lm("QmNr6w3WPNhcVpYYssWPWxJVQQibam5Y3xwv2MFCf8NCNt"),
  avatar2: lm("QmXe6Qe3YXQTwwE1Xm64EGF2x6JsxpWgWST13LBVAU7e3X"),
  avatar3: lm("QmQ4rHRBhFxu919pDmjiApqL5L6Tj37PHD9e4v6ym1Hp74"),
  avatar4: lm("QmedmKuLjY8s2QWuFAFRGSsEZsb3nJVok5NxFTQJhC7D7k"),
  avatar5: lm("QmRFUiNHF2zkp45vZj2EauSoCSnpY96a9adozC6i2Cr9Fv"),
} as const;

export type ImageKey = keyof typeof IMAGES;
