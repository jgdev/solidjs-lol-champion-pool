export type Champion = {
  championPoolId?: string;
  tierId?: string;
  championId: string;
  name: string;
  pictureUrl: string;
};

export type Tier = {
  id: string;
  name: string;
  championPoolId?: string;
  champions: Champion[];
};

export type ChampionPool = {
  id: string;
  name: string;
  tiers: Tier[];
};
