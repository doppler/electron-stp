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
  padding-top: 0.75em;
  color: var(--app-text-color);
`;

export const Input = styled.input`
  font-size: 1.5em;
  background-color: var(--body-background-color);
  color: hsl(30, 5%, 95%);
  border: 0;
  &::placeholder {
    color: hsl(30, 5%, 55%);
  }
  &.invalid {
    background-color: var(--error-background-color);
    border: 1px solid var(--error-border-color);
  }
`;

export const Select = styled.select`
  font-size: 1.5em;
  background-color: var(--body-background-color);
  color: hsl(30, 5%, 95%);
  border: 0;
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

export const Details = styled.details`
  box-shadow: 1px 1px 5px black;
  background-color: var(--panel-background-color);
  border: 1px solid var(--header-background-color);
  margin-bottom: 1em;
  & > summary {
    background-color: var(--header-background-color);
    padding: 0.5em;
    &::-webkit-details-marker {
      float: right;
      display: none;
    }
    &:after {
      content: '\u25C2';
      float: right;
      font-weight: bold;
      text-align: center;
      width: 1em;
    }
  }
  &[open] summary:after {
    content: '\u25BE';
  }
  & .panel-body {
    margin: 0.5em;
  }
`;

export const Panel = styled.div`
  padding: 0.5em;
  box-shadow: 1px 1px 5px black;
  background-color: var(--panel-background-color);
  border: 1px solid var(--header-background-color);
  margin-bottom: 1em;
  & h1 {
    background-color: var(--header-background-color);
    margin-top: 0;
  }
`;

interface TextProps {
  readonly success?: boolean;
  readonly warning?: boolean;
  readonly error?: boolean;
}
export const Text = styled.p<TextProps>`
  color: ${props =>
    props.success
      ? 'var(--success-text)'
      : props.warning
      ? 'var(--warning-text)'
      : props.error
      ? 'var(--error-text)'
      : 'var(--body-text-color)'};
`;

export const SummaryList = styled.ul`
  padding-left: 0;
  display: grid;
  & li {
    list-style-type: none;
    display: grid;
    padding: 0.25em 0;
    grid-template-columns: repeat(4, 1fr);
    &:hover {
      background-color: var(--header-background-color);
      cursor: pointer;
    }
  }
`;

export const ErrorList = styled.ul`
  list-style-type: none;
  border: 1px solid var(--error-border-color);
  padding: 0;
  box-shadow: 1px 1px 5px black;
  & li {
    padding: 1em;
    border-bottom: 1px solid var(--header-background-color);
  }
  & li:last-child {
    border: 0;
  }
  &::before {
    content: 'Errors:';
    display: inline-block;
    width: calc(100% - 1em);
    padding: 0.5em;
    border-bottom: 1px solid var(--error-border-color);
    background-color: var(--error-background-color);
  }
`;
