declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

declare module 'react' {
  export * from 'react';
}

interface ImportMetaEnv {}
interface ImportMeta { readonly env: ImportMetaEnv }
