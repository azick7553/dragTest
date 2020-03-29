import React, { useState, useEffect } from 'react';
import Link from './Link'
import './Navigation.css'

function Navigation(props) {

    let linkHendler=()=>{
       
    return props.navigation.map(link => <Link key={link.id} link={link} editLink={props.editLink} editLinkHendler={props.editLinkHendler}/>)
    }
    return (
        <div id='navigation'>
        <div id='zonee' >
            
            <div class='Rectangle'>
            
                    <div class='bg'><div class='bg-text'>Navigation</div> <div class='bg-text-add' onClick={()=>{}}>+item</div> </div>
            
          
            {props.navigation ? linkHendler() : null} 
            </div>
        </div>
        </div>


    );
}

export default Navigation;