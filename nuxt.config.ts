export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [400, 500, 600],
        },
        preload: true
      },
    ],
    '@nuxt/ui'
  ],
});
