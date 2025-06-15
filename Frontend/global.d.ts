/* eslint-disable @typescript-eslint/no-empty-object-type */

export {};

declare global {
  declare module '*.svg?url' {
    const content: { src: string };
    export default content;
  }
}
