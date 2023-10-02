import { Box, Card, ControlButton, Flex, PieChartColor, Text } from '@lace/ui';
import ChevronDownIcon from '@lace/ui/dist/assets/icons/chevron-down.component.svg';
import ChevronUpIcon from '@lace/ui/dist/assets/icons/chevron-up.component.svg';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfoIcon from '../../../../assets/icons/info-icon.svg';
import { Tooltip } from '../../../overview/StakingInfoCard/StatsTooltip';
import {
  PERCENTAGE_SCALE_MAX,
  TMP_HOTFIX_PORTFOLIO_STORE_NOT_PERSISTED,
} from '../../../store/delegationPortfolioStore/constants';
import { DelegationRatioSlider } from '../DelegationRatioSlider';
import * as styles from './PoolDetailsCard.css';
import TrashIcon from './trash.svg';

type PercentagesChangeHandler = (value: number) => void;

interface PoolDetailsCardProps {
  color: PieChartColor;
  expanded: boolean;
  name: string;
  onExpandButtonClick: () => void;
  onPercentageChange: PercentagesChangeHandler;
  onRemove?: () => void;
  actualPercentage?: number;
  savedPercentage?: number;
  targetPercentage: number;
  stakeValue: string;
  cardanoCoinSymbol: string;
}

// eslint-disable-next-line complexity
export const PoolDetailsCard = ({
  color,
  expanded,
  name,
  onExpandButtonClick,
  onPercentageChange,
  onRemove,
  actualPercentage,
  savedPercentage,
  stakeValue,
  targetPercentage,
  cardanoCoinSymbol,
}: PoolDetailsCardProps) => {
  const firstRender = useRef(true);
  const { t } = useTranslation();
  const [percentage, setPercentage] = useState(targetPercentage);
  const onPercentageChangeRef = useRef(onPercentageChange);

  useEffect(() => {
    onPercentageChangeRef.current = onPercentageChange;
  }, [onPercentageChange]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onPercentageChangeRef.current(percentage);
  }, [percentage, onPercentageChangeRef]);

  return (
    <Card.Outlined className={styles.root}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        my="$24"
        mx="$32"
        style={TMP_HOTFIX_PORTFOLIO_STORE_NOT_PERSISTED ? { marginBottom: 0 } : {}}
      >
        <Flex alignItems="center" gap="$24">
          <Box className={styles.poolIndicator} style={{ backgroundColor: color }} />
          <Text.SubHeading>{name}</Text.SubHeading>
        </Flex>
        {!TMP_HOTFIX_PORTFOLIO_STORE_NOT_PERSISTED && (
          <ControlButton.Icon icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={onExpandButtonClick} />
        )}
      </Flex>
      {expanded && (
        <>
          {!TMP_HOTFIX_PORTFOLIO_STORE_NOT_PERSISTED && (
            <Flex className={styles.valuesRow}>
              <Flex pl="$32" pr="$32" flexDirection="column" className={styles.valueBox}>
                <Box>
                  <Text.Body.Large weight="$medium" className={styles.valueLabel}>
                    {t('drawer.preferences.poolDetails.savedRatio')}
                  </Text.Body.Large>
                  {/* TODO tooltips & styles */}
                  <InfoIcon className={styles.valueInfoIcon} />
                </Box>
                <Text.Body.Large weight="$semibold">
                  {savedPercentage || '-'} {savedPercentage && <Text.Body.Small weight="$medium">%</Text.Body.Small>}
                </Text.Body.Large>
              </Flex>
              <Flex pl="$32" pr="$32" flexDirection="column" className={styles.valueBox}>
                <Box>
                  <Text.Body.Large weight="$medium" className={styles.valueLabel}>
                    {t('drawer.preferences.poolDetails.actualRatio')}
                  </Text.Body.Large>
                  {/* TODO tooltips & styles */}
                  <InfoIcon className={styles.valueInfoIcon} />
                </Box>
                <Text.Body.Large weight="$semibold">
                  {actualPercentage || '-'} {actualPercentage && <Text.Body.Small weight="$medium">%</Text.Body.Small>}
                </Text.Body.Large>
              </Flex>
              <Flex pl="$32" pr="$32" flexDirection="column" className={styles.valueBox}>
                <Box>
                  <Text.Body.Large weight="$medium" className={styles.valueLabel}>
                    {t('drawer.preferences.poolDetails.actualStake')}
                  </Text.Body.Large>
                  {/* TODO tooltips & styles */}
                  <InfoIcon className={styles.valueInfoIcon} />
                </Box>
                <Text.Body.Large weight="$semibold">
                  {stakeValue} <Text.Body.Small weight="$medium">{cardanoCoinSymbol}</Text.Body.Small>
                </Text.Body.Large>
              </Flex>
            </Flex>
          )}
          <Flex
            gap="$28"
            p="$32"
            pt="$20"
            flexDirection="column"
            alignItems="center"
            style={TMP_HOTFIX_PORTFOLIO_STORE_NOT_PERSISTED ? { gap: 16, paddingTop: 0 } : {}}
          >
            <Flex justifyContent="space-between" alignItems="center" w="$fill">
              {!TMP_HOTFIX_PORTFOLIO_STORE_NOT_PERSISTED ? (
                <Text.Body.Large>Edit saved ratio</Text.Body.Large>
              ) : (
                <Box w="$120" />
              )}
              <Flex alignItems="center" gap="$12">
                <Text.Body.Large>Ratio</Text.Body.Large>
                <Box className={styles.inputContainer}>
                  <input
                    type="text"
                    className={styles.input}
                    max={PERCENTAGE_SCALE_MAX}
                    min={percentage === 0 ? 0 : 1}
                    value={percentage}
                  />
                </Box>
                <Text.Body.Large>%</Text.Body.Large>
              </Flex>
            </Flex>
            <DelegationRatioSlider
              step={1}
              max={PERCENTAGE_SCALE_MAX}
              min={percentage === 0 ? 0 : 1}
              value={percentage}
              onValueChange={setPercentage}
            />
            <Tooltip content={onRemove ? undefined : t('drawer.preferences.pickMorePools')}>
              <div>
                <ControlButton.Outlined
                  label="Remove pool from portfolio"
                  icon={<TrashIcon />}
                  w="$fill"
                  onClick={onRemove}
                  disabled={!onRemove}
                />
              </div>
            </Tooltip>
          </Flex>
        </>
      )}
    </Card.Outlined>
  );
};
