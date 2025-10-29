export type AirtableRecord<T = Record<string, unknown>> = {
  id: string;
  createdTime?: string;
  fields: T;
};

export async function getAirtableRecords<T = Record<string, unknown>>() {
  const airtableUrl = process.env.AIRTABLE_URL as string | undefined;
  if (!airtableUrl) {
    throw new Error("AIRTABLE_URL environment variable is not defined");
  }

  const res = await fetch(airtableUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Airtable records");
  }

  const data = await res.json();
  return data.records as AirtableRecord<T>[];
}


