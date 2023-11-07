
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getColorForStatus = (status: string): string => {
  switch (status) {
    case 'planned':
      return '#F49F85';
    case 'in-progress':
      return '#AD1FEA';
    case 'live':
      return '#62BCFA';
    default:
      return 'transparent'; // Default color in case none of the statuses match
  }
};
