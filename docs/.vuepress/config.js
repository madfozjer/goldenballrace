import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { viteBundler } from "@vuepress/bundler-vite"; // <-- Import the bundler

export default defineUserConfig({
  base: "/blog/",
  dest: "dist-blog-temp",
  bundler: viteBundler(),

  title: "GBL Blog",

  description: "Stathead's analysis of football from fan perceptive",

  lang: "en-US",

  theme: defaultTheme({
    darkMode: true,
    sidebar: false,
    lastUpdated: false,
    contributors: false,
    logo: "/favicon.ico",
  }),
});
