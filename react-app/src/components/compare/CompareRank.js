import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./CompareRank.css";

// Template-specific placeholder images (keyed by numeric template_id)
const TEMPLATE_IMAGES = {
  1: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=60", // dog
  2: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=60", // fruit
  3: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=60", // tv
};

const DEFAULT_IMG = TEMPLATE_IMAGES[1];

// Fallback mock (API fails)
const mockRanking = {
  title: "My Ranking",
  subtitle: "My Ranking",
  tiers: [
    { label: "Tier S", items: [] },
    { label: "Tier A", items: [] },
    { label: "Tier B", items: [] },
    { label: "Tier C", items: [] },
    { label: "Tier D", items: [] },
    { label: "Tier E", items: [] },
    { label: "Tier F", items: [] },
  ],
};

const TIER_ORDER = ["S", "A", "B", "C", "D", "E", "F"];

export const GLOBAL_TEMPLATES = [
  {
    slug: "cutestdogbreeds",
    apiId: 1,
    label: "Cutest Dog Breeds",
    description: "See what global concessus is on dog breeds",
  },
  {
    slug: "fruit",
    apiId: 2,
    label: "Fruit",
    description: "See everyone's favorite fruit",
  },
  {
    slug: "rockbands",
    apiId: 3,
    label: "Rock Bands",
    description: "Global consensus for Rock Bands",
  },
];


// Converts backend response -> UI model page expects
function toUiRanking(tierData, globalData, template_name) {
  const templateImg = TEMPLATE_IMAGES[tierData?.template_id] || DEFAULT_IMG;

  const buckets = new Map(TIER_ORDER.map((t) => [t, []]));

  for (const item of tierData.item_rankings || []) {
    const tier = (item.tier || "").toUpperCase();
    if (!buckets.has(tier)) continue;

    buckets.get(tier).push({
      id: String(item.item_id),
      name: item.item_name,
      img: templateImg,
      tier: tier,
      color: "white",
      tag: "",
    });
  }

  for (const item of globalData.item_rankings || []) {
    const tier = (item.average_tier || "").toUpperCase();
    if (!buckets.has(tier)) continue;

    buckets.get(tier).push({
      id: String(item.item_id)+"global",
      name: item.item_name,
      img: templateImg,
      tier: tier,
      color: "green",
      tag: "Global Item",
    });
  }

  console.log(buckets)

  return {
    title: template_name,
    subtitle: "My Comparisons",
    tiers: TIER_ORDER.map((t) => ({
      label: `Tier ${t}`,
      items: buckets.get(t),
    })),
  };
}

function TierSection({ label, items }) {
  const letter = label.replace("Tier ", "");

  return (
    <section className="tierRow">
      <div className="tierLabel">{letter}</div>

      <div className="tierContent">
        <div className="tierGridCompact-compare">
          {items.map((item) => (
            <article key={item.id} className="itemCardCompact" style={{background: item.color}}>
              <img className="thumb" src={item.img} alt={item.name} />
              <div className="text">
                <div className="name">{item.name}</div>
                <div className="meta-compare">{item.tag}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ComparePage() {
  // Route: /global/:rankingId (rankingId is a slug like "fruit" or "tv shows")
  const { rankingId } = useParams();
  const location = useLocation();
  const { template_name, template_id } = location.state;

  const [ranking, setRanking] = useState(mockRanking);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [responseTier, responseGlobal] = await Promise.all([
                fetch(`https://metatier.turkmenkaan.xyz:8000/tier-list/${rankingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                }),
                fetch(`https://metatier.turkmenkaan.xyz:8000/global/${template_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                })
             ])

            // Always check if the response is okay (status 200-299)
            if (!responseTier.ok) {
                console.log(`HTTP error ${responseTier.status}`)
            }
            if (!responseGlobal.ok) {
                console.log(`HTTP error ${responseGlobal.status}`)
            }

            const tierData = await responseTier.json();
            const globalData = await responseGlobal.json();
            setRanking(toUiRanking(tierData, globalData, template_name))
        } catch (err) {
            console.log(err.message)
        }
    };

    fetchData();

    return () => {
      // Optional cleanup code
    };
  });
        


  return (
    <div className="globalPage">
      <div className="container">
        <div className="top">
          <div>
            <h1 className="title">{ranking.title}</h1>
            <div className="subtitle">{ranking.subtitle}</div>
          </div>
        </div>

        <div className="tiers">
          {ranking.tiers.map((tier) => (
            <TierSection
              key={tier.label}
              label={tier.label}
              items={tier.items}
            />
          ))}
        </div>

        {rankingId ? (
          <div className="idChip">
            Rank Id: <span className="idChipValue">{rankingId}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
