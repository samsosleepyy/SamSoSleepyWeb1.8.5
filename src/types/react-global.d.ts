declare namespace JSX {
  interface IntrinsicElements {
    div: any;
    span: any;
    h1: any;
    h2: any;
    h3: any;
    h4: any;
    p: any;
    main: any;
    video: any;
    button: any;
    a: any;
    img: any;
    svg: any;
    path: any;
    [elemName: string]: any;
  }
}

declare module 'react' {
  export * from 'react';
}
