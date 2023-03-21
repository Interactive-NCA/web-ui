import Head from 'next/head'
import GameMap from '@/components/GameMap'
import React, { useState } from 'react';
import TileSelector from '@/components/TileSelector';
import Archive from '@/components/Archive';
import { initialMap, BASE_URL } from './constants';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';



export default function Home(data) {
  const [selectedTileType, setSelectedTileType] = useState(1);
  const [map, setMap] = useState(initialMap);
  const [symmetry, setSymmetry] = useState(10);
  const [pathLength, setPathLength] = useState(10);
  const [sliderValue, setSliderValue] = useState("0,0");


  const symmetries = data.data.behaviours[0] 
  const paths = data.data.behaviours[1]
  const objectives = data.data.behaviours[2] 

  const handleMapChange = (newMap) => {
    setMap(newMap);
  };

  const handleTileTypeSelect = (tileType) => {
    setSelectedTileType(tileType);
  };

  const handlePointClick = (selectedSymmetry, selectedPathLength) => {
    setSymmetry(selectedSymmetry);
    setPathLength(selectedPathLength);
  };


  async function generateMap() {
    document.documentElement.style.cursor = "wait"
    await fetch(`${BASE_URL}/generate?path_length=${pathLength}&symmetry=${symmetry}`, {
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
      document.documentElement.style.cursor = "default"
  }
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <Head>
        <title>Interactive NCA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./zelda.png" />
      </Head>
      <div className="w-full md:w-1/2 h-full flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl font-press-start pb-20">
            Models 
          </h1>
        <Archive
        symmetries={symmetries}
        paths={paths}
        objectives={objectives}
        handlePointClick={handlePointClick}
        currSymmetry={symmetry}
        currPath={pathLength}
        />
        <p className= "font-press-start pt-10" >Symmetry: <span className='text-sky-400'>{symmetry}</span></p>
        <p className= "font-press-start" >Path: <span className='text-sky-400'>{pathLength}</span></p> 
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full py-5 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl font-press-start">
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
          <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 py-2 px-4 full" onClick={generateMap}>
            Generate
          </button>

          <div className="flex pt-10 w-1/2 flex-col items-center justify-center">
          <RangeSlider id="range-slider-yellow" 
            defaultValue={[0, 0]}
            onInput={setSliderValue}
            max={50}
            min={0}
            step={1}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled={true} 
          />
            </div>
            <h2>{ parseInt(String(sliderValue).split(",")[1]) } </h2>
        </div>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/behaviours`);
  const data = await response.json();
  
  return { props: { data } };
}