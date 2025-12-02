import { useEffect, useState } from "react";
import CycleSummary from "../CycleSummary";
import CycleForm from "../CycleForm";
import CycleList from "../CycleList";

function sortByDateDesc(a, b) {
  return new Date(b.startDate) - new Date(a.startDate);
}

export default function Tracker() {
  const [cycles, setCycles] = useState(() => {
    const saved = localStorage.getItem("menstruationCycles");
    return saved ? JSON.parse(saved).sort(sortByDateDesc) : [];
  });

  const [selectedCycle, setSelectedCycle] = useState(null);

  useEffect(() => {
    localStorage.setItem("menstruationCycles", JSON.stringify(cycles));
  }, [cycles]);

  const handleSaveCycle = (data) => {
    if (selectedCycle) {
      const updated = cycles
        .map((c) =>
          c.id === selectedCycle.id ? { ...selectedCycle, ...data } : c
        )
        .sort(sortByDateDesc);
      setCycles(updated);
      setSelectedCycle(null);
    } else {
      const newCycle = {
        id: crypto.randomUUID(),
        ...data,
      };
      setCycles((prev) => [...prev, newCycle].sort(sortByDateDesc));
    }
  };

  const handleEdit = (id) => {
    const cycle = cycles.find((c) => c.id === id);
    if (cycle) setSelectedCycle(cycle);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this entry?")) {
      setCycles((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="tracker-layout">
      <CycleSummary cycles={cycles} />

      <CycleForm
        onSubmit={handleSaveCycle}
        selectedCycle={selectedCycle}
        onCancelEdit={() => setSelectedCycle(null)}
      />

      <CycleList cycles={cycles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
