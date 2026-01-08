import notion, { NotionDatabaseIds } from "@/lib/notion";

export default async function Home() {
  const test = await notion.databases.retrieve({
    database_id: NotionDatabaseIds.WeeklyWeight,
  });

  console.log(test);

  return <div>helloworld</div>;
}
