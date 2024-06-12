import axios from "axios";
import { useEffect, useState } from "react";

function TouristAttractionsCard() {
  const [content, setContent] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const getDataContentFromServer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchContent}`
      );
      setContent(response.data.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  useEffect(() => {
    getDataContentFromServer();
  }, [searchContent]);

  const handleTagClick = (tag) => {
    if (tag !== "และ") {
      if (searchContent) {
        setSearchContent(`${searchContent} ${tag}`);
      } else {
        setSearchContent(tag);
      }
    }
  };

  const copyToClipBoard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("ลิ้งค์ถูกคัดลอกแล้ว!");
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  return (
    <div style={{ fontFamily: "Noto Sans Thai" }}>
      <div className="px-[20%]">
        <p className="text-xl">ค้นหาที่เที่ยว</p>
        <input
          className="border-b-2 w-[100%] h-10 text-center text-lg focus:outline-none focus:border-[#2e9bdb]"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={searchContent}
          onChange={(event) => setSearchContent(event.target.value)}
        />
      </div>
      {content.map((item) => {
        const newTags = [...item.tags];
        newTags.splice(newTags.length - 1, 0, "และ");
        return (
          <div
            key={item.eid}
            className="flex justify-center items-center m-20 gap-10"
          >
            <img
              className="w-[400px] h-[250px] rounded-3xl"
              src={item.photos[0]}
              alt=""
            />
            <div className="w-[800px] relative">
              <a href={item.url}>
                <h1 className="text-3xl font-bold">{item.title}</h1>
              </a>
              <p className="text-slate-500">
                {item.description.length > 100
                  ? `${item.description.slice(0, 100)}...`
                  : item.description}
              </p>
              <a className="underline text-[#2e9bdb]" href={item.url}>
                อ่านต่อ
              </a>
              <p className="flex gap-2 text-slate-500">
                <span className="pt-1">หมวด</span>
                {newTags.map((tag) => {
                  return (
                    <span
                      className={`p-1 ${
                        tag !== "และ" ? "underline" : ""
                      } cursor-pointer`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </span>
                  );
                })}
              </p>
              <div className="flex gap-5 items-center">
                {item.photos.slice(1).map((photo) => {
                  return (
                    <img
                      className="w-[100px] h-[100px]  rounded-lg"
                      src={photo}
                      alt=""
                    />
                  );
                })}
              </div>
              <button onClick={() => copyToClipBoard(item.url)}>
                <i className="fas fa-link text-6xl p-2 border-4 text-[#2e9bdb] border-[#2e9bdb] rounded-full absolute bottom-0 right-0"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TouristAttractionsCard;
