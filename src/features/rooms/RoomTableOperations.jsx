import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const RoomTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField={"filter"}
        filterOptions={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
          { value: "available", label: "Available" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (a-z)" },
          { value: "name-desc", label: "Sort by name (z-a)" },
          { value: "regularPrice-asc", label: "Sort by price (low to high)" },
          { value: "regularPrice-desc", label: "Sort by price (high to low)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low to high)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high to low)" },
        ]}
      />
    </TableOperations>
  );
};

export default RoomTableOperations;
