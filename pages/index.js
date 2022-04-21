import eventService from '../services/eventService';
import AppEventList from '../components/Events/AppEventList';
import AppHead from '../components/ui/AppHead';
import NewsletterRegistration from '../components/NewsLetter/Registration';

function HomePage({ events }) {
  return (
    <div>
      <AppHead title="Featured Events" />

      <NewsletterRegistration />
      <AppEventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await eventService.getFeaturedEvents();
  return {
    props: {
      events: events
    },
    revalidate: 3600 //in secs
  };
}

export default HomePage;
