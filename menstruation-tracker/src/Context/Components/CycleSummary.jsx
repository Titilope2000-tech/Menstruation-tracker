function calculateAverageCycleLength(cycles) {
  const withLength = cycles.filter((c) => c.cycleLength);
  if (!withLength.length) return null;
  const sum = withLength.reduce((acc, c) => acc + c.cycleLength, 0);
  return Math.round(sum / withLength.length);
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function CycleSummary({ cycles }) {
  if (!cycles.length) {
    return (
      <div className="card">
        <h2>Overview</h2>
        <p>Log your first cycle to see predictions and stats.</p>
      </div>
    );
  }

  const lastCycle = cycles[0];
  const averageCycleLength = calculateAverageCycleLength(cycles);

  const nextPeriodDate =
    averageCycleLength && lastCycle.startDate
      ? addDays(lastCycle.startDate, averageCycleLength)
      : null;

  let fertileWindow = null;
  if (nextPeriodDate) {
    const start = addDays(nextPeriodDate, -16);
    const end = addDays(nextPeriodDate, -12);
    const ovulation = addDays(nextPeriodDate, -14);
    fertileWindow = { start, end, ovulation };
  }

  return (
    <div className="card">
      <h2>Overview</h2>
      <p>
        <strong>Last period start:</strong> {lastCycle.startDate}
      </p>
      <p>
        <strong>Average cycle length:</strong>{" "}
        {averageCycleLength ? `${averageCycleLength} days` : "Not enough data"}
      </p>
      <p>
        <strong>Predicted next period:</strong>{" "}
        {nextPeriodDate || "Log more cycles to see prediction"}
      </p>
      {fertileWindow && (
        <p>
          <strong>Estimated fertile window:</strong> {fertileWindow.start} –{" "}
          {fertileWindow.end} (ovulation around {fertileWindow.ovulation})
        </p>
      )}
    </div>
  );
}
