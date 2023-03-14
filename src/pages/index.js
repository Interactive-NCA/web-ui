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
          <button className="bg-green-700 hover:bg-green-900 text-white font-bold mt-10 py-2 px-4 full" onClick={handleClick}>
            Generate
          </button>
        </div>
      </main>
    </div>
  )
}
