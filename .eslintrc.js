module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Menggunakan aturan untuk Vue 3
    'plugin:prettier/recommended', // Integrasi dengan Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Tambahkan aturan khusus di sini jika perlu
    'vue/multi-word-component-names': 'off', // Nonaktifkan aturan nama komponen multi-kata
  },
};
