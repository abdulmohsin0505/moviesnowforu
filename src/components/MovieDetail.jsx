import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configs from "../config/config";
import GlobalLoading from "./Loading/GlobalLoading";

const ACCESS_TOKEN = import.meta.env.VITE_REACT_ACCESS_TOKEN;

function MovieDetail() {
  const { mediaType, mediaId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const getDetail = async () => {
    setLoading(true);
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    const res = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`,
      config
    );

    const result = await res.data;

    if (res.status === 200) {
      setLoading(false);
      setMovie(result);
    }
    console.log(result);
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (loading) {
    return <GlobalLoading />;
  }
  return (
    <main className="mt-5">
      <article className=" w-100 h-auto d-sm-flex s-md-flex flex-md-row flex-sm-column">
        <div className="mediaImage text-sm-center">
          <img
            src={`${configs.backdropPath(
              movie?.backdrop_path || movie?.poster_path
            )}`}
            alt={movie?.original_title || movie?.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              padding: "20px",
            }}
            loading="loading..."
          />
        </div>
        <div className="mediaDetail p-3 me-5">
          <div>
            <h1 className="py-2">
              {movie?.original_title} {movie?.original_name}
            </h1>
          </div>
          <div className="py-3">
            <b>Rating {movie?.vote_average}</b>
            {movie?.genres?.map((gen) => (
              <span key={gen?.id} className="mx-2 bg-info rounded py-1 px-2">
                {gen?.name}
              </span>
            ))}
          </div>
          <div className="py-3 text-left">
            <p className="fs-6">{movie?.overview?.slice(0, 360) + "..."}</p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default MovieDetail;
