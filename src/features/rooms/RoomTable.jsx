import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import RoomRow from "../rooms/RoomRow";
import { useFetchRooms } from "./useFetchRooms";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  /* grid-template-columns: repeat(7, minmax(70px, 0.85fr)); */
  grid-template-columns: 1fr repeat(5, minmax(70px, 0.85fr)) 0.4fr;
  column-gap: 2.4rem;
  align-items: center;
  overflow: scroll;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function RoomTable({ showFormHandler }) {
  const { rooms, isLoading, isError } = useFetchRooms();
  const [searchParams] = useSearchParams();
  if (isError) console.error(`🛑Error!!`);
  if (isLoading) return <Spinner />;

  // Filter rooms
  const filterValue = searchParams.get("filter") || "all";

  let filteredRooms;
  if (filterValue === "available")
    filteredRooms = rooms.filter((room) => room.available === true);
  else if (filterValue === "all") filteredRooms = rooms;
  else if (filterValue === "with-discount")
    filteredRooms = rooms.filter((room) => room.discount > 0);
  else if (filterValue === "no-discount")
    filteredRooms = rooms.filter((room) => room.discount === 0);

  // Sort rooms
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedRooms = filteredRooms.sort((a, b) => (a[field] > b[field] ? 1 : -1) * modifier);

  return (
    <Menus>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>Room</div>
          <div>Type</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </TableHeader>
        {sortedRooms.map((room) => (
          <RoomRow
            room={room}
            key={room.id}
            showFormHandler={showFormHandler}
          />
        ))}
      </Table>
    </Menus>
  );
}
