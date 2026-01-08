import notion, { NotionDataSourceIds } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dayjs from "./extended-dayjs";

// retrive this week's weight
export const weekSummary = async () => {
  const weeklyWeight = await notion.dataSources.query({
    data_source_id: NotionDataSourceIds.WeeklyWeight,
    filter: {
      property: "Start of Week",
      date: {
        this_week: {},
      },
    },
  });

  if (weeklyWeight.results.length !== 1)
    throw new Error(
      `Expected exactly one entry for this week's weight, but found ${weeklyWeight.results.length}`
    );

  const result = weeklyWeight.results[0] as PageObjectResponse;
  const weightProperty = result.properties["Weight (lbs)"] as {
    number: number;
  };

  return {
    weightInLbs: weightProperty.number,
    caloricDeficit: (
      result.properties["Calorie Deficit Goal"] as {
        number: number;
      }
    ).number,
  };
};

// retrive today's food log
export const todaysFoodLog = async () => {
  const res = await notion.dataSources.query({
    data_source_id: NotionDataSourceIds.FoodJournal,
    filter: {
      property: "Date",
      date: {
        on_or_after: dayjs()
          .startOf("day")
          .tz("America/Toronto")
          .format("YYYY-MM-DD"),
      },
    },
  });

  const foodLog = (res.results as PageObjectResponse[]).map((page) => ({
    id: page.id,
    date: (page.properties["Date"] as { date: { start: string } }).date.start,
    caloriesIn: (page.properties["Calories In"] as { number: number }).number,
    mealType: (page.properties["Meal Type"] as { select: { name: string } })
      .select.name,
    name: (page.properties["Name"] as { title: { plain_text: string }[] })
      .title[0].plain_text,
  }));

  return foodLog;
};
