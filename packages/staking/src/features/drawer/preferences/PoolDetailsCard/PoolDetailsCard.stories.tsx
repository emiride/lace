import { Story, StoryDefault } from '@ladle/react';
import { useState } from 'react';
import { PoolDetailsCard } from './';

export const PoolDetailsCardStory: Story = () => {
  const [card1Expanded, setCard1Expanded] = useState(true);
  const [card2Expanded, setCard2Expanded] = useState(false);

  return (
    <>
      <PoolDetailsCard
        color="#475"
        name="Pool Name"
        actualRatio={25}
        onRemove={() => void 0}
        stakeValue="10,000.00"
        cardanoCoinSymbol="ADA"
        savedRatio={30}
        targetRatio={30}
        onExpandButtonClick={() => setCard1Expanded((expanded) => !expanded)}
        onPercentageChange={(nextValue) => console.info('changed 1:', nextValue)}
        expanded={card1Expanded}
      />
      <PoolDetailsCard
        color="#475"
        name="Pool Name"
        actualRatio={10}
        onRemove={() => void 0}
        stakeValue="4,000.00"
        targetRatio={10}
        cardanoCoinSymbol="ADA"
        onExpandButtonClick={() => setCard2Expanded((expanded) => !expanded)}
        onPercentageChange={(nextValue) => console.info('changed 2:', nextValue)}
        expanded={card2Expanded}
      />
    </>
  );
};

const storyDefault: StoryDefault = {
  title: 'Staking',
};

export default storyDefault;
