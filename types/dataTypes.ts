import {TypographyVariant} from "@mui/material";

export interface ICategoryEvent {
  id: string
  title: string
  description: string
  image: string
}

export interface IGeneralEvent extends ICategoryEvent{
  city: string
  emails_registered: string[]
}

export interface IRootData {
  events_categories: ICategoryEvent[];
  allEvents: IGeneralEvent[];
}

export type TEventData<T extends ICategoryEvent[] | IGeneralEvent[] | IGeneralEvent | undefined> = {
  data: T
}

export type TEventParams = {
  cat: string
  id?: string
}



export type TEventCard = {
  data: ICategoryEvent | IGeneralEvent
  isAction?: false | { prefixHref: string, paramsToStr: (ev: IGeneralEvent) => string },
  imgWidth?: number,
  titleCardVariant?: TypographyVariant
}
