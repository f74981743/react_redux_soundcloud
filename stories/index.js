import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import ProgressBar from '../src/components/Player/ProgressBar';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('ProgressBar', module)
  .add('progressbar', () => {
    const player = {
      duration: 1,
      currentTime: 0,
      progressPercent: '0%',
      bufferedPercent: '0%',
      isMuted: false,
      isPaused: true,
      volume: 0.5,
      loopMode: 'none',
      isDragging: false
    };

    return getProgressBar(player);
  });


function getProgressBar(player) {
  return <ProgressBar player={player} />
}
  //.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  //.add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
