import fs from 'fs'
import Link from 'next/link';
import csvParser from 'csv-parser';

export default  function Home() {

  return (
    <div className='m-5 p-6 rounded-xl border-inherit border-2'>
      <div className='text-xl py-3 text-current text-gray-600/100 font-medium'>
        Click on the below problem statement to navigate to the solution:
      </div>
      <div className='ml-6 py-2 hover:text-blue-600'>
        <Link href="/problem1">Problem 1: Implement a Map with Location Markers and Risk Indicators</Link>
      </div>
      <div className='ml-6 py-2 hover:text-blue-600'>
        <Link href="/problem2">Problem 2: Create a Data Table with Sorting and Filtering Capabilities</Link>
      </div>
      <div className='ml-6 py-2 hover:text-blue-600'>
        <Link href="/problem3">Problem 3: Visualize Risk Over Time with Line Graphs</Link>
      </div>
      <div className='ml-6 py-2 hover:text-blue-600'>
        <Link href="/problem4">Problem 4: Integrate Components and Optimize Performance</Link>
      </div>
    </div>

  )
} 
