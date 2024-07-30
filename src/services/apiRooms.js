import supabase, { supabaseUrl } from "./supabase";

export async function getRooms() {
  const { data: rooms, error } = await supabase.from("rooms").select("*");
  if (error) {
    console.error(error);
    throw new Error("🛑 Rooms could not be loaded!");
  }
  return rooms;
}

export async function createEditRoom(newRoom, id = 0) {
  console.log(newRoom);

  const hasImagePath = newRoom.imageUrl.name
    ? newRoom.imageUrl.name.startsWith(supabaseUrl)
    : newRoom.imageUrl.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newRoom.imageUrl?.name?.replaceAll(
    " ",
    "_"
  )}`?.replaceAll("/", "");

  console.log(imageName, hasImagePath);

  const imagePath = hasImagePath
    ? newRoom.imageUrl
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  let baseQuery = supabase.from("rooms");
  if (!id) baseQuery = baseQuery.insert([{ ...newRoom, imageUrl: imagePath }]);
  if (id)
    baseQuery = baseQuery
      .update({ ...newRoom, imageUrl: imagePath })
      .eq("id", id);

  const { data, error } = await baseQuery.select().single();

  if (error) {
    console.error("🛑 Room could not be added! ");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoom.imageUrl);

  if (storageError) {
    console.error(storageError);
    // await supabase.from("rooms").delete().eq("id", data?.id);
    throw new Error(
      "Image could not be uploaded and the cabin was not created"
    );
  }
}

/*
If the room is booked(there is booking for this room), the room cannot be deleted

:: FIX :: this issue := Give a toast saying "This room is currently booked!"
*/
export async function deleteRoom(id) {
  const { data: room } = await supabase.from("rooms").select("*").eq("id", id);

  const { error: deleteImageError } = await supabase.storage
    .from("room-images")
    .remove([`${room[0].imageUrl}`]);

  const data = await supabase.from("rooms").delete().eq("id", id);

  if (deleteImageError) {
    console.error(deleteImageError);
    throw new Error("Image could not be deleted");
  }

  if (data.error) {
    console.error(data.error);
    throw new Error("🛑 Rooms could not be deleted!");
  }
}
