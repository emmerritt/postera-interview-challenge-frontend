import React from 'react';
import { useState } from 'react';
import MoleculeSVG from './MoleculeSVG';
import { fetchMoleculeDetails } from '../utils/api';

const CustomNode = ({ nodeData = {}, triggerNodeToggle, foreignObjectProps = {}, setSelectedMolecule, selectedRoute, setMoleculeDetails }) => {
    const [hidden, setHidden] = useState(true);

    const handleMouseOver = () => {
        setHidden(false);
    }

    const handleMouseOut = () => {
        setHidden(true);
    }

    const handleNodeClick = async (e) => {
        console.log('route index', selectedRoute)
        console.log('node data', nodeData)
        if (!nodeData.root) {
            if (nodeData.attributes.catalog_entries_count && nodeData.attributes.catalog_entries_count > 0){
                fetchMoleculeDetails({routeIndex: selectedRoute, smiles: nodeData.name, setMoleculeDetails, setSelectedMolecule});
            }
        }
        // setSelectedMolecule({name: nodeData.name});

    }

  return (
    <React.Fragment >
        <circle 
            r={20} 
            onClick={() => {
                console.log('click')
            }}
        ></circle>

    <foreignObject {...foreignObjectProps}
            x="-100px"
            y="-52px">
        <div
            style={{
                display: 'inline-block',
                border: 'none',
                margin: '5px',
                backgroundColor: '#2E558A',
                color: '#fff'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleNodeClick}
        >
          <h3>{nodeData.name}</h3>
          { nodeData.attributes && !hidden ?
                <div
                    style={{
                        // display: 'inline-block',
                        border: 'none',
                        margin: '5px',
                        backgroundColor: '#fff',
                        color: '#000',
                        padding: '2px',
                        maxWidth: '240px'
                    }}
                >
                    <h4>Total Catalog Entries: {nodeData.attributes.catalog_entries_count}</h4>
                    <h4>Reaction Name: {nodeData.attributes.reaction_name}</h4>
                </div> 
            : null
          }
        </div>
      </foreignObject>

    </React.Fragment>
  );
};

export default CustomNode;
