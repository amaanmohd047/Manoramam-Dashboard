import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import InputRadio from "../../ui/InputRadio";

import { useForm } from "react-hook-form";
import { useCreateRoom } from "./useCreateRoom";
import { useEditRoom } from "./useEditRoom";

function CreateRoomForm({ roomToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = roomToEdit;
  const isEditSession = Boolean(editId);

  const { createRoom, isCreating } = useCreateRoom();
  const { editRoom, isEditing } = useEditRoom();
  const isWorking = isEditing || isCreating;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function handleFormSubmit(data) {
    const imageUrl =
      typeof data.imageUrl === "string" ? data.imageUrl : data.imageUrl[0];

    isEditSession
      ? editRoom(
          { roomData: { ...data, imageUrl: imageUrl }, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        )
      : createRoom(
          { ...data, imageUrl: imageUrl },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
  }

  function handleError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit, handleError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="Room name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Room Type" error={errors?.type?.message}>
        <Input
          type="text"
          id="type"
          {...register("type", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Minimum capacity should be 1.",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular Price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Minimum price should be 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              0 < getValues().regularPrice - value ||
              "Discount should be less than Regular Price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="features" error={errors?.features?.message}>
        <Textarea
          type="number"
          id="features"
          defaultValue=""
          {...register("features", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Available" error={null}>
        <div style={style}>
          <InputRadio
            type="radio"
            name="available"
            id="available"
            {...register("available")}
          />
          <p>Yes</p>
        </div>
      </FormRow>

      <FormRow label="Room Image" error={errors?.imageUrl?.message}>
        <FileInput
          id="imageUrl"
          accept="image/*"
          {...register("imageUrl", {
            required: isEditSession ? false : "This field is required!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? `Edit Room` : "Add room"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;

const style = {
  display: "flex",
  alignItems: "center",
};
