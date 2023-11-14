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
import { useCallback, useMemo } from 'react';

interface RoadmapProps {
  statusCounts: CountsType;
  requestList: ProductRequest[];
  calculateCommentNumbers: (request: any) => number;
  handleUpvote: (updatedProductRequest: ProductRequest) => void;
  isTablet: boolean;
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

const Roadmap: React.FC<RoadmapProps> = ({ statusCounts, requestList, calculateCommentNumbers, handleUpvote, isTablet }) => {
  const [buttonActive, setButtonActive] = useState<string>('planned');

  const statusButtons = ['planned', 'in-progress', 'live'];

  const filteredRequests = useMemo(() => {
    return requestList.filter((request) => request.status === buttonActive);
  }, [requestList, buttonActive]);

  const setActiveButtonRender = useCallback((status: string) => {
    setButtonActive(status);
  }, []);

  const renderRequestElements = useCallback(
    (requests: ProductRequest[]) => {
      return requests.map((request) => (
        <Link key={request.id} to={`/requests/${request.id}`}>
          <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} status={request.status} handleUpvote={handleUpvote} isTablet={isTablet} />
        </Link>
      ));
    },
    [calculateCommentNumbers, requestList, handleUpvote, isTablet]
  );

  const renderParagraph = (status: string) => {
    if (status === 'planned') {
      return 'Ideas prioritized for research';
    } else if (status === 'live') {
      return 'Released features';
    } else if (status === 'in-progress') {
      return 'Currently being developed';
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#373F68', width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
        <BackButtonRoadmap />
      </div>

      {!isTablet && (
        <>
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
          <ProductRequestsContainer>{renderRequestElements(filteredRequests)}</ProductRequestsContainer>
        </>
      )}

      {isTablet && (
        <>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', maxWidth: '1024px', margin: '0 auto' }}>
            {statusButtons.map((status) => (
              <div style={{ flex: '1' }}>
                <h4 style={{ display: 'inline-block', marginTop: '20px', marginBottom: '10px', color: '#3A4374' }}>
                  {capitalizeFirstLetter(status)} ({statusCounts[status] || 0})
                </h4>
                <p style={{ color: '#647196', marginBottom: '20px' }}>{renderParagraph(status)}</p>
                <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                  {requestList
                    .filter((request) => request.status === status)
                    .map((filteredRequest) => (
                      <Link key={filteredRequest.id} to={`/requests/${filteredRequest.id}`}>
                        <RequestSingleElement
                          request={filteredRequest}
                          calculateCommentNumbers={calculateCommentNumbers}
                          status={filteredRequest.status}
                          handleUpvote={handleUpvote}
                          isTablet={isTablet}
                          $forceMobileStyle={true}
                        />
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Roadmap;
