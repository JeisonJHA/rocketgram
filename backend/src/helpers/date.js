exports.dateToString = date => new Date(date).toISOString();

exports.timeUntilNow = date => {
  const now = Date.now();
  const created = new Date(date);
  const untilNow = now - created;
  const week = Math.floor((untilNow) / 604800000);
  const day = Math.floor((untilNow) / 86400000);
  const hour = Math.floor((untilNow) / 3600000);
  if (week > 0) {
    return week + returnPlural(" WEEK", week) + " AGO"
  };
  if (day > 0) {
    return day + returnPlural(" DAY", day) + " AGO"
  };
  if (hour > 0) {
    return hour + returnPlural(" HOUR", hour) + " AGO"
  };
}

const returnPlural = (S, V) => {
  if (V > 1) { return S + "S" }
  return S
}