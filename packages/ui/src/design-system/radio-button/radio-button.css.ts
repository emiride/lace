import { styleVariants } from '@vanilla-extract/css';

import { style, sx, vars } from '../../design-tokens';

const radioGroupRootBase = style([
  sx({
    display: 'flex',
    flexDirection: 'column',
    gap: '$16',
  }),
  {
    fontFamily: vars.fontFamily.$nova,
    fontWeight: vars.fontWeights.$semibold,
    flexGrow: 1,
  },
]);

export const radioGroupRootWithIcon = styleVariants({
  default: [radioGroupRootBase],
  withIcon: [
    radioGroupRootBase,
    {
      gap: 0,
    },
  ],
});

export const radioGroupItemWrapperSelector = style([]);

export const withIcon = style([{ minHeight: 36 }]);

export const radioGroupItem = style([
  {
    width: vars.spacing.$16,
    height: vars.spacing.$16,
    padding: vars.spacing.$0,
    borderRadius: vars.radius.$circle,
    background: vars.colors.$radiobutton_unchecked_bgColor,
    border: `1px solid ${vars.colors.$radiobutton_unchecked_borderColor}`,
    position: 'relative',

    ':hover': {
      border: `1px solid ${vars.colors.$radiobutton_hover_color}`,
      background: vars.colors.$radiobutton_checked_bgColor,
    },

    ':disabled': {
      cursor: 'not-allowed',
      opacity: '20%',
    },

    selectors: {
      '&[data-state=checked]': {
        border: 'none',
      },
      ['&[data-state=checked]:focus::before']: {
        content: '',
        border: `3px solid ${vars.colors.$radiobutton_focus_color}`,
        width: vars.spacing.$16,
        height: vars.spacing.$16,
        borderRadius: vars.radius.$circle,
        background: 'transparent',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1',
        pointerEvents: 'none',
      },
      [`${radioGroupItemWrapperSelector} &[data-state=checked]::before`]: {
        content: 'none',
      },
    },
  },
]);

export const radioGroupItemWrapper = style([
  {
    position: 'relative',
    selectors: {
      [`&:has(${radioGroupItem}[data-state=checked]:focus)::after`]: {
        content: '',
        border: `3px solid ${vars.colors.$radiobutton_focus_color}`,
        width: vars.spacing.$fill,
        height: vars.spacing.$fill,
        borderRadius: vars.radius.$tiny,
        position: 'absolute',
        padding: `${vars.spacing.$6} ${vars.spacing.$8}`,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '1',
        pointerEvents: 'none',
      },
    },
  },
]);

export const radioGroupIndicator = style([
  sx({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$circle',
  }),
  {
    width: vars.spacing.$fill,
    height: vars.spacing.$fill,
    position: 'relative',
    backgroundColor: vars.colors.$radiobutton_indicator_backgroundColor,

    '::after': {
      content: '',
      display: 'flex',
      alignSelf: 'center',
      width: vars.spacing.$8,
      height: vars.spacing.$8,
      borderRadius: '50%',
      backgroundColor: vars.colors.$radiobutton_indicator_check_color,
    },
  },
]);

export const iconWrapper = style([
  sx({
    marginLeft: '$18',
    width: '$32',
    height: '$32',
  }),
  {
    flexGrow: 1,
  },
]);

export const icon = style([
  sx({
    borderRadius: '$small',
    ml: '$24',
    color: '$radiobutton_icon_color',
  }),
  {
    padding: '6px 6px 0 6px',
    border: `1px solid ${vars.colors.$radiobutton_unchecked_borderColor}`,

    ':focus': {
      backgroundColor: vars.colors.$radiobutton_focus_color,
    },

    ':hover': {
      border: `1px solid ${vars.colors.$radiobutton_icon_hover_border_color}`,
      backgroundColor: vars.colors.$radiobutton_icon_hover_color,
    },

    ':disabled': {
      cursor: 'not-allowed',
      opacity: '20%',
    },
  },
]);

export const root = style([
  sx({
    alignItems: 'center',
    justifyContent: 'stretch',
    borderRadius: '$small',
  }),
  {
    display: 'inline-flex',
  },
]);

export const label = style({
  fontSize: '15px',
  lineHeight: '1',
  paddingLeft: '15px',
  display: 'flex',
});

export const disabled = style([
  sx({
    opacity: '$0_24',
  }),
  {
    cursor: 'not-allowed',
  },
]);