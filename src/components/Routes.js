import React, {useEffect, useState, useCallback} from "react";
import {createUseStyles} from 'react-jss';
import Tree from 'react-d3-tree';
import CustomNode from "./CustomNode";
import { fetchRoute, fetchRoutesList } from "../utils/api";
import MoleculeDetailsVendor from "./MoleculeDetailsVendor";

// use jss styling
const useRoutesStyles = createUseStyles({
  foundation: {
    margin: '10px',
  },
});

export const Routes = () => {
  const styles = useRoutesStyles();
  const [route, setRoute] = useState({});
  const [routesList, setRoutesList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(-1)
  const [selectedMolecule, setSelectedMolecule] = useState({})
  const [moleculeDetails, setMoleculeDetails] = useState({})

  const customNodeFnMapping = {
    mixed: {
      description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
      fn: ({ nodeDatum, toggleNode }, appState) => (
        <CustomNode
          nodeData={nodeDatum}
          triggerNodeToggle={toggleNode}
          setSelectedMolecule={setSelectedMolecule}
          selectedRoute={selectedRoute}
          setMoleculeDetails={setMoleculeDetails}
          selectedMolecule={selectedMolecule}
          foreignObjectProps={{
            width: 300,
            height: 200,
            x: -500,
            y: 0,
          }}
        />
      ),
    }
  }

  const renderCustomNodeElement = customNodeFnMapping['mixed'].fn;

  const handleSelectNewRoute = (e) => {
    setSelectedRoute(e.target.value);
    fetchRoute({routeIndex: e.target.value, setRoute: setRoute});
    setSelectedMolecule({});
  }

  useEffect(() => {
    fetchRoutesList(setRoutesList);
    fetchRoute({routeIndex: 4, setRoute: setRoute});
    console.log(routesList)
  }, []);

  // TODO: use react-d3-tree to visualize the routes
  //   - https://www.npmjs.com/package/react-d3-tree

  return (
    <div className={styles.foundation}>

      <select value={selectedRoute} onChange={handleSelectNewRoute} >
        <option value={-1} >Choose a Route</option>
        {
          routesList.map((route) => {
            return <option key={route.id} value={route.id} >Route #{route.id+1} - Building Block Count: {route.building_blocks}</option>
          })
        }
      </select>

      <div>
        { selectedRoute >= 0 ?
          <div className='tree-ui'>
            <div id="treeWrapper" style={{ width: '40em', height: '30em' }}>
            <Tree 
              hasInteractiveNodes
              data={route} 
              renderCustomNodeElement={
                rd3tProps => renderCustomNodeElement(rd3tProps, customNodeFnMapping['mixed'].fn)
              }
              translate={{ x: 250, y: 100 }}
              separation={{siblings: 2, nonSiblings: 2}}
              orientation='vertical'
            /> 
            </div>
            <div className='molecule-details'>
              <h2>Molecule Details</h2>
              { !moleculeDetails.molecule_details ?
                <p>Click the name of a molecule to see more information.</p>
                : 
                <>
                  <h3>Smiles: {moleculeDetails.molecule_details.smiles}</h3>
                  <h3>Vendors & Lead Times</h3>
                    <ul>
                    { moleculeDetails.molecule_details.catalog_entries.map((vendor, index) => {
                        return <MoleculeDetailsVendor vendor={vendor} key={index} />
                      })
                    }
                  </ul>
                </>
              }
            </div>
          </div>
          : null
        }
      </div>
    </div>
  );
};
