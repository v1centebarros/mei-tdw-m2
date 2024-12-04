import { Card } from '@/lib/types/card';

interface DeckStatsProps {
  deck: { [cardId: string]: { card: Card; quantity: number } };
}

export function DeckStats({ deck }: DeckStatsProps) {
  const cards = Object.values(deck);
  const totalCards = cards.reduce((sum, { quantity }) => sum + quantity, 0);
  const uniqueCards = cards.length;

  const averageCMC =
    cards.reduce((sum, { card, quantity }) => sum + card.cmc * quantity, 0) / totalCards;

  const colorCounts = cards.reduce(
    (counts, { card, quantity }) => {
      card.colors?.forEach((color) => {
        counts[color] = (counts[color] || 0) + quantity;
      });
      return counts;
    },
    {} as { [color: string]: number }
  );

  const typeCounts = cards.reduce(
    (counts, { card, quantity }) => {
      const types = card.type_line.split(' ');
      types.forEach((type) => {
        counts[type] = (counts[type] || 0) + quantity;
      });
      return counts;
    },
    {} as { [type: string]: number }
  );

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Deck Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Total Cards:</h3>
          <p>{totalCards}</p>
        </div>
        <div>
          <h3 className="font-semibold">Unique Cards:</h3>
          <p>{uniqueCards}</p>
        </div>
        <div>
          <h3 className="font-semibold">Average CMC:</h3>
          <p>{averageCMC.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-semibold">Color Distribution:</h3>
          <ul>
            {Object.entries(colorCounts).map(([color, count]) => (
              <li key={color}>
                {color}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Type Distribution:</h3>
          <ul>
            {Object.entries(typeCounts)
              .filter(([type]) => !['—', '//'].includes(type))
              .map(([type, count]) => (
              <li key={type}>
                {type}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

