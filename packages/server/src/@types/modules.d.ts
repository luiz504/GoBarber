/* eslint-disable @typescript-eslint/naming-convention */

declare namespace NodeJS {
  export interface ProcessEnv {
    ORM_HOST: string;
    ORM_PORT: number;
    ORM_USERNAME: string;
    ORM_PASSWORD: number;
    ORM_DATABASE: string;

    ORM2_HOST: string;
    ORM2_PORT: number;
    ORM2_DATABASE: string;

    TOKEN_SECRET: string | number;
    TOKEN_EXPIRATION: string;
    APP_API_URL: string;
    APP_WEB_URL: string;
    MAIL_DRIVER: string;
  }
}
