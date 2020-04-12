import React from 'react';

export function PlantCard(props: {name: string}): JSX.Element {
  return (
    <div className="bg-white mb-3 p-4 rounded-lg shadow-sm">
      <h2 className="font-bold text-2xl">{props.name}</h2>
    </div>
  );
}
