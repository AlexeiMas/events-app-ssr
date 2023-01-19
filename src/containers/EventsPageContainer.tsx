import React from 'react';
import {CardsStack} from "../components";
import {ICategoryEvent, TEventData} from "../../types/dataTypes";

const EventsPageContainer = ({data}: TEventData<ICategoryEvent[]>) => {
  return (
    <div>
      <h1>Events Page</h1>
      <CardsStack
        data={data} imgWidth={400}
        prefixHref={"/events"}
        paramsHref={[{name: "city", order: 1}, {name: "id", order: 2}]}
        sxGrid={{sm: 12, md: 6}}
      />
    </div>
  );
};

export default EventsPageContainer;