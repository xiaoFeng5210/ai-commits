import { defineConfig } from 'tsup' // 使用 defineConfig 有类型提示！

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
})