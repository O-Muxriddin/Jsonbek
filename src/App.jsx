import React, { useEffect, useState } from "react";

import {
  CardTitle,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { Card, Image, Text } from "@chakra-ui/react";

export default function App() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selekt, setSelekt] = useState("drama");
  const [eror, setEror] = useState(false);

  useEffect(() => {
    setLoader(true);
    setEror(false);
    fetch(`https://jsonbek.uz/api/products?style=${selekt}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(res);
      })
      .catch(() => {
        setEror(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selekt]);

  function handleChange(evt) {
    setSelekt(evt.target.value);
  }
  // if (eror) {
  //   return;
  // }

  if (loader) {
    return (
      <div className="loader">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="loader-card">
            <Skeleton className="loader-img" />
            <SkeletonText noOfLines={5} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <select className="filter-select" onChange={handleChange} value={selekt}>
        <option value="comedy">Komediya</option>
        <option value="drama">Drama</option>
        <option value="romance">Romantika</option>
        <option value="adventure">Sarguzasht</option>
      </select>

      <div className="cards-grid">
        {state.map((el) => (
          <div key={el.id} className="card-wrapper">
            <Card.Root maxW="sm" overflow="hidden" className="product-card">
              <Image src={el.image} alt="Bu yerda rasm bor" className="card-image" />

              <Card.Body className="card-body">
                <Card.Title className="card-title">{el.title}</Card.Title>

                <Card.Description className="card-desc">
                  {el.description}
                </Card.Description>

                <Text className="card-price">Narxi: {el.price}</Text>

                <CardTitle className="card-origin">
                  Kelib chiqishi: {el.origin}
                </CardTitle>
              </Card.Body>
            </Card.Root>
          </div>
        ))}
      </div>
    </div>
  );
}
