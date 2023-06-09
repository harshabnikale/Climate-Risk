// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';

function getServerSideProps(file: any) {
  return new Promise((resolve, reject) => {
    const results: any = [];
    fs.createReadStream(file)
      .pipe(csvParser())
      .on('data', (data: any) => {
        results.push(data);
      })
      .on('end', () => {
        resolve({ data: results });
      })
      .on('error', (err: any) => {
        reject(err);
      });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: any
) {
  //  //load and parse data
  const file = path.join(process.cwd(), 'public/static/sample_data.csv')
 let data: any = await getServerSideProps(file);
console.log(data);

 data.data.forEach((element: any) => {
  //applying toFixed to maintain consistency in data
  const newLat = parseFloat(element.Lat).toFixed(4);
  element.Lat = newLat;
  const newLong = parseFloat(element.Long).toFixed(4);
  element.Long = newLong;
  Object.assign(element, { Location: element.Lat + ',' + element.Long});
});
  res.status(200).json(data.data);
}
