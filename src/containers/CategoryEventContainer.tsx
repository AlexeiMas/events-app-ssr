import React from 'react';
import {CardsStack} from "../components";
import {IGeneralEvent, TEventData, TEventParams} from "../../types/dataTypes";

const CategoryEventContainer = ({data, cat}: TEventData<IGeneralEvent[]> & Pick<TEventParams, "cat">) => {
  return (
    <div>
      <h1 style={{textTransform: 'capitalize'}}>Events in {cat}</h1>
      <CardsStack
        data={data} prefixHref={"/events"}
        paramsHref={[{name: "city", order: 1}, {name: "id", order: 2}]}
        sxGrid={{sm: 12, md: 6}}
      />
    </div>
  );
};

export default CategoryEventContainer;