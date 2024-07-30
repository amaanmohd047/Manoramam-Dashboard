import RoomTable from "../features/rooms/RoomTable";
import AddRoom from "../features/rooms/AddRoom";
import RoomTableOperations from "../features/rooms/RoomTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

/*

'Input Mono' -> 'Dejavu sans mono' -> 'Fira Code' -> 'Jetbrains Mono' -> 'Space Mono' -> 'Courier Prime' -> 'cascadia code light' -> 'cascadia code' -> 'cascadia mono' -> Consolas -> 'Courier New' -> monospace"
*/

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <RoomTableOperations />
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Rooms;
