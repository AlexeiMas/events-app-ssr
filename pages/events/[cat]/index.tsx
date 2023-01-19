import {useRouter} from "next/router";
import {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType} from "next";
import {IGeneralEvent, TEventData, TEventParams} from "../../../types/dataTypes";
import dynamic from "next/dynamic";
import Head from "next/head";

const EventsCatComponent = dynamic(() => import("../../../src/containers/CategoryEventContainer"), {
  loading: () => <p>Loading...</p>
})


const EventsCatPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {query} = useRouter()
  const {cat} = query as TEventParams

  return (
    <>
      <Head>
        <title>City: {cat.replace(cat[0], cat[0].toUpperCase())}</title>
      </Head>
      <EventsCatComponent data={data} cat={cat}/>
    </>
  )
}

export default EventsCatPage

export async function getStaticPaths(): Promise<GetStaticPathsResult<TEventParams>> {
  const {events_categories} = await import('../../../data/data.json')
  const allPaths = events_categories.map(ev => {
    return {
      params: {
        cat: ev.id.toString()
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context: GetStaticPropsContext<TEventParams>): Promise<GetStaticPropsResult<TEventData<IGeneralEvent[]>>> {
  const id = context?.params?.cat
  const {allEvents} = await import('../../../data/data.json')

  const data = allEvents.filter(ev => ev.city === id)
  return {
    props: {
      data
    }
  }
}