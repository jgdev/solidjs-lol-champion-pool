import AvailableChampions from "./features/AvailableChampions";
import TierList from "./features/TierList";
import { setChampionSearch } from "./store";

const App = () => {
  return (
    <div>
      <div class="p-4 max-w-screen-xl m-auto grid grid-rows-2">
        <div class="w-full">
          <TierList />
        </div>
      </div>
      {/* {getSelectedTier() && ( */}
      <div class="absolute bottom-0 w-full p-8 pb-0 flex flex-col items-center ">
        <input
          class="w-1/2 p-4 my-4 mb-0 rounded-t-lg m-auto text-lg text-center bg-transparent bg-purple-900/20 text-white cursor-pointer outline-none"
          placeholder="Filter by name"
          type="Search"
          onKeyUp={(e) => setChampionSearch(e.target.value || "")}
        />
        <div class="bg-purple-900 p-8 rounded-lg">
          <AvailableChampions />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default App;
