import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "../bookings/useBookingDetails";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { bookingId } = useParams();
  const { booking, error, isLoading } = useBookingDetails(bookingId);
  const { settingsData: settings, isLoading: isLoadingSettings } =
    useSettings();
  const { checkIn, checkingIn } = useCheckIn();

  useEffect(() => setConfirmPaid(booking?.isFullyPaid), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (error) return console.log(`Error: ${error.message}`);

  const {
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isFullyPaid,
  } = booking;

  const optionalBreakfastPrice = Math.abs(
    settings.breakfastPrice * numGuests * numNights
  );

  const newTotalPrice =
    totalPrice + (addBreakfast ? optionalBreakfastPrice : 0);

  function handleCheckin() {
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          extrasPrice: optionalBreakfastPrice,
          totalPrice: newTotalPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(() => !addBreakfast);
              setConfirmPaid(false);
            }}
          >
            Would you like to add breakfast for ${optionalBreakfastPrice} ($
            {settings.breakfastPrice} per head)?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm-paid"
          checked={confirmPaid}
          disabled={confirmPaid || checkingIn}
          onChange={() => setConfirmPaid(!confirmPaid)}
        >
          I confirm that {guests.name} has paid the total of $
          {addBreakfast
            ? `${newTotalPrice} ($${totalPrice} suite + $${optionalBreakfastPrice} breakfast) ($${Number(totalPrice * (0.8) + optionalBreakfastPrice).toFixed(2)} Due)`
            : `${totalPrice} ($${Number(totalPrice * (0.8)).toFixed(2)} Due)`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || checkingIn}>
          Check-in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
