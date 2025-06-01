import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { viteBundler } from "@vuepress/bundler-vite"; // <-- Import the bundler

export default defineUserConfig({
  base: "/blog/",
  bundler: viteBundler(),

  title: "GBL Blog",

  description: "Stathead's analysis of football from fan perceptive",

  lang: "en-US",

  head: [["link", { rel: "icon", href: "/public/favicon.ico" }]],

  theme: defaultTheme({
    darkMode: true,
    sidebar: false,
  }),

  // Markdown extensions (optional, e.g., for custom containers, emoji support)
  // markdown: {
  //   extractHeaders: { level: [2, 3, 4] },
  // },

  // Plugins configuration (e.g., for search, PWA, Google Analytics)
  // plugins: [
  //   '@vuepress/plugin-search',
  //   // ... other plugins
  // ],

  dest: "dist-blog-temp",
});
