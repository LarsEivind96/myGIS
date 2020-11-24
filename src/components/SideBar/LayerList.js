import React, { useState } from "react";
import "./SideBar.css";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Colors from "../../constants/Colors";

const LayerList = (props) => {
  const { totalLayerSet, setTotalLayerSet } = props;

  let layersCopy = [];
  totalLayerSet.forEach((element) => {
    layersCopy.push(element);
  });

  const toggleAllVisibility = (visible) => {
    layersCopy.forEach((layer) => {
      layer.layout.visibility = visible ? "visible" : "none";
    });
    setTotalLayerSet(layersCopy);
  };

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
            draggingOver={snapshot.draggingOver === "delete"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div style={{ width: "65%", wordWrap: "break-word" }}>{layer.id}</div>
            <button
              className="LayerButton"
              style={{
                width: "50px",
                borderRadius: "5px",
                backgroundColor: Colors.button,
                color: Colors.text,
              }}
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
      <h3>Layers</h3>
      <div>Drag and drop the layers to change order of visualization</div>
      <div className="ToggleButtons">
        <button
          onClick={() => {
            toggleAllVisibility(true);
          }}
        >
          Show All
        </button>
        <button
          onClick={() => {
            toggleAllVisibility(false);
          }}
        >
          Hide All
        </button>
      </div>
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
      <Droppable droppableId={"delete"}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ color: Colors.delete, borderColor: Colors.delete }}
            className="DeleteLayer"
          >
            D E L E T E{provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const StyledContainer = styled.div`
  font-size: 14px;
  margin-top: 4px;
  opacity: ${(props) => (props.isDragging ? 0.6 : 1)};
  background-color: ${(props) => (props.draggingOver ? Colors.delete : Colors.secondary)};
  border: ${(props) =>
    props.isDragging ? "1px solid rgba(0, 0, 0, 0.6);" : "1px solid rgba(0, 0, 0, 0.3);"};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 10px 20px rgba(0, 0, 0, 0.49);" : "-2px 3px 3px rgba(0, 0, 0, 0.43);"};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Colors.text};
`;

export default LayerList;
