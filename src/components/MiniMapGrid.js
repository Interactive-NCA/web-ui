import MiniMap from '@/components/MiniMap';

function MiniMapGrid({ trainingSeeds, binaryMap, handleMiniMapSelect }) {
  return (
    <div className='grid gap-4 p-4 md:grid-cols-5 md:grid-rows-2'>
      {trainingSeeds.map((seed, index) => (
        <MiniMap key={index} mapData={seed} binaryMap={binaryMap[index]} handleMiniMapSelect={handleMiniMapSelect} />
      ))}
    </div>
  );
}

export default MiniMapGrid;
