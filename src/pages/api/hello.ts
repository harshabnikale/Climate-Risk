// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import csvParser from 'csv-parser';

function getServerSideProps() {
  return new Promise((resolve, reject) => {
    const results: any = [];
    fs.createReadStream('./public/static/sample_data.csv')
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
 let data: any = await getServerSideProps();
 data.data.forEach((element: any) => {
  Object.assign(element, { Location: element.Lat + ',' + element.Long, });
  // a.push({location: element.Lat +','+ element.Long,})
});
  res.status(200).json(data.data);
}
