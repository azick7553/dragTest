import React, { useState, useEffect } from "react";
import Link from "./Link";
import "./Navigation.css";
import { Droppable } from "react-beautiful-dnd";
function Navigation(props) {
  let updateLinkHendler = (e, id) => {
    console.log(e.target);
    let value = e.target.value;
    let name = e.target.name;

    fetch(`http://localhost:3000/api/links/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [name]: value
      })
    })
      .then(res => res.json())
      .then(res => {
        props.updatedLinkHendler(res.data);
      });
  };

  return (
    <div id="navigation">
      <div id="zonee">
        <div className="Rectangle">
          <div className="bg">
            <div className="bg-text">Navigation</div>{" "}
            <div
              className="bg-text-add"
              onClick={() => props.createLinkHendler()}
            >
              +item
            </div>{" "}
          </div>

          {props.navigation
            ? 
              
                <Droppable droppableId="1">
                  {provided =>
                    props.navigation.map(link => (
                      <div>
                        <Link
                          innerRef={provided.innerRef}
                          {...provided.droppableProps}
                          key={link.id}
                          link={link}
                          updateLinkHendler={updateLinkHendler}
                          deleteLinkHendler={props.deleteLinkHendler}
                          editLinkHendler={props.editLinkHendler}
                        />
                        {provided.placeholder}
                      </div>
                    ))
                  }
                </Droppable>
              
            : null}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
