import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default notion;

export enum NotionDataSourceIds {
  WeeklyWeight = "2df9611a-ef53-80c2-827a-000bd2accdbe",
  FoodJournal = "2df9611a-ef53-8005-8d40-000b54daa54b",
}
