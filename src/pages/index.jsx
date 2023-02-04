import React, { useState, useEffect, useReducer } from 'react';
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

const initialState = {
  work: {
    emoji: '💻',
    title: 'Work',
    data: calcTimeFromTo(9, new Date(), 18),
  },
  hour: {
    emoji: '🕐',
    title: 'Hour',
    data: calcHour(new Date()),
  },
  today: {
    emoji: '🌎',
    title: 'Today',
    data: calcToday(new Date()),
  },
  week: {
    emoji: '🚌',
    title: 'Week',
    data: calcWeek(new Date()),
  },
  month: {
    emoji: '📅',
    title: 'Month',
    data: calcMonth(new Date()),
  },
  year: {
    emoji: '🎆',
    title: 'Year',
    data: calcYear(new Date()),
  },
  cake: {
    emoji: '🎂',
    title: 'My Cake Day',
    data: calcActualDate(new Date(), 16, 6),
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
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
    }, [1000]);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div class="pt-6 min-h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 ">
      <Helmet>
        <title>Time Progress{dots}</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <div class="mx-auto bg-slate-50 max-w-sm py-6 px-10 rounded">
        <div>
          <div class="flex justify-between items-center flex-wrap mb-12">
            <div class="text-xl font-semibold">
              <span role="img" aria-labelledby="emoji">
                📈
              </span>{' '}
              Progress
            </div>
            <div class="text-sm">{new Date().toLocaleString()}</div>
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
