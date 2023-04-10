// External imports
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Dropdown } from "@nextui-org/react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

// Helper things
import { generateEmptyMap } from '@/utils/generateEmptyMap';
import { findMinMax } from '@/utils/findMinMax';

// Components
import AuxMap from '@/components/AuxMap';
import StaticMap from '@/components/StaticMap';

export default function AuxChans() {

  // All aux channels
  const [auxChans, setAuxChans] = useState(null);
  const [minMax, setMinMax] = useState([0, 0]);

  // Single concrete aux channel 
  const [aux, setAux] = useState(generateEmptyMap());
  const [auxSteps, setAuxSteps] = useState(null);

  // Map states
  const [map, setMap] = useState(generateEmptyMap());
  const [mapSteps, setMapSteps] = useState(null);

  // Slider states
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderKey, setSliderKey] = useState(0);
  const [sliderDefault, setSliderDefault] = useState(0);

  // Dropdown states
  const [selectedChannel, setSelectedChannel] = React.useState(new Set(["1"]));

  const handleChannelSelection = (channel) => {
    setSelectedChannel(channel);
    const index = parseInt(String(channel.values().next().value))
    setAuxSteps(auxChans[index - 1]);
    setAux(auxChans[index - 1][0]);
    setMinMax(findMinMax(auxChans[index - 1]));
    resetSlider(0);
  };

  // Get saved aux data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem('aux_chans');
    if (storedData) {
      setAuxSteps(JSON.parse(storedData)[0]); // First channel all steps
      setAux(JSON.parse(storedData)[0][0]); // First channel, first step
      setAuxChans(JSON.parse(storedData)); // All channels all steps
      setMinMax(findMinMax(JSON.parse(storedData)[0]));
    }
  }, []);

  // Get saved level data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem('levels');
    if (storedData) {
      setMapSteps(JSON.parse(storedData));
      setMap(JSON.parse(storedData)[0]);
    }
  }, []);


  const handleSliderChange = (value) => {
    const parsedValue = parseInt(String(value).split(",")[1])
    setSliderValue(parsedValue)
    setAux(auxSteps[parsedValue]);
    setMap(mapSteps[parsedValue]);
    console.log(auxSteps[parsedValue])
  }

  // Re-render slider
  const resetSlider = (value) => {
    setSliderDefault(value);
    setSliderValue(value)
    setSliderKey(sliderKey + 1);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen">
      <Head>
        <title>Interactive NCA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./tiles/zelda.png" />
      </Head>
      <div className="w-full h-full pt-10 md:flex md:items-center md:justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl font-press-start ">
            Auxiliary Channels
          </h1>
          <div className="py-5 flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/2 md:pr-2 mb-2 md:mb-0 mx-20 md:mx-auto">
              <AuxMap auxData={aux} minValue={minMax[0]} maxValue={minMax[1]} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className='font-press-start'>Low</div>
              <div style={{
                flex: 1,
                height: '8px',
                borderRadius: '4px',
                margin: '0 10px',
                background: 'linear-gradient(to right, #00a8cc, #7b2cbf)',
              }}>
              </div>
              <div className='font-press-start'>High</div>
            </div>

            </div>
            <div className="w-full md:w-1/2 md:pl-2 mx-20 md:mx-auto">
              <StaticMap mapData={map} />
            </div>
          </div>
            <Dropdown>
              <Dropdown.Button className='font-press-start' solid="True" color="warning" css={{ tt: "capitalize" }}>
                {"Channel " + selectedChannel.values().next().value}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                className='text-sm font-press-start'
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedChannel}
                onSelectionChange={(selected) => 
                  handleChannelSelection(selected)}
              >
                <Dropdown.Item key="1">Channel 1</Dropdown.Item>
                <Dropdown.Item key="2">Channel 2</Dropdown.Item>
                <Dropdown.Item key="3">Channel 3</Dropdown.Item>
                <Dropdown.Item key="4">Channel 4</Dropdown.Item>
                <Dropdown.Item key="5">Channel 5</Dropdown.Item>
                <Dropdown.Item key="6">Channel 6</Dropdown.Item>
                <Dropdown.Item key="7">Channel 7</Dropdown.Item>
                <Dropdown.Item key="8">Channel 8</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              <Link
                className="bg-green-700 hover:bg-green-900 font-press-start text-white font-bold mt-2 py-2 px-4 full rounded-xl"
                href={{
                  pathname: '/',
                }}
              >
                Back 
              </Link>
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
            />
          </div>
            <h2 className='pt-5 font-press-start'>{ sliderValue } </h2>
        </div>
      </div>
    </div>
  )
}
