import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
// import SWR from 'swr';

import eventService from '../../services/eventService';
import AppEventList from '../../components/Events/AppEventList';
import ResultsTitle from '../../components/Events/ResultTitle';
import Button from '../../components/ui/AppButton';
import ErrorAlert from '../../components/ui/ErrorAlert';
import AppHead from '../../components/ui/AppHead';

function isInvalidSearchParam(numYear, numMonth) {
  return (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  );
}

function FilteredEventsPage({ hasError, numYear, numMonth, events }) {
  const router = useRouter();

  const filterData = router.query.slug;

  // const numYear = +filterData[0];
  // const numMonth = +filterData[1];

  // const { data, error } = SWR('url');
  // useEffect(() => {}, [data]);

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <AppHead
        title="All filtered events"
        description={`all events ${date.toDateString()}`}
      />
      <ResultsTitle date={date} />
      <AppEventList items={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const filterData = context.params.slug;
  const numYear = +filterData[0];
  const numMonth = +filterData[1];
  if (isInvalidSearchParam(numYear, numMonth)) {
    return {
      props: { hasError: true }
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }
  const events = await eventService.getFilteredEvents(numYear, numMonth);
  return {
    props: {
      events: events,
      numYear,
      numMonth
    }
    //revalidate: 60 //in secs
  };
}

// export async function getStaticPaths() {
//   const events = await eventService.getFeaturedEvents();
//   const paths = events.map((e) => ({ params: { eventID: e.id } }));

//   return {
//     paths: paths,
//     fallback: true //false, loading - until fetch
//   };
// }

export default FilteredEventsPage;
