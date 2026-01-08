import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default notion;

export enum NotionDatabaseIds {
  WeeklyWeight = "2df9611aef538024931ac0294ff14536",
}
