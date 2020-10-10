import * as turf from "@turf/turf";

const Buffer = (layer, radius) => {
  let bufferedLayer = JSON.parse(JSON.stringify(layer));
  bufferedLayer.source.data = turf.buffer(layer.source.data, radius, { units: "metres" });
  // Change id of the new layer
  bufferedLayer.id = bufferedLayer.id + `_${radius}m`;
  bufferedLayer.layout.visibility = "visible";
  return bufferedLayer;
};

const Intersect = (layer1, layer2) => {
  let layer1Copy = JSON.parse(JSON.stringify(layer1));
  let layer2Copy = JSON.parse(JSON.stringify(layer2));
  layer1Copy.source.data = turf.intersect(layer1Copy.source.data, layer2Copy.source.data);
  // Change id of the new layer
  layer1Copy.id = layer1Copy.id + `_${layer2Copy.id}_intersect`;
  layer1Copy.layout.visibility = "visible";
  return layer1Copy;
};

export { Buffer, Intersect };
