import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../../helpers/api-util";
import EventSummary from "../../../components/event-detail/event-summray";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventContent from "../../../components/event-detail/event-content";
import Comments from "../../../components/input/comments";

function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    return (
      <div className="center">
        <p>loading ...</p>
      </div>
    );
  }

  return (
    <>
      {event && (
        <Fragment>
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
          <Comments eventId={event.id} />
        </Fragment>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
