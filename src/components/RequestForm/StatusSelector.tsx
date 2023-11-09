import { CategoryModal, FormFieldLabel, FormFieldWrapper, SelectedCategoryButtonInput, FormFieldDescription } from './RequestForm';
import { HorizontalRule } from '../Header/HeaderStyles';

import FilteredOption from '../Header/FilteredOption';

import { capitalizeFirstLetter } from '../../Utils/Functions';

import BlueArrowUpSVG from '../../images/shared/icon-arrow-up-blue.svg';
import BlueArrowDownSVG from '../../images/shared/icon-arrow-down-blue.svg';

import { UseFormRegister } from 'react-hook-form';
import { FormValues } from './RequestForm';

interface StatusSelectorProps {
  selectedCategory: string;
  selectedStatus: string;
  register: UseFormRegister<FormValues>;
  handleStatusChange: (newValue: string) => void;
  selectMenuHighlighted: boolean;
  fakeLabelFunctionality: () => void;
  openStatusModal: (event: any) => void;
  statusModalOpen: boolean;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  selectMenuHighlighted,
  selectedCategory,
  fakeLabelFunctionality,
  openStatusModal,
  selectedStatus,
  statusModalOpen,
  handleStatusChange,
  register,
}) => {
  return (
    <>
      <FormFieldWrapper>
        <FormFieldLabel onClick={fakeLabelFunctionality}>Update Status</FormFieldLabel>
        <FormFieldDescription>Change {selectedCategory} state</FormFieldDescription>
        <SelectedCategoryButtonInput onClick={openStatusModal} $isHighlighted={selectMenuHighlighted} type="button">
          {capitalizeFirstLetter(selectedStatus)}
          <img src={statusModalOpen ? BlueArrowUpSVG : BlueArrowDownSVG} alt={statusModalOpen ? 'Arrow Up' : 'Arrow Down'} />
        </SelectedCategoryButtonInput>
      </FormFieldWrapper>
      {statusModalOpen && (
        <FormFieldWrapper style={{ position: 'relative' }}>
          <CategoryModal style={{ bottom: '-170px' }}>
            <FilteredOption label="Suggestion " value="suggestion" selectedValue={selectedStatus} onValueChange={handleStatusChange} register={register} type="status" />
            <HorizontalRule />
            <FilteredOption label="Planned" value="planned" selectedValue={selectedStatus} onValueChange={handleStatusChange} register={register} type="status" />
            <HorizontalRule />
            <FilteredOption label="In-Progress" value="in-progress" selectedValue={selectedStatus} onValueChange={handleStatusChange} register={register} type="status" />
            <HorizontalRule />
            <FilteredOption label="Live" value="live" selectedValue={selectedStatus} onValueChange={handleStatusChange} register={register} type="status" />
          </CategoryModal>
        </FormFieldWrapper>
      )}
    </>
  );
};

export default StatusSelector;
