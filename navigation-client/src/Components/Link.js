import React, { useState, useEffect } from 'react';
import Form from './Form'
function Link(props) {
    const [editLink, setEditLink] = useState(false);
    
    const [deleteLink, setDeleteLink] = useState(false);
    const [groupEditDelete, setgroupEditDelete] = useState(false);
    let groupEditDeleteHendler=()=>{
        setgroupEditDelete(!groupEditDelete)
        setEditLink(false)
    }

    let editLinkHendler = () => {
        setEditLink(!editLink)
        setgroupEditDelete(false)
    }
    let deleteLinkHendler = () => {
        
    }

    return (
       
        <div class='group7'>
           
            <div class='card-package card-bg'> 
                
                <div class='name'> {editLink ? <Form link={props.link} /> : props.link.title}  </div> 
                {!editLink ? <div id='edit-btn-div'><button class='btn-edit btn-edit-bg' onClick={groupEditDeleteHendler}>...</button> 
                </div> : null}
            </div>
            {groupEditDelete ? <div id='group-edit-del'> 
                <div ><button class='group-edit-del-btn' onClick={editLinkHendler}>edit</button></div>
                <div><button class='group-edit-del-btn'>delete</button></div> </div> : null}

            
        </div>
            
     
     
    );
}

export default Link;