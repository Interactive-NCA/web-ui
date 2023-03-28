import Head from 'next/head'
import React, { useState } from 'react';
import 'react-range-slider-input/dist/style.css';

import { initialMap } from '@/utils/constants';
import TileSelector from '@/components/TileSelector';
import GameMap from '@/components/GameMap'

export default function FixedTilesPlatform() {
  const [selectedTileType, setSelectedTileType] = useState(1);
  const [map, setMap] = useState(initialMap);
  const [fixedTilesMaps, setFixedTilesMaps] = useState([]);

  const handleMapChange = (newMap) => {
    setMap(newMap);
  };

  const handleTileTypeSelect = (tileType) => {
    setSelectedTileType(tileType);
  };

  const nextMap = () => {
    const copyMap = map.map((row) => [...row]); // create a new copy of each row array
    setFixedTilesMaps([...fixedTilesMaps, copyMap]);
    console.log(fixedTilesMaps);
  }

  function saveMaps() {
  // Convert the tileMaps 3d array to a typed array
  const typedArray = new Int32Array(fixedTilesMaps.flat(2));
  
  // Create a Blob object from the typed array
  const blob = new Blob([typedArray], { type: 'application/x-binary' });

  // Create a link element and set its href attribute to the Blob object's URL
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  
  // Set the link element's download attribute to the desired filename
  link.download = 'tile_maps.npy';
  
  // Append the link element to the document body and trigger a click event
  document.body.appendChild(link);
  link.click();
  
  // Remove the link element from the document body
  document.body.removeChild(link);
}
  
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <Head>
        <title>Interactive NCA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./tiles/zelda.png" />
      </Head>
      <div className="w-full h-full py-5 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl font-press-start">
            Fixed Tiles Generator
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

          <h2 className='py-5 font-press-start'>Current number of maps with fixed tiles: {fixedTilesMaps.length}</h2>
          <div className='flex px-5'>
            <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 mr-2 py-2 px-4 full" onClick={nextMap}>
              Next
            </button>
            <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 py-2 px-4 full" onClick={saveMaps}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
