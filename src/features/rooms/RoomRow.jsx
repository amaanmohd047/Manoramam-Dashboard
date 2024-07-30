import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateRoomForm from "./CreateRoomForm";
import { useDeleteRoom } from "./useDeleteRoom";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(70px, 1fr)) 0.4fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  margin-left: 0.3rem;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Type = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Available = styled.div`
  font-family: "Sono";
  font-weight: 500;
  /* color: var(--color-green-700); */
  color: ${(props) =>
    props.$color && props.$color === "green"
      ? "var(--color-green-700)"
      : "var(--color-red-700)"};
`;

export default function RoomRow({ room }) {
  const {
    id: roomId,
    name,
    type,
    maxCapacity,
    regularPrice,
    discount,
    available,
    imageUrl,
  } = room;

  const { isDeleting, deleteRoom } = useDeleteRoom();
  return (
    <TableRow role="row">
      <Img src={imageUrl} />
      <Room>{name}</Room>
      <Type>{type}</Type>
      <Price>upto {maxCapacity}</Price>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "None"}</Discount>
      {available ? (
        <Available $color="green">Yes</Available>
      ) : (
        <Available $color="red">No</Available>
      )}
      {/* Make this button as a configuration. 
        It will redirect to a form for configuration.
      */}

      <div style={style}>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={roomId} />
            <Menus.List id={roomId}>
              <Modal.Open open="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open open="confirm-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateRoomForm roomToEdit={room} />
            </Modal.Window>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                onConfirm={() => deleteRoom(roomId)}
                resourceName="Room"
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

const style = {
  display: "flex",
  justifyContent: "flex-start",
  gap: "5px",
};

/* 
Room Category: (Least to most expensive)
Grande(G) -> max-2
Deluxe(D) -> max-2
Luxury(L) -> max-3
Royale(R) -> max-3
*/
