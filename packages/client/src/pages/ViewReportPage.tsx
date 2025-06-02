import { useEffect, useState } from "react";
import Header from "../components/UI/Header";
import TextInput from "../components/UI/TextInput";
import ReportTable from "../components/ViewReportPage/ReportTable";
import { usePingPause } from "../utils/hooks/usePausePing";
import {
  useGetPingsList,
  type PingItemFromLS,
} from "../utils/hooks/usePingsList";
import { useAutoPing } from "../utils/hooks/useAutoPing";

function ViewReportPage() {
  const [filteringText, setFilteringText] = useState("");
  const { data, deletePing, getPings } = useGetPingsList();
  const { togglePause } = usePingPause();
  const { startAutoPinging, stopAutoPinging } = useAutoPing();
  const [filteredData, setFilteredData] = useState<PingItemFromLS[]>(data);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    stopAutoPinging();

    if (data.length > 0) {
      const timer = setTimeout(() => {
        startAutoPinging(data as never);
      }, 100);

      return () => {
        clearTimeout(timer);
        stopAutoPinging();
      };
    }

    return () => stopAutoPinging();
  }, [data]);

  useEffect(() => {
    if (!filteringText.trim()) {
      setFilteredData(data);
    } else {
      const filteredArray = data.filter((item) =>
        item.tags.some((tag) =>
          tag.toLowerCase().includes(filteringText.toLowerCase())
        )
      );
      setFilteredData(filteredArray);
    }
  }, [filteringText, data]);

  const handleTogglePause = async (url: string, isPaused: boolean) => {
    await togglePause(url, isPaused);
    await getPings();
  };

  const handleDeletePing = (url: string) => {
    deletePing(url);
  };

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      <Header title="Reports" currentTab="View Report" />
      <div className="rounded-lg h-fit p-6 flex flex-col gap-4 bg-white w-300">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-lg">List of Active URLs:</h1>
          <TextInput
            value={filteringText}
            setValue={setFilteringText}
            placeholder="Tag Filtering"
          />
        </div>
        <ReportTable
          monitoringItems={filteredData as never}
          pause={handleTogglePause}
          play={handleTogglePause}
          remove={handleDeletePing}
        />
      </div>
    </div>
  );
}

export default ViewReportPage;
