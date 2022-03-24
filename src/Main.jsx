import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Image from "./components/Image";
import { memeUrl1, memeUrl2 } from "./MemeUrl";
import "./main.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [addTopText, setAddTopText] = useState("");
  const [addBottomText, setAddBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  const getUrlParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  useEffect(() => {
    fetch(memeUrl1).then((x) =>
      x.json().then((response) => setImages(response.data.memes))
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      template_id: currentItem.id,
      text0: addTopText,
      text1: addBottomText,
      username: "nijain",
      password: "Nitika@123",
    };
    const response = await fetch(`${memeUrl2}${getUrlParam(params)}`);
    const json = await response.json();
    setMeme(json.data.url);
  };

  const handleBack = () => {
    setCurrentItem(null);
    setMeme(null);
    setAddTopText(null);
    setAddBottomText(null);
  };

  const toDataURL = (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }
  
  const download = async(url, type = "png") => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = await toDataURL(url);
    a.download = currentItem.name + "." + type;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      <div className="main">

        {/* Header */}
        <Header title="Meme App" />

        {/* Back */}
        {currentItem && (
          <button
            className="btn col text-center mt-3 mb-2 create"
            onClick={handleBack}
          >
            Back to home
          </button>
        )}

        {/* Result */}
        {currentItem && meme && (
          <div className="result">
            <img
              className="my-4 result-img"
              src={meme}
              alt="custom meme"
            />
            <button
              onClick={()=>download(meme)}
              className="btn col text-center mt-3 mb-2 create"
            >
              Download
            </button>
          </div>
        )}

        {/* Create */}
        {currentItem && !meme && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <Image currentItem={currentItem} />
            <div className="container">
              <div className="input-wrap">
                <input
                  placeholder="Enter top text"
                  className="form-control col-md-3 my-3 mx-3"
                  value={addTopText}
                  onChange={(e) => setAddTopText(e.target.value)}
                />
                <input
                  placeholder="Enter bottom text"
                  className="form-control col-md-3 my-3"
                  value={addBottomText}
                  onChange={(e) => setAddBottomText(e.target.value)}
                />
              </div>
              <button
                disabled={!addTopText || !addBottomText}
                className="btn col text-center mt-3 mb-2 create"
                type="submit"
              >
                Create Meme
              </button>
            </div>
          </form>
        )}

        {/* Home */}
        {!currentItem && (
          <>
            <h1>Choose a Image</h1>
            {images.map((item) => {
              return (
                <Image
                  currentItem={item}
                  onClick={() => {
                    setCurrentItem(item);
                  }}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default App;
