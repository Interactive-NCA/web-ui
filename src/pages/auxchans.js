// External imports
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

// Helper things
import { generateEmptyMap } from '@/utils/generateEmptyMap';

// Components
import AuxMap from '@/components/AuxMap';

export default function AuxChans() {

  // Aux states
  const [aux, setAux] = useState(generateEmptyMap());
  const [auxSteps, setAuxSteps] = useState(null);

  // Get saved aux data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setAuxSteps(JSON.parse(storedData));
      setAux(JSON.parse(storedData)[0]);
    }
  }, []);

  // Slider states
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    const parsedValue = parseInt(String(value).split(",")[1])
    setSliderValue(parsedValue)
    setAux(auxSteps[parsedValue]);
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <Head>
        <title>Interactive NCA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./tiles/zelda.png" />
      </Head>
      <div className="w-full h-full pt-10 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl font-press-start">
            Auxiliary Channels
          </h1>
          <div className="py-5">
            <AuxMap auxData={aux}/>
          </div>

          <div className="flex pt-10 w-1/2 flex-col items-center justify-center">
            <RangeSlider
              id="range-slider-ab"
              className="margin-lg"
              defaultValue={[0, 0]}
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
