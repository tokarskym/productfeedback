import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';

import IconCheck from '../../images/shared/icon-check.svg';

//TS
import { FormValues } from '../RequestForm/RequestForm';

const LabelForOptionInput = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const IconCheckImage = styled.img`
  width: auto;
  height: 16px;
`;

const LabelForOptionInputUI = styled.span`
  color: ${(props) => props.theme.colors.gray};
  font-size: 16px;
  font-weight: 400;

  @media (min-width: 1024px) {
    &:hover {
      color: ${(props) => props.theme.colors.purple};
      cursor: pointer;
    }
  }
`;

//TS

interface FilteredOptionProps {
  label: string;
  value: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  register?: UseFormRegister<FormValues>;
  type?: string;
}

const FilteredOption: React.FC<FilteredOptionProps> = ({ label, value, selectedValue, onValueChange, register, type }) => {
  // FUNCTION FOR KEYBOARD NAVIGATION ON CUSTOM MODAL

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onValueChange(value);
      event.preventDefault();
    }
  };

  return (
    <LabelForOptionInput onKeyDown={handleKeyDown} tabIndex={0}>
      <input
        type="radio"
        onChange={() => {}}
        value={value}
        checked={selectedValue === value}
        onClick={() => onValueChange(value)}
        style={{ display: 'none' }}
        {...(register && (type === 'category' ? register('category') : register('status')))}
      />
      <LabelForOptionInputUI>{label}</LabelForOptionInputUI>
      {selectedValue === value && <IconCheckImage src={IconCheck} />}
    </LabelForOptionInput>
  );
};

export default FilteredOption;
