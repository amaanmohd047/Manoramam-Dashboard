import Button from "../../ui/Button";
import ConfirmCheckOut from "../../ui/ConfirmCheckOut";
import Modal from "../../ui/Modal";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, checkingOut } = useCheckOut();
  return (
    <Modal>
      <Modal.Open open="confirm-checkout">
        <Button variation="primary" size="small">
          Check out
        </Button>
      </Modal.Open>
      <Modal.Window name="confirm-checkout">
        <ConfirmCheckOut
          onConfirm={() => checkOut(bookingId)}
          disabled={checkingOut}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
