import { Link } from 'react-router-dom';
import { TagsContainer, ListElement, Dot } from './NavbarStyles';

import { capitalizeFirstLetter } from '../../Utils/Functions';

interface RoadmapListProps {
  statusCounts: { [status: string]: number };
}

const RoadmapList: React.FC<RoadmapListProps> = ({ statusCounts }) => {
  const isValidStatus = (status: string): status is 'suggestion' | 'planned' | 'in-progress' | 'live' => {
    return ['suggestion', 'planned', 'in-progress', 'live'].includes(status);
  };

  return (
    <TagsContainer style={{ zIndex: '9999' }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3>Roadmap</h3>
        <Link style={{ textDecoration: 'underline', color: 'blue' }} to={`/roadmap`}>
          View
        </Link>
      </div>
      <ul style={{ width: '100%' }}>
        {Object.keys(statusCounts).map((status) => {
          if (isValidStatus(status)) {
            return (
              <ListElement key={status}>
                <div>
                  <Dot $status={status} />
                  <p style={{ display: 'inline-block', color: '#647196 ' }}>{capitalizeFirstLetter(status)}</p>
                </div>
                <h4 style={{ color: '#647196' }}>{statusCounts[status]}</h4>
              </ListElement>
            );
          }
          return null;
        })}
      </ul>
    </TagsContainer>
  );
};

export default RoadmapList;
