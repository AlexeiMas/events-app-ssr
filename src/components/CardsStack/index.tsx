import {ICategoryEvent, IGeneralEvent, TEventData} from "../../../types/dataTypes";
import Grid from "@mui/system/Unstable_Grid";
import {useMemo} from "react";
import EventCardWrapper from "./EventCardWrapper";

export interface ICardsStack extends TEventData<ICategoryEvent[] | IGeneralEvent[]> {
  prefixHref: string
  paramsHref: { name: keyof Omit<IGeneralEvent, "emails_registered">, order: number }[]
  imgWidth?: number
  sxGrid?: Partial<Record<"xs" | "sm" | "md" | "lg", number | undefined>>
}

export const CardsStack = ({data, prefixHref, sxGrid, paramsHref}: ICardsStack) => {
  const hrefGenerator = useMemo(() => {
    if (paramsHref) {
      return paramsHref.length > 1 ? paramsHref.sort((a, b) => a.order - b.order) : paramsHref
    }
  }, [paramsHref])

  const paramsToStr = (ev: IGeneralEvent): string => {
    if (hrefGenerator) {
      return hrefGenerator
        .filter(el => Object.keys(ev).includes(el.name))
        .reduce((acc, el) => acc + '/' + ev[el.name], '')
    }
    return ''
  }

  return (
    <Grid spacing={2} container component={"div"}>
      {data?.map(ev =>
        <Grid key={ev.id} xs={12} sm={6} md={12} {...sxGrid}>
          <EventCardWrapper data={ev} isAction={{prefixHref, paramsToStr}}/>
        </Grid>
      )}
    </Grid>
  );
};