declare module 'express-app-generator' {
    export function generate(port: number, apiFullFolderPath: string, cb: (err: any, app: any, server: any) => void): void;
}