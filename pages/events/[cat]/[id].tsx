import {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType} from "next";
import {IGeneralEvent, TEventData, TEventParams} from "../../../types/dataTypes";
import dynamic from "next/dynamic";
import Head from "next/head";

const EventComponent = dynamic(() => import("../../../src/containers/SingleEventContainer"), {
  loading: () => <p>Loading...</p>
})

const EventPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
      <>
        <Head>
          <title>{data?.title}</title>
        </Head>
        <EventComponent data={data}/>
      </>
    )
}

export default EventPage

export async function getStaticPaths(): Promise<GetStaticPathsResult<Required<TEventParams>>> {
  const {allEvents} = await import('../../../data/data.json')

  const allPaths = allEvents.map(path => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context: GetStaticPropsContext<Required<TEventParams>>): Promise<GetStaticPropsResult<TEventData<IGeneralEvent | undefined>>> {
  const id = context?.params?.id
  const {allEvents} = await import('../../../data/data.json')
  const eventData = allEvents.find(ev => ev.id === id)

  return {
    props: {
      data: eventData
    }
  }
}