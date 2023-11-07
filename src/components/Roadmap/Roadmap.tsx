import BackButtonRoadmap from '../BackButton/BackButtonRoadmap';
import styled from 'styled-components';

import { HorizontalRule } from '../Header/HeaderStyles';
import { useState } from 'react';

import { CountsType } from '../../App';
import { capitalizeFirstLetter } from '../../Utils/Functions';
import { ProductRequest } from '../../data/data';

import { Link } from 'react-router-dom';
import RequestSingleElement from '../RequestSingleElement/RequestSingleElement';

import { Container } from '../GlobalStyles/ReusedStyles';

import { getColorForStatus } from '../../Utils/Functions';

interface RoadmapProps {
  statusCounts: CountsType;
  requestList: ProductRequest[];
  calculateCommentNumbers: (request: any) => number;
}

const ProductRequestsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
  margin-bottom: 100px;
`;

const StatusButton = styled.button<{ $isActive: boolean; status: string }>`
  background-color: transparent;
  border: none;
  padding: 10px;
  border-bottom: ${(props) => (props.$isActive ? `5px solid ${getColorForStatus(props.status)}` : '')};
  flex: 1;
  font-weight: 700;
  color: ${(props) => (props.$isActive ? '#3A4374' : '#647196')};
  opacity: ${(props) => (props.$isActive ? '1' : '0.5')};
`;

const Roadmap: React.FC<RoadmapProps> = ({ statusCounts, requestList, calculateCommentNumbers }) => {
  const [buttonActive, setButtonActive] = useState<string>('planned');

  const statusButtons = ['planned', 'in-progress', 'live'];

  const setActiveButtonRender = (status: string) => {
    setButtonActive(status);
  };

  const productsPlanned = requestList.filter((request) => request.status === 'planned');
  const productsProgress = requestList.filter((request) => request.status === 'in-progress');
  const productsLive = requestList.filter((request) => request.status === 'live');

  return (
    <>
      <div style={{ backgroundColor: '#373F68', width: '100%' }}>
        <BackButtonRoadmap />
      </div>
      <div style={{ height: '60px', display: 'flex', flexDirection: 'row' }}>
        {statusButtons.map((status) => {
          return (
            <StatusButton key={status} $isActive={buttonActive === status} onClick={() => setActiveButtonRender(status)} status={status}>
              {capitalizeFirstLetter(status)} ({statusCounts[status] || 0})
            </StatusButton>
          );
        })}
      </div>
      <HorizontalRule />
      <ProductRequestsContainer>
        {buttonActive === 'planned' &&
          productsPlanned.map((request) => {
            return (
              <Link key={request.id} to={`/requests/${request.id}`}>
                <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} status={request.status} />
              </Link>
            );
          })}
        {buttonActive === 'live' &&
          productsLive.map((request) => {
            return (
              <Link key={request.id} to={`/requests/${request.id}`}>
                <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} status={request.status} />
              </Link>
            );
          })}
        {buttonActive === 'in-progress' &&
          productsProgress.map((request) => {
            return (
              <Link key={request.id} to={`/requests/${request.id}`}>
                <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} status={request.status} />
              </Link>
            );
          })}
      </ProductRequestsContainer>
    </>
  );
};

export default Roadmap;
