import React from 'react';
import {Card, CardActionArea} from "@mui/material";
import Link from "next/link";
import {IGeneralEvent, TEventCard} from "../../../types/dataTypes";
import EventCardContent from "./EventCardContent";

const EventCardWrapper = ({data, isAction = false, imgWidth = 700, titleCardVariant = "h2"}: TEventCard) => {

  return (
    <Card sx={{maxWidth: "inherit", height: "100%"}}>
      {isAction ? (
          <CardActionArea
            component={Link}
            href={`${isAction.prefixHref}${isAction.paramsToStr(data as IGeneralEvent)}`}
          >
            <EventCardContent data={data} imgWidth={imgWidth} titleCardVariant={titleCardVariant}/>
          </CardActionArea>
        )
        :
        <EventCardContent data={data} imgWidth={imgWidth} titleCardVariant={titleCardVariant}/>
      }
    </Card>
  );
};

export default EventCardWrapper;