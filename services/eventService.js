import appHttp from './httpService';
import eventData from '../dummy_data';

const prepareEvents = (data) => {
  const events = [];
  if (!data) return [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return events;
};
const getEvents = async () => {
  // const resp = await appHttp.get('/events.json');
  // console.log(resp);
  // return prepareEvents(resp.json());
  return eventData.getAllEvents();
};

const getFeaturedEvents = async () => {
  // const resp = await appHttp.get('/events.json?isFeatured=true');
  // return prepareEvents(resp.json());
  return eventData.getFeaturedEvents();
};

const getEvent = async (eventID) => {
  // const resp = await appHttp.get(`/events.json?id=${eventID}`);
  // const data = resp.json();
  // return { id: key, ...data[key] };
  return eventData.getEventByID(eventID);
};

const getFilteredEvents = async (year, month) => {
  // const resp = await appHttp.get(`/events.json?id=${eventID}`);
  // const data = resp.json();
  // return { id: key, ...data[key] };
  return eventData.getFilteredEvents(year, month);
};

export default {
  getEvents,
  getFeaturedEvents,
  getFilteredEvents,
  getEvent
};
