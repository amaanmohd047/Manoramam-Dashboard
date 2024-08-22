import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    arrivalDate,
    departureDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { name: guestName, email },
    rooms: { name: roomName },
  },
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkOut, checkingOut } = useCheckOut();

  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <Room>{roomName}</Room>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(arrivalDate))
            ? "Today"
            : formatDistanceFromNow(arrivalDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(arrivalDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(departureDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              {" "}
              See Details{" "}
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                {" "}
                Check In{" "}
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut(bookingId)}
                disabled={checkingOut}
              >
                {" "}
                Check Out{" "}
              </Menus.Button>
            )}
            <Modal.Open open="confirm-delete-booking">
              <Menus.Button
                icon={<HiTrash />}
                onClick={() => checkOut(bookingId)}
                disabled={checkingOut}
              >
                Delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="confirm-delete-booking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
