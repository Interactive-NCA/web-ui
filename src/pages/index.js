import Head from 'next/head'
import GameMap from '@/components/GameMap'
import React, { useState } from 'react';
import TileSelector from '@/components/TileSelector';


export default function Home() {
  const [selectedTileType, setSelectedTileType] = useState(1);
  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 6, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 3, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const handleMapChange = (newMap) => {
    setMap(newMap);
  };

  const handleTileTypeSelect = (tileType) => {
    setSelectedTileType(tileType);
  };

  const handleClick = () => {
    console.log(map);
  };

  //post request to api which passes the map data and gets back a new generated map
  async function generateMap() {
    await fetch('https://nca-backend-rxv2teft2q-ew.a.run.app/generate?path_length=35&symmetry=0.4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(map),
    })
      .then((response) => response.json())
      .then((data) => {
        setMap(data.generated_map)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div className="py-5 flex items-center justify-center">
      <Head>
        <title>Interactive NCA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./zelda.png" />
      </Head>
      <main className="flex justify-center w-full text-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-3xl font-press-start">
            Interactive NCA
          </h1>
          <div className="py-5">
            <GameMap 
            mapData={map} 
            onMapChange={handleMapChange} 
            selectedTileType={selectedTileType} 
            />
          </div>
          <TileSelector
          selectedTileType={selectedTileType}
          onTileTypeSelect={handleTileTypeSelect}
          />
          <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-10 py-2 px-4 full" onClick={generateMap}>
            Generate
          </button>
        </div>
      </main>
    </div>
  )
}
