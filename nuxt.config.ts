export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Region Compatibility',
    },
  },
  css: ['@/assets/css/main.css'],
  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: [400, 500, 600],
        },
        preload: true,
      },
    ],
    '@nuxt/ui',
  ],
  runtimeConfig: {
    public: {
      baseURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler',
    },
  },
})
