export const calcLongYears = (now, years) => {
  const diff = now.getFullYear() % years;
  const start = new Date(now.getFullYear() - diff, 0, 1);
  const end = new Date(start.getFullYear() + years, 0, 1);

  return calcDayDiff(start, now, end);
};

export const calcYear = (now) => {
  const firstDate = new Date(new Date().getFullYear(), 0, 1);
  const lastDate = new Date(new Date().getFullYear() + 1, 0, 1);

  return calcDayDiff(firstDate, now, lastDate);
};

export const calcQuarter = (now) => {
  let month = 0;

  if (now.getMonth() < 3) {
    month = 0;
  } else if (now.getMonth() < 6) {
    month = 3;
  } else if (now.getMonth() < 9) {
    month = 6;
  } else {
    month = 9;
  }

  const firstDate = new Date(new Date().getFullYear(), month, 1);
  const lastDate = new Date(new Date().getFullYear(), month + 3, 1);

  return calcDayDiff(firstDate, now, lastDate);
};

export const calcMonth = (now) => {
  const firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1,
  );

  return calcDayDiff(firstDate, now, lastDate);
};

export const calcWeek = (now) => {
  const firstDate = new Date(new Date().setDate(now.getDate() - now.getDay()));
  let addDays = firstDate.getDate() + 7;
  const totalDays = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    0,
  ).getDate();

  if (addDays > totalDays) {
    addDays -= totalDays;
  }

  const lastDate = new Date(new Date().setDate(addDays));

  return calcDayDiff(firstDate, now, lastDate);
};

export const calcToday = (now) => {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const passedDay = Math.abs(now - start);
  const totalDay = Math.abs(end - start);

  return Math.floor((passedDay / totalDay) * 100);
};

export const calcHour = (now) => {
  const start = new Date(now);
  start.setHours(start.getHours(), 0, 0, 0);
  const end = new Date(now);
  end.setHours(end.getHours() + 1, 0, 0, 0);

  const passed = Math.abs(now - start);
  const total = Math.abs(end - start);

  return Math.floor((passed / total) * 100);
};

export const calcLastSpecificDayOfMonth = (now, month, day) => {
  let lastYearDate = getDate(new Date(now.getFullYear() - 1, month, 0));
  let thisYearDate = getDate(new Date(now.getFullYear(), month, 0));
  let nextYearDate = getDate(new Date(now.getFullYear() + 1, month, 0));

  function getDate(date) {
    if (date.getDay() < day) {
      date.setDate(date.getDate() - 7);
    }
    date.setDate(date.getDate() - (date.getDay() - day));
    return date;
  }

  if (
    now < thisYearDate ||
    now.toDateString() === thisYearDate.toDateString()
  ) {
    return calcDayDiff(lastYearDate, now, thisYearDate);
  }

  return calcDayDiff(thisYearDate, now, nextYearDate);
};

export const calcMonthWeekDay = (now, month, weekNo, day) => {
  const lastYearDate = getActualDate(
    new Date().getFullYear() - 1,
    month,
    weekNo,
    day,
  );
  const thisYearDate = getActualDate(
    new Date().getFullYear(),
    month,
    weekNo,
    day,
  );
  const nextYearDate = getActualDate(
    new Date().getFullYear() + 1,
    month,
    weekNo,
    day,
  );

  function getActualDate(year, month, weekNo, day) {
    const firstDateOfMonth = new Date(`${year}/${month}/1`);
    const diff = Math.abs(day - firstDateOfMonth.getDay());
    return new Date(
      firstDateOfMonth.setDate(
        firstDateOfMonth.getDate() + diff + (weekNo - 1) * 7,
      ),
    );
  }

  if (
    now < thisYearDate ||
    now.toDateString() === thisYearDate.toDateString()
  ) {
    return calcDayDiff(lastYearDate, now, thisYearDate);
  }

  return calcDayDiff(thisYearDate, now, nextYearDate);
};

export const calcActualDate = (now, day, month, year) => {
  const dayValue = day;
  const monthValue = Number(month) || now.getMonth() + 1;
  const yearValue = Number(year) || now.getFullYear();
  const lastYearDate = new Date(`${yearValue - 1}/${monthValue}/${dayValue}`);
  const thisYearDate = new Date(`${yearValue}/${monthValue}/${dayValue}`);
  const nextYearDate = new Date(`${yearValue + 1}/${monthValue}/${dayValue}`);

  if (now < thisYearDate || (year && now > thisYearDate)) {
    return calcDayDiff(lastYearDate, now, thisYearDate);
  }

  return calcDayDiff(thisYearDate, now, nextYearDate);
};

function calcDayDiff(start, cur, end) {
  start = start.setHours(0, 0, 0, 0);
  end = end.setHours(0, 0, 0, 0) - 1;

  const diffTime = Math.abs(cur - start);
  const totalDiffInMilliseconds = Math.abs(end - start);

  return Math.floor((diffTime / totalDiffInMilliseconds) * 100);
}

export function calcFromTo(start, now, end) {
  const startDate = new Date(start);
  const nowTime = new Date(now);
  const endDate = new Date(end);

  return calcDayDiff(startDate, nowTime, endDate);
}

function calcTimeDiff(start, cur, end) {
  let diffTime = cur - start;

  if (diffTime < 0) return 0;

  const totalDiffInMilliseconds = end - start;

  return Math.floor((diffTime / totalDiffInMilliseconds) * 100);
}

export function calcTimeFromTo(start, now, end) {
  const startDate = new Date(now);
  startDate.setHours(start);
  startDate.setMinutes(0);
  startDate.setMilliseconds(0);

  const nowTime = new Date(now);

  const endDate = new Date(now);
  endDate.setHours(end);
  endDate.setMinutes(0);
  endDate.setMilliseconds(0);

  return calcTimeDiff(startDate, nowTime, endDate);
}
