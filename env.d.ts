/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    mjs: Any;
    [propName: string]: any;
  }
}