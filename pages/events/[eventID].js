import { Fragment } from 'react';

import eventService from '../../services/eventService';
import EventSummary from '../../components/EventDetail/EventSummary';
import EventLogistics from '../../components/EventDetail/EventLogistics';
import EventContent from '../../components/EventDetail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import AppHead from '../../components/ui/AppHead';
import CommentCtrl from '../../components/Comments/CommentCtrl';

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <Fragment>
      <AppHead title={event.title} description={event.description} />
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

      <CommentCtrl eventID={event.id} />
    </Fragment>
  );
}
export async function getStaticProps(context) {
  const eventID = context.params.eventID;
  const event = await eventService.getEvent(eventID);
  return {
    props: {
      event: event
    },
    revalidate: 60 //in secs
  };
}

export async function getStaticPaths() {
  const events = await eventService.getFeaturedEvents();
  const paths = events.map((e) => ({ params: { eventID: e.id } }));

  return {
    paths: paths,
    fallback: true //false, loading - until fetch
  };
}

export default EventDetailPage;
