// External imports
import Head from 'next/head'
import React, { useState } from 'react';
import Link from 'next/link'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

// Helper things
import { BASE_URL } from '@/utils/constants';
import { generateEmptyMap } from '@/utils/generateEmptyMap';

// Components
import TileSelector from '@/components/TileSelector';
import Archive from '@/components/Archive';
import GameMap from '@/components/GameMap'

export default function Home(data) {
  // Map states
  const [selectedTileType, setSelectedTileType] = useState(1);
  const [map, setMap] = useState(generateEmptyMap());
  const [binary, setBinary] = useState(generateEmptyMap());
  const [steps, setSteps] = useState(null);
  const [mapGenerated, setMapGenerated] = useState(false);
  // Behaviours states
  const [symmetry, setSymmetry] = useState(10);
  const [pathLength, setPathLength] = useState(10);
  // Slider states
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderKey, setSliderKey] = useState(0);
  const [disabledSlider, setDisableSlider] = useState(false);
  const [sliderDefault, setSliderDefault] = useState(0);

  // Get behaviours from backend
  const symmetries = data.data.behaviours[0] 
  const paths = data.data.behaviours[1]
  const objectives = data.data.behaviours[2] 

  // Handlers that are passed to individual components
  const handleMapChange = (newMap) => {
    setMap(newMap);
  };

  const handleBinaryChange = (newBinary) => {
    setBinary(newBinary);
  };

  const handleTileTypeSelect = (tileType) => {
    setSelectedTileType(tileType);
  };

  const handlePointClick = (selectedSymmetry, selectedPathLength) => {
    setSymmetry(selectedSymmetry);
    setPathLength(selectedPathLength);
  };

  const handleSliderChange = (value) => {
    const parsedValue = parseInt(String(value).split(",")[1])
    setSliderValue(parsedValue)
    if (!mapGenerated){
      alert("Please generate a map first!");
      setMapGenerated(true)
    } 
    else if (steps != null) {
        setMap(steps[parsedValue])
    }
  }

  // Re-render slider
  const resetSlider = (value) => {
    setSliderDefault(value);
    setSliderValue(value)
    setSliderKey(sliderKey + 1);
  }

  // Button to reset everything
  const resetMaps = () => {
    setMap(generateEmptyMap());
    setBinary(generateEmptyMap());
    setSteps(null);
    setMapGenerated(false);
    resetSlider(0);
  }

  // Button to animate the generation process
  const activateAnimate = () => {
    if (steps == null) {
      alert("Please generate a map first");
    } else {

      setDisableSlider(true);
      var counter = 0;
      for (let i = 0; i < steps.length; i++) {
        setTimeout(() => {
          setSliderValue(i);
          setMap(steps[i]);
          counter = counter + 1;

          if (counter == steps.length) {
            setTimeout(() => {
              resetSlider(steps.length-1);
              setDisableSlider(false);
            }, 100);
          }
        }, 100 * i);
      }
    }
  }

  // Main function to generate the map (calls backend)
  async function generateMap() {
    const combinedMaps = [map, binary]
    document.documentElement.style.cursor = "wait"
    await fetch(`${BASE_URL}/generate?path_length=${pathLength}&symmetry=${symmetry}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(combinedMaps),
    })
      .then((response) => response.json())
      .then((data) => {
        setMap(data.generated_map[0][0])  // Get first map (the first step)
        setSteps(data.generated_map[0])   // 50 steps 
        resetSlider(0)
        setMapGenerated(true)
        localStorage.setItem('myData', JSON.stringify(data.generated_map[1])); // Aux channels

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
        <link rel="icon" href="./tiles/zelda.png" />
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
      <div className="w-full md:w-1/2 h-full pt-10 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl font-press-start">
            Interactive NCA
          </h1>
          <div className="py-5">
            <GameMap 
            mapData={map} 
            binaryData={binary}
            onMapChange={handleMapChange} 
            onBinaryChange={handleBinaryChange}
            selectedTileType={selectedTileType} 
            />
          </div>
          <TileSelector
          selectedTileType={selectedTileType}
          onTileTypeSelect={handleTileTypeSelect}
          />

          <div className='flex px-5'>
            <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 mr-2 py-2 px-4 full" onClick={generateMap}>
              Generate
            </button>
            <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 py-2 px-4 full" onClick={activateAnimate}>
              Animate 
            </button>
          </div>
          <div className='flex'>
            <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 mr-2 py-2 px-4 full" onClick={resetMaps}>
              Reset 
            </button>
            <button className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 py-2 px-4 full">
              <Link
                href={{
                  pathname: '/auxchans',
                }}
              >
                Aux Chans 
              </Link>
            </button>
          </div>

          <div className="flex pt-10 w-1/2 flex-col items-center justify-center">
            <RangeSlider
              key={sliderKey}
              id="range-slider-ab"
              className="margin-lg"
              defaultValue={[0, sliderDefault]}
              onInput={handleSliderChange}
              max={49}
              min={0}
              step={1}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true} 
              disabled={disabledSlider}
            />
          </div>
            <h2 className='pt-5 font-press-start'>{ sliderValue } </h2>
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