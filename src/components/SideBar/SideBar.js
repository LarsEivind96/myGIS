import React from "react";
import LayerList from "./LayerList";
import "./SideBar.css";
import { DragDropContext } from "react-beautiful-dnd";
import OperationList from "./OperationList";

const SideBar = ({ totalLayerSet, setTotalLayerSet }) => {
  let onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let sourceIdx = parseInt(result.source.index);
    let destIdx = parseInt(result.destination.index);
    let draggedLink = totalLayerSet[sourceIdx];
    let newList = totalLayerSet.slice();
    newList.splice(sourceIdx, 1);
    newList.splice(destIdx, 0, draggedLink);
    setTotalLayerSet(newList);
  };

  return (
    <div className="SideBar">
      <DragDropContext onDragEnd={onDragEnd}>
        <LayerList totalLayerSet={totalLayerSet} setTotalLayerSet={setTotalLayerSet} />
        <OperationList totalLayerSet={totalLayerSet} setTotalLayerSet={setTotalLayerSet} />
      </DragDropContext>
    </div>
  );
};

export default SideBar;
