import Tier from "../../components/Tier";

export const TierList = () => (
  <div class="mb-8 grid grid-cols-4 gap-4 ">
    <Tier
      tier={{
        id: "tier1",
        name: "Mains",
      }}
      championsIds={[]}
    />
    <Tier
      tier={{
        id: "tier2",
        name: "Good to play",
      }}
      championsIds={[]}
    />
  </div>
);

export default TierList;
