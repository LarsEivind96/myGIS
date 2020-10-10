import React, { useState } from "react";
import "./SideBar.css";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

const LayerList = (props) => {
  const { totalLayerSet, setTotalLayerSet } = props;

  let layersCopy = [];
  totalLayerSet.forEach((element) => {
    layersCopy.push(element);
  });

  const toggleVisibility = (layer) => {
    if (layer.layout.visibility === "none") {
      layer.layout.visibility = "visible";
    } else {
      layer.layout.visibility = "none";
    }
    setTotalLayerSet(layersCopy);
  };

  const Item = ({ index, layer }) => {
    const [visibility, setVisibility] = useState(layer.layout.visibility);
    return (
      <Draggable draggableId={`${index}`} index={index}>
        {(provided, snapshot) => (
          <StyledContainer
            className="Layer"
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div style={{ width: "65%", wordWrap: "break-word" }}>{layer.id}</div>
            <button
              style={{ width: "50px" }}
              onClick={() => {
                setVisibility(visibility === "visible" ? "none" : "visible");
                toggleVisibility(layer);
              }}
            >
              {visibility === "visible" ? "hide" : "show"}
            </button>
          </StyledContainer>
        )}
      </Draggable>
    );
  };

  return (
    <div className="LayerContainer">
      <p>Layers</p>
      <Droppable droppableId={"0"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {layersCopy.map((layer, index) => (
              <Item layer={layer} key={layer.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const StyledContainer = styled.div`
  font-size: 14px;
  margin-top: 3px;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  background-color: ${(props) => (props.isDragging ? "#ADD8E6" : "white")};
  cursor: ${(props) => (props.isDragging ? "grab;" : "pointer;")}
  border: ${(props) =>
    props.isDragging ? "1px solid rgba(0, 0, 0, 0.6);" : "1px solid rgba(0, 0, 0, 0.3);"};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 10px 20px rgba(0, 0, 0, 0.19);" : "0px 2px 3px rgba(0, 0, 0, 0.13);"};
  border-radius: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  `;

export default LayerList;
