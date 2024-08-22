import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name: name, avatar: "" } },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, name, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (name) updateData = { data: { name } };

  // Update only name or password
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const filename = `avatar-${data.user.id}-${Math.random()}`;

  // upload avatar
  const { error: avatarError } = await supabase.storage
    .from("user-avatars")
    .upload(filename, avatar, { upsert: true });

  if (avatarError) throw new Error(avatarError.message);

  // update avatar url to user data
  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/user-avatars/${filename}`,
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updatedData;
}
