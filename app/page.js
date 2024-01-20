import image from "./Images/Oulu_logo.jpg";
export default async function Home() {
  let carParks = await fetchData();

  return (
    <main>
      <div className="bg">
        <div className="title-container p-16">
          <h2 className="title text-4xl text-white rounded-xl">
            Oulun Kaupungin Pysäköintitilastot Kohteittain
          </h2>
        </div>

        <ul className="grid grid-cols-6 gap-4 min-h-screen flex-col items-center text-white p-4">
          {carParks.map((carPark) => (
            <li key={carPark.carParkId}>
              <span className="block p-4 rounded-lg grid-blur text-center grid-cards">
                {carPark.name} <br></br> Paikkoja Vapaana:{" "}
                {carPark.spacesAvailable
                  ? carPark.spacesAvailable
                  : "Ei saatavilla"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
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
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = await response.json();
  return data.data.carParks;
}
