import Colors from '../../theme/colors';

export const getTypeCalor = (type: string) => {
  let badgeColorAlt = Colors.GREEN_47;

  if (type === 'water') {
    badgeColorAlt = Colors.BLUE_E0;
  } else if (type === 'fire') {
    badgeColorAlt = Colors.RED;
  } else if (type === 'bug') {
    badgeColorAlt = Colors.YELLOW_WARNING;
  } else if (type === 'normal') {
    badgeColorAlt = Colors.GRAY;
  }

  return {
    badgeColor: Colors.WHITE,
    badgeColorAlt,
  };
};
