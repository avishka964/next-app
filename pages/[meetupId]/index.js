import {Fragment} from 'react';
import Head from 'next/head';
import { MongoClient , ObjectId} from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
       <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
}

const database = process.env.DB_URI
const collection = process.env.DB_COLLECTION

export async function getStaticPaths() {

  const client = await MongoClient.connect(`${database}`);
  const db = client.db();

  const meetupsCollection = db.collection(`${collection}`);

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close()

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(`${database}`);
  const db = client.db();

  const meetupsCollection = db.collection(`${collection}`);

  const singleMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });

  client.close()

  return {
    props: {
      meetupData: {
        id: singleMeetup._id.toString(),
        image:singleMeetup.image,
        title:singleMeetup.title,
        address:singleMeetup.address,
        description:singleMeetup.description
      }
    },
  };
}

export default MeetupDetails;
