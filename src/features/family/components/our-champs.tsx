"use client";

import { useChamps } from "../api/useChamps";

import { ChampItem } from "./champ-item";

export const OurChamps = () => {
  const { champs } = useChamps();

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-16 h-[220px] w-max overflow-x-auto">
        <div className="flex animate-loop-scroll gap-x-8">
          {champs.map((champ) => (
            <ChampItem
              key={champ.id}
              name={champ.name}
              content={champ.content}
              pro={champ.pro}
              image={champ?.avatar}
            />
          ))}
          {champs.map((champ) => (
            <ChampItem
              key={champ.id}
              name={champ.name}
              content={champ.content}
              pro={champ.pro}
              image={champ?.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const OurChampsSkeleton = () => {
  return <div className="pb-16"></div>;
};
