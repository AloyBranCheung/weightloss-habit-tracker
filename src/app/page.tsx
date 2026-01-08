import { weekSummary, todaysFoodLog } from "@/utils/notion";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [summary, foodLog] = await Promise.all([
    weekSummary(),
    todaysFoodLog(),
  ]);

  if (!summary || !foodLog) {
    return <div>Add Notion data for this week to begin.</div>;
  }

  const totalCaloriesEaten = foodLog.reduce(
    (acc, entry) => acc + entry.caloriesIn,
    0
  );
  const remainingCalories = summary.caloricDeficit - totalCaloriesEaten;

  const thisWeeksDate = summary.date;

  return (
    <main className="h-screen w-full flex items-center justify-center flex-col gap-8 p-4">
      <h1>
        <b>Calorie Counter Summary</b>
      </h1>
      <section>
        <h2>
          <b>This Week {thisWeeksDate}</b>
        </h2>
        <p>Weight: {summary.weightInLbs} lbs</p>
        <p>Caloric Deficit Goal : {summary.caloricDeficit} calories</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>
          <b>Today&apos;s Food Log {foodLog[0].date}</b>
        </h2>
        <ul>
          {foodLog.map((entry) => (
            <li key={entry.id}>
              {entry.name} - {entry.caloriesIn} calories
            </li>
          ))}
        </ul>
        <hr />
        <h3>Total Calories Eaten: {totalCaloriesEaten}</h3>
        <p>
          <b>Remaining Calories: {remainingCalories}</b>
        </p>
      </section>
    </main>
  );
}
