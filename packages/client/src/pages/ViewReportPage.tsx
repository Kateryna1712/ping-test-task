import { useState } from "react";
import Header from "../components/UI/Header";
import TextInput from "../components/UI/TextInput";
import ReportTable from "../components/ViewReportPage/ReportTable";
import { usePingPause } from "../utils/hooks/usePausePing";
import { useGetPingsList } from "../utils/hooks/usePingsList";

function ViewReportPage() {
  const [filteringText, setFilteringText] = useState("");

  const { data, deletePing } = useGetPingsList();
  const { togglePause } = usePingPause();

  const handleTogglePause = (url: string, isPaused: boolean) => {
    console.log("pause");
    togglePause(url, isPaused);
  };

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      <Header title="Reports" currentTab="View Report" />

      <div className="rounded-lg h-fit p-6 flex flex-col gap-4 bg-white w-300">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-lg">List of Active URLs:</h1>
          <TextInput
            value={filteringText}
            setValue={(val) => setFilteringText(String(val))}
            placeholder="Tag Filtering"
          />
        </div>
        <ReportTable
          monitoringItems={data as never}
          pause={handleTogglePause}
          play={handleTogglePause}
          remove={deletePing}
        />
      </div>
    </div>
  );
}

export default ViewReportPage;
