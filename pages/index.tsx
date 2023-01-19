import Head from 'next/head'
import {GetServerSidePropsResult, InferGetServerSidePropsType} from "next";
import {ICategoryEvent, TEventData} from "../types/dataTypes";
import {CardsStack} from "../src/components";

export default function Home({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Events App</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <CardsStack data={data} prefixHref={`/events`} paramsHref={[{name: "id", order: 1}]}/>
    </>
  )
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<TEventData<ICategoryEvent[]>>> {
  const {events_categories} = await import('../data/data.json')

  return {
    props: {
      data: events_categories
    }
  }
}