import AvailableChampions from "./features/AvailableChampions";
import ListChampionPools from "./features/ListChampionPools";

const App = () => {
  return (
    <div class="lg:py-12 lg:px-24 p-2">
      <ListChampionPools />
      <AvailableChampions />
    </div>
  );
};

export default App;
