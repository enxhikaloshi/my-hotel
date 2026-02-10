import { FaPlane, FaBed, FaUser, FaList } from "react-icons/fa";
import styles from "./page.module.css";

export default function StepProgress({ step, completedSteps }: { step: number; completedSteps: number[] }) {
  const steps = [
    { id: 1, label: "Travel Details", icon: <FaPlane /> },
    { id: 2, label: "Room", icon: <FaBed /> },
    { id: 3, label: "Personal Data", icon: <FaUser /> },
    { id: 4, label: "Summary", icon: <FaList /> },
  ];

  // line between steps
const stepsCount = 4;
let lineWidth = ((step - 0.5) / (stepsCount - 1)) * 100;
if (lineWidth > 100) lineWidth = 100;

  return (
    <div className={styles.steppercontainer}>
      <div className={styles.stepperline}>
        <div
          className={styles.stepperlineactive}
          style={{ width: `${lineWidth}%` }}
        />
      </div>

      <div className={styles.steppersteps}>
        {steps.map((s) => (
          <div key={s.id} className={styles.stepperstep}>
            <div
              className={`${styles.stepperlabel} ${
                step === s.id
                  ? styles.activestepper
                  : step > s.id
                  ? styles.completed
                  : s.id === 1
                  ? styles.firstactive
                  : ""
              }`}
            >
              <span className={styles.steppericon}>{s.icon}</span>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
