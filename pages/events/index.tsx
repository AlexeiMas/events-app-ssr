import {GetStaticPropsResult, InferGetStaticPropsType} from "next";
import {ICategoryEvent, TEventData} from "../../types/dataTypes";
import dynamic from "next/dynamic";
import Head from "next/head";

const EventsComponent = dynamic(() => import("../../src/containers/EventsPageContainer"), {
  loading: () => <p>Loading...</p>
})

const EventsPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Events list</title>
      </Head>
      <EventsComponent data={data}/>
    </>
  )
}

export default EventsPage

export async function getStaticProps(): Promise<GetStaticPropsResult<TEventData<ICategoryEvent[]>>> {
  const {events_categories} = await import('../../data/data.json')

  return {
    props: {
      data: events_categories
    }
  }
}
