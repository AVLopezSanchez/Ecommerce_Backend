import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: string[];
    dropSchema: boolean;
    autoLoadEntities: boolean;
    entities: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: string[];
    dropSchema: boolean;
    autoLoadEntities: boolean;
    entities: string[];
}>;
export default _default;
export declare const connectionSource: DataSource;
