import { Fragment } from 'react';
import { useRouter } from 'next/router';

import eventService from '../../services/eventService';
import AppEventList from '../../components/Events/AppEventList';
import EventsSearch from '../../components/events/EventSearch';
import AppHead from '../../components/ui/AppHead';

function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <AppHead />
      <EventsSearch onSearch={findEventsHandler} />
      <AppEventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await eventService.getEvents();
  return {
    props: {
      events: events
    },
    revalidate: 60 //in secs
  };
}

export default AllEventsPage;
