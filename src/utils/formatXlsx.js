import reader from "xlsx";

export async function formatXlsx(req) {
  const buffers = [];

  for await (let chunk of req) {
    buffers.push(chunk);
  }

  const sheet = reader.read(Buffer.concat(buffers));
  const sheetName = sheet.SheetNames[0];
  const sheetData = sheet.Sheets[sheetName];

  const headers = {};
  const data = [];

  for (let key in sheetData) {
    if (key[0] === "!") continue;
    const col = key[0];
    const row = Number(key[1]);
    const value = sheetData[key].v;

    if (row === 1) {
      headers[col] = value;
      continue;
    }

    if (!data[row]) {
      data[row] = {};
    }

    data[row][headers[col]] = value;
  }

  data.shift();
  data.shift();

  return data;
}
