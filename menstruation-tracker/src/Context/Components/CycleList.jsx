export default function CycleList({ cycles, onEdit, onDelete }) {
  if (!cycles.length) {
    return (
      <div className="card">
        <h2>Cycle history</h2>
        <p>No cycles logged yet. Add your first cycle above.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Cycle history</h2>
      <table className="cycle-table">
        <thead>
          <tr>
            <th>Start date</th>
            <th>Period length</th>
            <th>Cycle length</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map((c) => (
            <tr key={c.id}>
              <td>{c.startDate}</td>
              <td>{c.periodLength} days</td>
              <td>{c.cycleLength} days</td>
              <td>{c.notes || "-"}</td>
              <td>
                <button onClick={() => onEdit(c.id)}>Edit</button>
                <button onClick={() => onDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
