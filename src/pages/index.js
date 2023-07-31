import { getAllEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../../dummy-data";

function HomePage(props) {
  const featuredEvents = getAllEvents();

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default HomePage;
