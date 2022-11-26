import { AppBaseContext } from '@just-web/types';
declare const plugin: (options?: {
    a: number;
} | undefined) => import("@just-web/types").PluginModule.TypeB<AppBaseContext, {
    dummy: number | undefined;
}>;
export default plugin;
export declare const Component: () => JSX.Element;
