/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

const emptyForm = {
  startDate: "",
  periodLength: 5,
  cycleLength: 28,
  notes: "",
};

export default function CycleForm({ onSubmit, selectedCycle, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (selectedCycle) {
      setFormData({
        startDate: selectedCycle.startDate,
        periodLength: selectedCycle.periodLength,
        cycleLength: selectedCycle.cycleLength,
        notes: selectedCycle.notes || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedCycle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "periodLength" || name === "cycleLength"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startDate) {
      alert("Please choose a start date.");
      return;
    }
    if (formData.periodLength <= 0) {
      alert("Period length must be at least 1 day.");
      return;
    }
    onSubmit(formData);
    setFormData(emptyForm);
  };

  return (
    <div className="card">
      <h2>{selectedCycle ? "Edit cycle" : "Add cycle"}</h2>
      <form onSubmit={handleSubmit} className="cycle-form">
        <div>
          <label>Period start date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Period length (days)</label>
          <input
            type="number"
            name="periodLength"
            min="1"
            max="10"
            value={formData.periodLength}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Cycle length (days)</label>
          <input
            type="number"
            name="cycleLength"
            min="15"
            max="60"
            value={formData.cycleLength}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Notes / symptoms</label>
          <textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g. cramps, mood, flow..."
          />
        </div>

        <div className="form-actions">
          <button type="submit">
            {selectedCycle ? "Update" : "Save cycle"}
          </button>
          {selectedCycle && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
