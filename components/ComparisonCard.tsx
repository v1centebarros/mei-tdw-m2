import { Card as CardType } from "@/lib/types/card";
import { Card } from "./Card";

interface ComparisonCardProps {
  card: CardType;
  otherCard: CardType | undefined;
}

export function ComparisonCard({
  card,
  otherCard,
}: Readonly<ComparisonCardProps>) {
  const getDifference = (
    value1: number | string,
    value2: number | string | undefined,
  ) => {
    if (value2 === undefined) return null;
    const num1 = typeof value1 === "string" ? parseFloat(value1) : value1;
    const num2 = typeof value2 === "string" ? parseFloat(value2) : value2;
    return isNaN(num1) || isNaN(num2) ? null : num1 - num2;
  };

  const renderDifference = (
    label: string,
    value1: number | string,
    value2: number | string | undefined,
  ) => {
    if (value2 === undefined) return "-";
    const diff = getDifference(value1, value2);
    if (diff === null) return "-";

    const color =
      diff > 0 ? "text-green-500" : diff < 0 ? "text-red-500" : "text-gray-500";
    return (
      <span className={color}>
        {diff > 0 ? "+" : ""}
        {diff}
      </span>
    );
  };

  const comparisonData = [
    { label: "CMC", value1: card.cmc, value2: otherCard?.cmc },
    { label: "Power", value1: card.power, value2: otherCard?.power },
    {
      label: "Toughness",
      value1: card.toughness,
      value2: otherCard?.toughness,
    },
    { label: "Loyalty", value1: card.loyalty, value2: otherCard?.loyalty },
    {
      label: "Colors",
      value1: card.colors?.length,
      value2: otherCard?.colors?.length,
    },
    {
      label: "Types",
      value1: card.type_line.split(" ").length,
      value2: otherCard?.type_line.split(" ").length,
    },
    {
      label: "Keywords",
      value1: card.keywords?.length,
      value2: otherCard?.keywords?.length,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <Card card={card} />
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Attribute</th>
            <th className="px-2 py-1 text-right">Value</th>
            <th className="px-2 py-1 text-right">Difference</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map(({ label, value1, value2 }) => (
            <tr key={label}>
              <td className="px-2 py-1">{label}</td>
              <td className="px-2 py-1 text-right">{value1 || "-"}</td>
              <td className="px-2 py-1 text-right">
                {value1 && value2 && renderDifference(label, value1, value2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
