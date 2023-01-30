const fetchRoutesList = async (setRoutesList) => {
    const response = await fetch(`http://localhost:8000/allroutes`);
    const routesListJSON = await response.json();
    setRoutesList(routesListJSON.routesList);
};

const fetchRoute = async ({routeIndex, setRoute}) => {
    const response = await fetch(`http://localhost:8000/routes?route=${routeIndex}`);
    const newRoute = await response.json();
    console.log(newRoute.data.tree)
    setRoute(newRoute.data.tree);
};

const fetchMoleculeDetails = async ({routeIndex, smiles, setMoleculeDetails, setSelectedMolecule}) => {
    const response = await fetch(`http://localhost:8000/moleculedetails?index=${routeIndex}&smiles=${smiles}`);
    const moleculeDetails = await response.json();
    console.log(moleculeDetails)
    setMoleculeDetails(moleculeDetails);
    // setSelectedMolecule({name: smiles})
};

export {
    fetchRoute,
    fetchRoutesList,
    fetchMoleculeDetails
}