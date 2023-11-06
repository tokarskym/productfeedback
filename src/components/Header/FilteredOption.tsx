import styled from 'styled-components';
import IconCheck from '../../images/shared/icon-check.svg';
import { UseFormRegister } from 'react-hook-form';
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

interface FilteredOptionProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  register?: UseFormRegister<FormValues>;
  type?: string;
}

const FilteredOption: React.FC<FilteredOptionProps> = ({ label, value, selectedValue, onChange, register, type }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onChange(value);
      event.preventDefault();
    }
  };
  return (
    <LabelForOptionInput onKeyDown={handleKeyDown} tabIndex={0}>
      <input
        type="radio"
        value={value}
        checked={selectedValue === value}
        onClick={() => onChange(value)}
        style={{ display: 'none' }}
        {...(register && (type === 'category' ? register('category') : register('status')))}
      />
      <LabelForOptionInputUI>{label}</LabelForOptionInputUI>
      {selectedValue === value && <IconCheckImage src={IconCheck} />}
    </LabelForOptionInput>
  );
};

export default FilteredOption;
