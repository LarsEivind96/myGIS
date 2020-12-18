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

  const changeColor = (layer, color) => {
    layer.paint[`${layer.type}-color`] = color;
    setTotalLayerSet(layersCopy);
  };

  const Item = ({ index, layer }) => {
    const [visibility, setVisibility] = useState(layer.layout.visibility);
    const [color, setColor] = useState(layer.paint[`${layer.type}-color`]);
    return (
      <Draggable draggableId={`${index}`} index={index}>
        {(provided, snapshot) => (
          <StyledContainer
            className="Layer"
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div style={{ width: "70%", wordWrap: "break-word", marginLeft: 4, fontSize: "15px" }}>
              {layer.id}
            </div>
            <div className="Row">
              <input
                type="color"
                id="head"
                name="head"
                value={color}
                onChange={(evt) => {
                  setColor(evt.target.value);
                  changeColor(layer, evt.target.value);
                }}
              />
              <div
                className="LayerButton"
                onClick={() => {
                  setVisibility(visibility === "visible" ? "none" : "visible");
                  toggleVisibility(layer);
                }}
              >
                <i className="material-icons">{visibility === "visible" ? "visibility" : "visibility_off"}</i>
              </div>
            </div>
          </StyledContainer>
        )}
      </Draggable>
    );
  };

  return (
    <div className="LayerContainer">
      <div>
        <h3 style={{ color: Colors.textMain }}>Layers</h3>
      </div>

      <div
        className="Note"
        style={{
          color: Colors.textMain,
          borderLeft: `solid 4px ${Colors.secondary}`,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        Drag and drop the layers to delete them or change the order of visualization
      </div>

      <div className="ToggleButtons">
        <div
          className="Button"
          style={{ backgroundColor: Colors.secondary, color: Colors.text }}
          onClick={() => {
            toggleAllVisibility(true);
          }}
        >
          Show All
        </div>

        <div
          className="Button"
          style={{ backgroundColor: Colors.secondary, color: Colors.text }}
          onClick={() => {
            toggleAllVisibility(false);
          }}
        >
          Hide All
        </div>
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
      <div
        className="Note"
        style={{
          color: Colors.textMain,
          borderLeft: `solid 4px ${Colors.secondary}`,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          marginTop: "15px",
        }}
      >
        If you have found the correct location, drag and drop it in the box below!
      </div>
      <Droppable droppableId={"submit"}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              color: Colors.submit,
              borderColor: Colors.submit,
              marginTop: "10px",
              marginBottom: "10px",
            }}
            className="DeleteLayer"
          >
            S U B M I T{provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const StyledContainer = styled.div`
  font-size: 14px;
  margin-top: 6px;
  opacity: ${(props) => (props.isDragging ? 0.6 : 1)};
  background-color: ${(props) => {
    if (props.draggingOver === "delete") {
      return Colors.delete;
    } else if (props.draggingOver === "submit") {
      return Colors.submit;
    } else {
      return Colors.secondary;
    }
  }};
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
