import { expect } from 'chai';
import { t } from '../../utils/translationService';
import ManageStakingDrawer from '../../elements/multidelegation/ManageStakingDrawer';

class ManageStakingDrawerAssert {
  assertSeeManageStakingDrawer = async (manageButtonInitiated = false) => {
    await ManageStakingDrawer.drawerHeaderCloseButton.waitForDisplayed();
    await ManageStakingDrawer.drawerNavigationTitle.waitForDisplayed();
    expect(await ManageStakingDrawer.drawerNavigationTitle.getText()).to.equal(
      await t('drawer.titleSecond', 'staking')
    );
    await ManageStakingDrawer.infoCard.waitForDisplayed();
    await ManageStakingDrawer.selectedPoolsLabel.waitForDisplayed();
    await ManageStakingDrawer.addPoolsButton.waitForDisplayed();
    if (!manageButtonInitiated) {
      await ManageStakingDrawer.nextButton.waitForDisplayed();
      expect(await ManageStakingDrawer.nextButton.getText()).to.equal(
        await t('drawer.preferences.confirmButton', 'staking')
      );
    }
  };

  assertSeeOnlyFirstPoolDetailsExpanded = async () => {
    await ManageStakingDrawer.infoCard.waitForDisplayed();
    expect(await ManageStakingDrawer.poolDetailsIconExpanded.length).to.equal(1);
    await this.assertSeePoolDetails(0);
  };

  assertSeePoolDetails = async (poolIndex: number) => {
    await ManageStakingDrawer.poolDetailsName[poolIndex].waitForClickable();
    await ManageStakingDrawer.poolDetailsIconExpanded[poolIndex].waitForClickable();
    await ManageStakingDrawer.poolDetailsSavedRatioTitle(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsSavedRatioValue(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsSavedRatioTooltipIcon(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsActualRatioTitle(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsActualRatioValue(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsActualRatioTooltipIcon(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsActualStakeTitle(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsActualStakeValue(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsActualStakeTooltipIcon(poolIndex).waitForClickable();
    await ManageStakingDrawer.poolDetailsSavedRatioTooltipIcon(poolIndex).moveTo();
    await ManageStakingDrawer.tooltip(0).waitForClickable();
    expect(await ManageStakingDrawer.tooltip(0).getText()).to.equal(
      await t('drawer.preferences.poolDetails.savedRatioTooltip', 'staking')
    );
    await ManageStakingDrawer.poolDetailsActualRatioTooltipIcon(poolIndex).moveTo();
    await ManageStakingDrawer.tooltip(1).waitForClickable();
    expect(await ManageStakingDrawer.tooltip(1).getText()).to.equal(
      await t('drawer.preferences.poolDetails.actualRatioTooltip', 'staking')
    );
    await ManageStakingDrawer.poolDetailsActualStakeTooltipIcon(poolIndex).moveTo();
    await ManageStakingDrawer.tooltip(2).waitForClickable();
    expect(await ManageStakingDrawer.tooltip(2).getText()).to.equal(
      await t('drawer.preferences.poolDetails.actualStakeTooltip', 'staking')
    );
    expect(await ManageStakingDrawer.poolDetailsEditRatioTitle(poolIndex).getText()).to.not.be.empty;
    expect(await ManageStakingDrawer.poolDetailsRatioTitle(poolIndex).getText()).to.not.be.empty;
    expect(Number(await ManageStakingDrawer.poolDetailsRatioInput(poolIndex).getValue()))
      .to.be.below(101)
      .and.above(0);
    expect(await ManageStakingDrawer.poolDetailsRatioPercentSign(poolIndex).getText()).to.equal('%');
    await ManageStakingDrawer.poolDetailsSliderMinus(0).waitForClickable();
    await ManageStakingDrawer.poolDetailsSlider(0).waitForClickable();
    await ManageStakingDrawer.poolDetailsSliderPlus(0).waitForClickable();
    await ManageStakingDrawer.poolDetailsRemovePoolButton(0).waitForDisplayed();
  };
}

export default new ManageStakingDrawerAssert();
