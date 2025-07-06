import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxtjs/google-fonts',
    ],

    // Tối ưu hóa rendering
    ssr: true, devtools: { enabled: false },

    // Tối ưu hóa router
    router: {
        options: {
            strict: true,
        },
    },

    srcDir: 'src/',

    // Tối ưu hóa build
    build: {
        transpile: [],
    },

    // Cấu hình experimental features cho performance
    experimental: {
        payloadExtraction: false, // Giảm kích thước payload
        viewTransition: true, // Smooth transitions
    },

    compatibilityDate: '2025-05-15',

    // Cấu hình Nitro cho performance
    nitro: {
        compressPublicAssets: true, // Bật compression cho static assets
        minify: true, // Minify output
        prerender: {
            crawlLinks: process.env.SKIP_CRAWL !== 'true', // Pre-render các trang được link
        },
    },

    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Tách vendor chunks để tối ưu caching
                        vendor: ['vue', '@vue/runtime-core'],
                    },
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '',
                },
            },
        },

        plugins: [
            tailwindcss(),
            svgLoader(),
        ],
    },

    // Cấu hình TypeScript
    typescript: {
        strict: true,
        typeCheck: false, // Tắt type checking trong build để tăng tốc
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: false,
            },
        },
    },

    googleFonts: {
        families: {
            'Public+Sans': true,
        },
        display: 'swap',
        preconnect: true,
        preload: true,
    },
})
