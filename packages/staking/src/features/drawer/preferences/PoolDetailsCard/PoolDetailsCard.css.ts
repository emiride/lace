import { style, sx } from '@lace/ui';
import { theme } from '../../../theme';

export const root = style({
  minWidth: theme.spacing.$584,
});

export const poolIndicator = sx({ borderRadius: '$tiny', height: '$40', width: '$4' });

export const valuesRow = style({
  border: `1px solid ${theme.colors.$preferencesPoolCardBorderColor}`,
  borderLeftWidth: 0,
  borderRightWidth: 0,
});

export const valueBox = style({
  ':last-of-type': {
    borderRightWidth: 0,
  },
  borderRight: `solid 1px ${theme.colors.$preferencesPoolCardBorderColor}`,
  flexGrow: 1,
  paddingBottom: theme.spacing.$20,
  paddingTop: theme.spacing.$16,
});

export const valueLabel = style({
  color: '#6F7786', // TODO
});

export const valueInfoIcon = style({
  marginLeft: theme.spacing.$8,
});

export const inputContainer = style({
  ':hover': {
    outline: `2px solid ${theme.colors.$ratioInputContainerHoverOutlineColor}`,
  },
  alignItems: 'center',
  background: theme.colors.$ratioInputContainerBgColor,
  borderRadius: theme.radius.$medium,
  display: 'flex',
  height: theme.spacing.$48,
  justifyContent: 'center',
  width: theme.spacing.$48,
});

export const input = style({
  ':disabled': {
    opacity: theme.opacities.$0_5,
  },
  background: 'transparent',
  border: 'none',
  color: theme.colors.$ratioInputValueColor,
  fontFamily: theme.fontFamily.$nova,
  fontSize: theme.fontSizes.$18,
  fontWeight: theme.fontWeights.$semibold,
  outline: 'none',
  textAlign: 'center',
  width: '100%',
});
