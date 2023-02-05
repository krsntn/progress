import React from 'react';
import { Progress } from 'flowbite-react';

const ProgressBar = (props) => {
  const { emoji, title, percentage } = props;

  return (
    <div className="my-6">
      <div className="flex justify-between items-center font-semibold text-md">
        <div>
          <span role="img" aria-labelledby="emoji">
            {emoji}
          </span>{' '}
          {title}
        </div>
        <div>{percentage}</div>
      </div>
      <Progress
        progress={percentage > 100 ? 0 : percentage}
        size="sm"
        color="red"
        className="my-1"
      />
    </div>
  );
};

export default React.memo(ProgressBar);
