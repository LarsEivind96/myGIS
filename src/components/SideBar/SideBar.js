import React from "react";
import LayerList from "./LayerList";
import "./SideBar.css";
import { DragDropContext } from "react-beautiful-dnd";
import OperationList from "./OperationList";
import Colors from "../../constants/Colors";

const SideBar = ({ totalLayerSet, setTotalLayerSet, setSideBarOpen, setDeletedLayerId }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let newList = totalLayerSet.slice();
    let sourceIdx = parseInt(result.source.index);

    if (result.destination.droppableId === "delete") {
      if (newList.length < 3) {
        alert("Please do not delete any more layers.");
        return;
      }
      newList.splice(sourceIdx, 1);
      setDeletedLayerId(totalLayerSet[sourceIdx].id);
      setTotalLayerSet(newList);
    } else {
      let destIdx = parseInt(result.destination.index);
      let draggedLink = totalLayerSet[sourceIdx];
      newList.splice(sourceIdx, 1);
      newList.splice(destIdx, 0, draggedLink);
      setTotalLayerSet(newList);
    }
  };

  return (
    <div className="SideBar">
      <button
        style={{ backgroundColor: Colors.secondary, color: Colors.text }}
        className="CloseSideBar"
        onClick={() => {
          setSideBarOpen(false);
        }}
      >
        &#10007;
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <LayerList totalLayerSet={totalLayerSet} setTotalLayerSet={setTotalLayerSet} />
        <OperationList totalLayerSet={totalLayerSet} setTotalLayerSet={setTotalLayerSet} />
      </DragDropContext>
    </div>
  );
};

export default SideBar;
