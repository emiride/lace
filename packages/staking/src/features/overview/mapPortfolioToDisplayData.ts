import { Wallet } from '@lace/cardano';
import { PIE_CHART_DEFAULT_COLOR_SET, PieChartColor, PieChartGradientColor } from '@lace/ui';
import { Immutable } from 'immer';
import { Balance, StakingRewards } from '../outside-handles-provider';
import { DelegationPortfolioStakePool } from '../store';

const SATURATION_UPPER_BOUND = 100;

type MapPortfolioToDisplayDataParams = {
  balance: Balance;
  cardanoCoin: Wallet.CoinId;
  cardanoPrice?: number;
  portfolio: Immutable<DelegationPortfolioStakePool[]>;
  stakingRewards: StakingRewards;
};

export const mapPortfolioToDisplayData = ({
  balance,
  cardanoCoin,
  cardanoPrice,
  portfolio,
  stakingRewards,
}: MapPortfolioToDisplayDataParams) => {
  const weightsSum = portfolio.reduce((sum, { weight }) => sum + weight, 0);

  const displayData = portfolio.map((item, index) => ({
    ...item,
    ...item.displayData,
    cardanoCoin,
    coinBalance: (() => {
      const totalBalance = balance?.total?.coinBalance ? Number(balance?.total?.coinBalance) : 0;
      return totalBalance * (item.weight / weightsSum);
    })(),
    color: PIE_CHART_DEFAULT_COLOR_SET[index] as PieChartColor,
    fiat: cardanoPrice,
    lastReward: Wallet.util.lovelacesToAdaString(stakingRewards.lastReward.toString()),
    status: ((): 'retired' | 'saturated' | undefined => {
      if (item.displayData.retired) return 'retired';
      if (Number(item.displayData.saturation || 0) > SATURATION_UPPER_BOUND) return 'saturated';
      // eslint-disable-next-line consistent-return, unicorn/no-useless-undefined
      return undefined;
    })(),
    totalRewards: Wallet.util.lovelacesToAdaString(stakingRewards.totalRewards.toString()),
  }));

  if (displayData.length === 1) {
    displayData.forEach((item) => (item.color = PieChartGradientColor.LaceLinearGradient));
  }

  return displayData;
};
