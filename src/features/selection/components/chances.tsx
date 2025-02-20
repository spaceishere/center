import { chances } from "../constant";

export const Chances = () => {
  return (
    <ul className="list-disc pl-6 text-[14px] text-muted-foreground">
      {chances.map((chance, index) => (
        <li className="" key={index}>
          {chance}
        </li>
      ))}
    </ul>
  );
};
