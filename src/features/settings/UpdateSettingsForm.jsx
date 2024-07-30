import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settingsData: {
      minBookingLength,
      maxBookingLength,
      maxGuestNumber,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { updateSettings, isUpdating } = useUpdateSettings();

  function handleSubmit(e) {
    e.preventDefault();

    const newSettings = {
      minBookingLength: e.target.minnights.value,
      maxBookingLength: e.target.maxnights.value,
      maxGuestNumber: e.target.maxguests.value,
      breakfastPrice: e.target.breakfastprice.value,
    };
    updateSettings(newSettings);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="minnights" defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="maxnights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="maxguests" defaultValue={maxGuestNumber} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastprice"
          defaultValue={breakfastPrice}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Update Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
