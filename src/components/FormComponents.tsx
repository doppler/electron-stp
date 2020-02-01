import styled from 'styled-components';

export const Form = styled.form``;

export const FieldSet = styled.fieldset`
  border: 0;
  border-top: 1px solid var(--body-text-color);
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 5em 1fr;
  margin-bottom: 1em;
`;

export const Label = styled.label`
  position: relative;
  font-size: 0.75em;
  color: var(--app-text-color);
  border-bottom: 1px solid
    hsl(var(--adj-1), var(--saturation), calc(var(--lightness)));
  &::after {
    position: absolute;
    right: 0.25em;
    color: hsl(var(--adj-1), var(--saturation), calc(var(--lightness)));
    content: ':';
  }
`;

export const Input = styled.input`
  background-color: transparent;
  color: hsl(var(--adj-1), var(--saturation), var(--light));
  border: 0;
  border-bottom: 1px solid
    hsl(var(--adj-1), var(--saturation), calc(var(--lightness)));
  &::placeholder {
    color: hsl(var(--complement), var(--saturation), var(--lightness));
  }
`;

export const Select = styled.select`
  background-color: transparent;
  color: hsl(var(--adj-1), var(--saturation), var(--light));
  border: 0;
  border-bottom: 1px solid
    hsl(var(--adj-1), var(--saturation), calc(var(--lightness)));
  & > option {
    background-color: var(--body-background-color);
  }
`;

export const Button = styled.button`
  /* width: 6em; */
  margin: 0.5em 1em 0.5em 0;
  padding: 0.25em 1em;
  color: var(--success-text);
  background-color: transparent;
  border: 1px solid var(--success-text);
  &:hover {
    cursor: pointer;
    color: var(--success-bright);
    background-color: var(--success-dark);
  }
  &.warning {
    color: var(--warning-text);
    background-color: transparent;
    border: 1px solid var(--warning-text);
    &:hover {
      color: var(--warning-bright);
      background-color: var(--warning-dark);
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
