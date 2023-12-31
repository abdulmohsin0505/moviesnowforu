import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import configs from "../config/config";
import GlobalLoading from "./Loading/GlobalLoading";
import api from "../utils/api";
import { useErrorBoundary } from "react-error-boundary";

const ACCESS_TOKEN = import.meta.env.VITE_REACT_ACCESS_TOKEN;
const Trailer = () => {
  const { showBoundary } = useErrorBoundary();
  const { mediaType, mediaId } = useParams();
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState("");

  useEffect(() => {
    const getMedia = async () => {
      try {
        const config = {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        };
        const res = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos`,
          config
        );
        const { results } = await res.data;
        const trailer = results.find(
          (result) => result.name === "Official Trailer"
        );

        if (trailer) {
          setLoading(false);
          setTrailerId(trailer.key);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        showBoundary(error);
      }
    };
    getMedia();
  }, [mediaId, mediaType]);

  const tarilerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    padding: "20px 0",
  };

  return (
    <>
      {loading && <GlobalLoading />}
      <Container className="mt-3">
        <div className="mt-2 mb-2 border-info border-3 border-bottom fs-5 fw-bold d-inline">
          TRAILER
        </div>
        <div style={tarilerStyle}>
          {trailerId ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={configs.youtubePath(trailerId)}
                title="youtube trailer"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            "Not available"
          )}
        </div>
      </Container>
    </>
  );
};

export default Trailer;
