import _default from './dist/blu-dev-kit';

export * from './dist/blu-dev-kit';
export default _default;

declare module '@bludevkit/vue-ui' {
    export * from './dist/blu-dev-kit';
    export { default } from './dist/blu-dev-kit';
}