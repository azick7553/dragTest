import React, { useState, useEffect } from 'react';
import Link from './Link'
import './Navigation.css'

function Navigation(props) {

    let updateLinkHendler = (e, id) => {
        console.log(e.target)
        let value = e.target.value;
        let name = e.target.name;

        fetch(`http://localhost:3000/api/links/${id}`,
            {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    [name]: value,

                })
            })
            .then(res => res.json())
            .then((res)=>{
                props.updatedLinkHendler(res.data)
            })
    }
    let linkHendler=()=>{
       
        return props.navigation.map(link => <Link key={link.id} link={link} updateLinkHendler={updateLinkHendler} deleteLinkHendler={props.deleteLinkHendler}editLinkHendler={props.editLinkHendler}/>)
    }
    
    return (
        <div id='navigation'>
        <div id='zonee' >
            
            <div class='Rectangle'>
            
                    <div class='bg'><div class='bg-text'>Navigation</div> <div class='bg-text-add' onClick={()=>props.createLinkHendler()}>+item</div> </div>
            
          
            {props.navigation ? linkHendler() : null} 
            </div>
        </div>
        </div>


    );
}

export default Navigation;