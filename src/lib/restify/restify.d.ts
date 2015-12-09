declare module "restify"{
      export interface Request {
            body: any;
            params: any;
            query: any;
            files: any;
      }
      export interface Response {
            send(p_res: any): void;
            status(p_status: number): void;
            json(p_res: any): void;
      }
}
