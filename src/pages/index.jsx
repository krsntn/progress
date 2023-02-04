import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import {
  calcYear,
  calcMonth,
  calcWeek,
  calcToday,
  calcHour,
  calcTimeFromTo,
  calcActualDate,
} from '../utils/calc';
import ProgressBar from '../components/ProgressBar';
import { Timer } from 'ez-timer';

const defaultValue = { percentage: 0, days: 0 };

const initialState = {
  work: {
    emoji: '💻',
    title: 'Work',
    data: defaultValue,
  },
  hour: {
    emoji: '🕐',
    title: 'Hour',
    data: defaultValue,
  },
  today: {
    emoji: '🌎',
    title: 'Today',
    data: defaultValue,
  },
  week: {
    emoji: '🚌',
    title: 'Week',
    data: defaultValue,
  },
  month: {
    emoji: '📅',
    title: 'Month',
    data: defaultValue,
  },
  year: {
    emoji: '🎆',
    title: 'Year',
    data: defaultValue,
  },
  cake: {
    emoji: '🎂',
    title: 'My Cake Day',
    data: defaultValue,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      const obj = {};
      Object.keys(initialState).forEach((key) => {
        obj[key] = {
          ...initialState[key],
          data: action.payload[key],
        };
      });
      return {
        ...state,
        ...obj,
      };
    default:
      throw new Error();
  }
}

const Work = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dots, setDots] = useState('');

  const updateProgress = useCallback((now) => {
    setDots('.'.repeat(now.getSeconds() % 4));

    dispatch({
      type: 'update',
      payload: {
        work: calcTimeFromTo(9, now, 18),
        hour: calcHour(now),
        today: calcToday(now),
        week: calcWeek(now),
        month: calcMonth(now),
        year: calcYear(now),
        cake: calcActualDate(now, 16, 6),
      },
    });
  }, []);

  useEffect(() => {
    const timer = new Timer(() => {
      const time = new Date();
      updateProgress(time);
    }, 1000);
    timer.start();

    return () => timer.stop();
  }, [updateProgress]);

  return (
    <div class="pt-6 min-h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 ">
      <Helmet>
        <title>Time Progress{dots}</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <div class="mx-auto bg-slate-50 max-w-lg py-6 px-10 rounded-lg">
        <div>
          <div class="flex justify-between items-center mb-12">
            <div class="text-xl font-semibold">
              <span role="img" aria-labelledby="emoji">
                📈
              </span>{' '}
              Progress
            </div>
            <div class="text-md font-semibold">
              {new Date().toLocaleString()}
            </div>
          </div>

          {Object.keys(state).map((key) => {
            return (
              <ProgressBar
                key={key}
                emoji={state[key].emoji}
                title={state[key].title}
                data={state[key].data}
              />
            );
          })}

          <div class="text-center text-xs pt-6">
            Build by <a href="http://dev.krsn.xyz">karson.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
