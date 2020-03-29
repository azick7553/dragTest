import React, {useState, useEffect}from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation'
// import figmaComponent from './figmaComponents'
// import {Page,View, Text, Figma} from 'react-figma'

function App() {
  
  const [navigation, setNavigation] = useState(null);
  const [node, setNode] = useState(null);
 
  
  useEffect(() => {
    fetch("https://api.figma.com/v1/files/bZzszSVSiLLy9JwCD8j6J3/nodes?ids=730%3A1151",
    {
      method: 'get',
      headers: new Headers({
        'X-FIGMA-TOKEN': '39477-60734c93-6a52-47fc-8fa0-49d006f73a1c'
      })
    })
    .then(res => res.json())
      .then(data => {
        console.log(data.nodes['730:1151'].document.children)
        setNode(data.nodes['730:1151'].document.children)
      });
  
    fetch("http://localhost:3000/api/navigation/links")

      .then(res => res.json())
      .then(res => setNavigation(res.data))
  },[]);
  return (
    <Navigation 
    navigation={navigation}
    node={node}
   />
    ) 
}

export default App;
