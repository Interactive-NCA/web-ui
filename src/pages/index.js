// External imports
import Head from 'next/head'
import React, { useState } from 'react';
import Link from 'next/link'
import { Dropdown } from "@nextui-org/react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

// Helper things
import { BASE_URL } from '@/utils/constants';
import { generateEmptyMap } from '@/utils/generateEmptyMap';

// Components
import TileSelector from '@/components/TileSelector';
import Archive from '@/components/Archive';
import GameMap from '@/components/GameMap'
import MinimapGrid from '@/components/MiniMapGrid';

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
  const [objective, setObjective] = useState(0);
  // Slider states
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderKey, setSliderKey] = useState(0);
  const [disabledSlider, setDisableSlider] = useState(false);
  const [sliderDefault, setSliderDefault] = useState(0);

  // Behaviours state
  const [symmetries, setSymmetries] = useState(data.behavioursData.behaviours[0])
  const [paths, setPaths] = useState(data.behavioursData.behaviours[1])
  const [objectives, setObjectives] = useState(data.behavioursData.behaviours[2])

  // Experiments
  const [selectedExperiment, setSelectedExperiment] = React.useState(new Set([String(data.namesData.names[0])]));

  // Training seeds
  const [trainingSeeds, setTrainingSeeds] = useState([generateEmptyMap()]);
  const [trainingBinary, setTrainingBinary] = useState([generateEmptyMap()]);

  // Experiment description
  const [description, setDescription] = useState(data.descriptionData.desc);

  const dropdownItems = data.namesData.names.map((experiment) => (
    <Dropdown.Item key={experiment}>Experiment {experiment}</Dropdown.Item>
  )); 


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

  const handleMiniMapSelect = (newMap, binaryMap) => {
    setMap(newMap);
    setBinary(binaryMap);
  };

  const handlePointClick = (selectedSymmetry, selectedPathLength, objValue) => {
    setSymmetry(selectedSymmetry);
    setPathLength(selectedPathLength);
    setObjective(objValue);

    const expId = parseInt(String(selectedExperiment.values().next().value));
    getTrainingSeeds(expId, selectedSymmetry, selectedPathLength);

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

  const handleExperimentSelection = (experiment) => {
    setSelectedExperiment(experiment);
    const index = parseInt(String(experiment.values().next().value));
    getExperiment(index);
  };

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

  async function getExperiment(expId) {
    document.documentElement.style.cursor = "wait"
    const behaviours = await fetch(`${BASE_URL}/behaviours?exp_id=${expId}`);
    const behavioursData = await behaviours.json();

    const expDescription = await fetch(`${BASE_URL}/experimentdescriptions?exp_id=${expId}`);
    const descriptionData = await expDescription.json();

    document.documentElement.style.cursor = "default"

    setSymmetries(behavioursData.behaviours[0])
    setPaths(behavioursData.behaviours[1])
    setObjectives(behavioursData.behaviours[2])
    setDescription(descriptionData.desc)
  }

  async function getTrainingSeeds(expId, symmetry, pathLength) {
    document.documentElement.style.cursor = "wait"
    const response = await fetch(`${BASE_URL}/trainingseeds?exp_id=${expId}&path_length=${pathLength}&symmetry=${symmetry}`)
    const data = await response.json();
    document.documentElement.style.cursor = "default"
    setTrainingSeeds(data.training_seeds[0].slice(0,10))
    setTrainingBinary(data.training_seeds[1].slice(0,10))
  }

  // Main function to generate the map (calls backend)
  async function generateMap() {
    const combinedMaps = [map, binary]
    const expId = parseInt(String(selectedExperiment.values().next().value));
    document.documentElement.style.cursor = "wait"
    await fetch(`${BASE_URL}/generate?exp_id=${expId}&path_length=${pathLength}&symmetry=${symmetry}`, {
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
        localStorage.setItem('aux_chans', JSON.stringify(data.generated_map[1])); // Aux channels
        localStorage.setItem('levels', JSON.stringify(data.generated_map[0])); // 50 steps of a level

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
          <p className= "pb-5 font-press-start" >Fitness: <span className='text-sky-400'>{objective.toFixed(3)}</span></p> 

          <Dropdown>
            <Dropdown.Button className='font-press-start' solid="True" color="warning" css={{ tt: "capitalize" }}>
              {"Experiment " + selectedExperiment.values().next().value}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              className='text-sm font-press-start'
              color="warning"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedExperiment}
              onSelectionChange={(selected) => 
                handleExperimentSelection(selected)}
            >
              {dropdownItems}
            </Dropdown.Menu>
          </Dropdown>

          <div className="flex flex-row pt-5 w-50">
            <h3 className='font-press-start text-xs'>{ description } </h3>
          </div>
          <MinimapGrid 
          trainingSeeds={trainingSeeds} 
          binaryMap={trainingBinary} 
          handleMiniMapSelect={handleMiniMapSelect}/>
          <h3 className='font-press-start text-xs'>Training seeds</h3>
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
              <Link
                className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 py-2 px-4 full"
                href={{
                  pathname: '/auxchans',
                }}
              >
                Aux Chans 
              </Link>
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
            <h2 className='pt-5 font-press-start'>{ sliderValue + 1 } </h2>
        </div>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const expNames = await fetch(`${BASE_URL}/experimentnames`);
  const namesData = await expNames.json();
  const expId = namesData.names[0];

  const behaviours = await fetch(`${BASE_URL}/behaviours?exp_id=${expId}`);
  const behavioursData = await behaviours.json();

  const expDescription = await fetch(`${BASE_URL}/experimentdescriptions?exp_id=${expId}`);
  const descriptionData = await expDescription.json();

  return { props: { behavioursData, namesData, descriptionData } };
}