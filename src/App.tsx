import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IActivity {
  month: number;
  rate: number;
}
const data: Array<IActivity> = [
  { month: 1, rate: 60 },
  { month: 2, rate: 70 },
  { month: 3, rate: 20 },
  { month: 4, rate: 30 },
  { month: 5, rate: 15 },
  { month: 6, rate: 75 },
  { month: 7, rate: 90 },
  { month: 8, rate: 50 },
  { month: 9, rate: 65 },
  { month: 10, rate: 41 },
  { month: 11, rate: 35 },
  { month: 12, rate: 10 },
];
function App() {
  const [info, setInfo] = useState(data);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [animateBars, setAnimateBars] = useState(true);
  console.log(animateBars);

  const bubbleSort = useCallback(async () => {
    if (isSorted) return;
    setIsSorting(true);
    let sortedData = [...info];
    for (let i = 0; i < sortedData.length - 1; i++) {
      for (let j = 0; j < sortedData.length - i - 1; j++) {
        let arr1 = sortedData[j];
        let arr2 = sortedData[j + 1];
        if (arr1.rate > arr2.rate) {
          if (j > 0) await new Promise((resolve) => setTimeout(resolve, 300));
          let temp = arr1;
          sortedData[j] = arr2;
          sortedData[j + 1] = temp;
          setInfo([...sortedData]);
        }
      }
    }
    setIsSorted(true);
    setIsSorting(false);
  }, [info]);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimateBars(false);
    }, 2000);

    return () => clearTimeout(animationTimeout); // sets animateBars to false so it only animate only on initial page render
  }, []);
  return (
    <main className="py-[3rem] h-screen bg-slate-50">
      <div className="ml-auto mr-auto rounded-xl shadow-xl bg-white p-4 max-w-[700px]">
        <div className="flex justify-between items-end border-[0] border-gray-300 border-l-2 border-b-2 h-[400px] px-1">
          {info.map((item: IActivity, index) => {
            return (
              <motion.div
                key={item.month}
                className={`w-[5%] text-indigo-700 bg-indigo-700 bg-opacity-85 cursor-pointer hover:bg-opacity-100 `}
                style={{
                  height: `${item.rate}%`,
                  order: index,
                }}
                {...(animateBars && {
                  transition: { type: "spring", duration: 1 },
                  initial: { height: "auto" },
                  animate: { height: `${item.rate}%` },
                })}
              ></motion.div>
            );
          })}
        </div>
        <div className="flex gap-2 mt-3 ">
          {!isSorted && (
            <button
              disabled={isSorting}
              onClick={() => {
                bubbleSort();
              }}
              className={`font-bold text-indigo-700 bg-indigo-50 p-2 rounded-md opacity-85 outline-none hover:bg-indigo-100`}
              style={{ transition: "all 1s ease" }}
            >
              {!isSorting && <span>Sort</span>}
              {isSorting && <span>Sorting...</span>}
            </button>
          )}
          {isSorted && (
            <button
              disabled={isSorting}
              onClick={() => {
                setIsSorted(false);
                setInfo(data);
              }}
              className={`font-bold text-indigo-700 bg-indigo-50 p-2 rounded-md opacity-85 outline-none hover:bg-indigo-100`}
            >
              Restore
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
