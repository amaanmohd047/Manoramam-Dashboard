import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
// import { rooms } from "./data-rooms";
import { guests } from "./mydata-guest";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

// async function deleteRooms() {
//   const { error } = await supabase.from("rooms").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

// async function createRooms() {
//   const { error } = await supabase.from("rooms").insert(rooms);
//   if (error) console.log(error.message);
// }

async function createBookings() {
  // Bookings need a guestId and a roomId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and roomIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((room) => room.id);

  console.log(allGuestIds);

  const { data: roomsIds } = await supabase
    .from("rooms")
    .select("id")
    .order("id");
  const allroomIds = roomsIds.map((room) => room.id);

  const { data: rooms } = await supabase.from("rooms").select("*");

  console.log(rooms);
  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of rooms, as they don't have and ID yet
    const room = rooms.at(booking.roomId - 39);

    const numNights = Math.abs(subtractDates(booking.arrivalDate, booking.departureDate));

    const roomPrice = Math.abs(numNights * (room.regularPrice - room.discount));

    // console.log(roomPrice)
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = roomPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.departureDate)) &&
      !isToday(new Date(booking.departureDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.arrivalDate)) ||
      isToday(new Date(booking.arrivalDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.departureDate)) ||
        isToday(new Date(booking.departureDate))) &&
      isPast(new Date(booking.arrivalDate)) &&
      !isToday(new Date(booking.arrivalDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      roomPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 107),
      roomId: allroomIds.at(booking.roomId - 39),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    // await deleteRooms();

    // Bookings need to be created LAST
    await createGuests();
    // await createRooms();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#eee" /* var(--color-grey-100) */,
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
