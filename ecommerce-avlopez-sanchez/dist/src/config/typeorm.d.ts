import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    port: number;
    host: string | undefined;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    synchronize: boolean;
    logging: string[];
    dropSchema: boolean;
    autoLoadEntities: boolean;
    entities: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    port: number;
    host: string | undefined;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    synchronize: boolean;
    logging: string[];
    dropSchema: boolean;
    autoLoadEntities: boolean;
    entities: string[];
}>;
export default _default;
export declare const connectionSource: DataSource;
