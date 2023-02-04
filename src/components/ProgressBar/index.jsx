import React, { useCallback } from 'react';
import { Progress } from 'flowbite-react';

const ProgressBar = (props) => {
  const {
    emoji,
    title,
    data: { percentage, days },
    showDiff,
  } = props;

  const displayDiff = useCallback(() => {
    if (showDiff) {
      if (typeof days !== 'number') {
        return `${days} Left`;
      }

      const daySpan = `Day${days === -1 || days === 1 ? '' : 's'}`;
      if (days === 0) {
        return `Today!`;
      } else if (days < 0) {
        return `${Math.abs(days)} ${daySpan} Over`;
      }
      return `${days} ${daySpan} Left`;
    } else {
      return `${percentage > 100 ? 0 : percentage}%`;
    }
  }, [showDiff, percentage, days]);

  return (
    <div class="my-6">
      <div class="flex justify-between items-center font-semibold text-md">
        <div>
          <span role="img" aria-labelledby="emoji">
            {emoji}
          </span>{' '}
          {title}
        </div>
        <div>{displayDiff()}</div>
      </div>
      <Progress
        progress={percentage > 100 ? 0 : percentage}
        size="sm"
        color="red"
        class="my-1"
      />
    </div>
  );
};

export default React.memo(ProgressBar);
