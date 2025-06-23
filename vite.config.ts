import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple'
import path from 'path';

export default defineConfig(function(env){
    if(env.mode === "electron"){
        return {
            build: {
                emptyOutDir: false,
            },
            plugins: [
                electron({
                    main: {
                        entry: './src/main/main.ts',
                        vite: {
                            base: "./",
                            build: {
                                outDir: "./dist/main"
                            }
                        }
                    },
                    preload: {
                        input: path.join(__dirname, './src/preload/preload.ts'),
                        vite: {
                            base: "./",
                            build: {
                                outDir: "./dist/preload"
                            }
                        }
                    },
                    renderer: {},
                }),
            ]
        }
    }
    return {
        base: "./",
        root: "./src/renderer",
        build: {
            outDir: "../../dist/renderer",
            emptyOutDir: true
        },
        plugins: [
            react()
        ],
        server: {
            port: 5123,
            strictPort: true
        }
    }
})