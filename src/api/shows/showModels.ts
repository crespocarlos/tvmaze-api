import { Request } from "express";
export interface ShowRequestModel extends Request {
  query: {
    page: number;
  };
}

export interface ShowResponseModel {
  id: number;
  name: string;
  cast: Array<{
    id: number;
    name: string;
    birthday?: Date;
  }>;
}
