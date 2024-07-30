/*
import styled from "styled-components";

const InputRadio = styled.input`
  appearance: none;
  background-color: #fff;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.1em solid var(--color-grey-400);
  border-radius: 50%;
  display: grid;
  place-content: center;
  margin-right: 1rem;

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--color-brand-600);
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export default InputRadio;
*/

import styled from "styled-components";

const InputRadio = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  background-color: #fff;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.1em solid var(--color-grey-400);
  border-radius: 0.25em; /* Changed from 50% to 0.25em for checkbox look */
  display: grid;
  place-content: center;
  margin-right: 1rem;

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 0.15em; /* Changed from 50% to 0.15em for checkbox look */
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--color-brand-600);
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export default InputRadio;
