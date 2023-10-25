import IconCheck from '../../images/shared/icon-check.svg';

interface FilteredOptionProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const FilteredOption: React.FC<FilteredOptionProps> = ({ label, value, selectedValue, onChange }) => (
  <label style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
    <input type="radio" value={value} checked={selectedValue === value} onChange={(e) => onChange(e.target.value)} style={{ display: 'none' }} />
    <span>{label}</span>
    {selectedValue === value && <img src={IconCheck} style={{ width: 'auto', height: '20px' }} />}
  </label>
);

export default FilteredOption;
