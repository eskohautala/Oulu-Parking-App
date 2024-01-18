import Image from 'next/image'

export default async function Home() {
  let carParks = await fetchData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 font-bold">
      
      <h1 className='text-2xl'> Kaikki vapaana olevat paikat </h1>

    <ul className='grid grid-cols-6 gap-4 flex min-h-screen flex-col items-center justify-content'> 
        {carParks.map((carPark) =>
        <li key ={carPark.carParkId}>
          <span className='block p-2 border border-gray-300 rounded'>
          {carPark.name} <br></br> Paikkoja Vapaana: {carPark.spacesAvailable ? carPark.spacesAvailable: 'Ei saatavilla'}
          </span>
        </li>
        )}
    </ul>

    </main>
  )
 }
// Funktio fetch kutsun tekemiseen, palauttaa json tiedoston carParks muuttujaan
  async function fetchData() {

    const query = `
    query GetAllCarParks {
      carParks {
        carParkId
        name
        maxCapacity
        spacesAvailable
      }
    }
    `;

    const response = await fetch("https://api.oulunliikenne.fi/proxy/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }, 
      body: JSON.stringify({
        query
      }) 

    }); 
    const data = await response.json();
    return data.data.carParks;
} 



