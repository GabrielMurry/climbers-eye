import { Boulder } from "./boulder";

export interface LogbookBoulder extends Boulder {
  sendDate: string;
  unique_id: number;
}
