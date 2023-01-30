const MoleculeDetailsVendor = ({vendor}) => {

    return (
        <li>
            <h4>Vendor: {vendor.catalog_name}</h4>
            <p>Vendor Id: {vendor.vendor_id}</p>
            <p>Lead Time: {vendor.lead_time_weeks} weeks</p>
        </li>
    )

}

export default MoleculeDetailsVendor;