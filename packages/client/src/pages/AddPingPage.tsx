import { useState } from "react";
import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import Header from "../components/UI/Header";
import { usePing } from "../utils/hooks/usePing";

function AddPingPage() {
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState(1);
  const [tags, setTags] = useState("");

  const { ping, isLoading } = usePing();

  const handlePing = async () => {
    if (!url || !interval || !tags) {
      alert("Complete all form fields");
      return;
    }
    const tagsArray = tags.split(/[,\s]+/).filter((tag) => tag.trim() !== "");
    await ping(url, interval, tagsArray);
  };

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      <Header title="Add New Ping Test" currentTab="Add Test" />
      <div className="rounded-lg h-fit p-6 flex flex-col gap-4 bg-white">
        <TextInput placeholder="URL" value={url} setValue={(val) => setUrl(String(val))} />
        <TextInput
          type="number"
          placeholder="Interval (seconds)"
          value={String(interval)}
          setValue={(val) => setInterval(Number(val))}
        />
        <TextInput
          placeholder="Tags (tags must be splitted by comma or whitespace)"
          value={tags}
          setValue={(val) => setTags(String(val))}
        />

        <Button text="Add" onClick={handlePing} disabled={isLoading} />
      </div>
    </div>
  );
}

export default AddPingPage;
