import AvailableChampions from "./features/AvailableChampions";
import TierList from "./features/TierList";

const App = () => {
  return (
    <>
      <div class="p-4 max-w-screen-xl m-auto grid grid-rows-2">
        <div class="w-full">
          <TierList />
        </div>
      </div>
    </>
  );
};

export default App;
