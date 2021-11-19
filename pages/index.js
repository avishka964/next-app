import React, {Fragment} from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Most popular meetups in the world' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps() {
//     return {
//     props: {
//       meetups: DATA,
//     }
//   };
//}

export async function getStaticProps() {
  const database = process.env.DB_URI
  const collection = process.env.DB_COLLECTION
  
  const client = await MongoClient.connect(`${database}`);
  const db = client.db();

  const meetupsCollection = db.collection(`${collection}`);

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
