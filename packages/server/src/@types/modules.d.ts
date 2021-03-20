/* eslint-disable @typescript-eslint/naming-convention */

declare namespace NodeJS {
  export interface ProcessEnv {
    ORM_HOST: string;
    ORM_PORT: number;
    ORM_USERNAME: string;
    ORM_PASSWORD: number | string;
    ORM_DATABASE: string;

    ORM2_HOST: string;
    ORM2_PORT: number;
    ORM2_DATABASE: string;

    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;

    TOKEN_SECRET: string | number;
    TOKEN_EXPIRATION: string;
    APP_API_URL: string;
    APP_WEB_URL: string;
    MAIL_DRIVER: 'ethereal' | 'ses';
    STORAGE_DRIVER: 'local' | 's3';
    AWS_DEFAULT_REGION: string;
    AWS_BUCKET: string;
    AWS_BUCKET_URL: string;
  }
}
