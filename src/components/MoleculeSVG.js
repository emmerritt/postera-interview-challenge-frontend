import { useState, useEffect } from 'react';
import React from 'react';
import svgToJsx from 'svg-to-jsx';
import SVG from 'react-inlinesvg';
import { fetchMoleculeSVG } from '../utils/api';

// This is a default molecule svg that I'm using so that the component doesn't break initially before useEffect kicks off the API request
const svgStringDefault = "<svg version='1.1' baseProfile='full'               xmlns='http://www.w3.org/2000/svg'                                              xmlnsXlink='http://www.w3.org/1999/xlink'                   fill='#fff' stroke='#000' xmlSpace='preserve' width='200px' height='200px' viewBox='0 0 200 200'>  <rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='200' height='200' x='0' y='0'> </rect> <rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='200' height='200' x='0' y='0'> </rect> <path class='bond-0' d='M 41.193,94.609 L 53.6604,107.597' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-0' d='M 53.6604,107.597 L 66.1278,120.586' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-1' d='M 66.1278,120.586 L 113.004,109.048' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-2' d='M 113.004,109.048 L 149.892,140.191' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-6' d='M 113.004,109.048 L 131.224,64.3426' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-6' d='M 124.678,105.986 L 137.432,74.6923' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-3' d='M 149.892,140.191 L 190.909,114.732' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-3' d='M 150.953,128.168 L 179.665,110.347' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-4' d='M 190.909,114.732 L 186.13,95.3166' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-4' d='M 186.13,95.3166 L 181.352,75.9012' style='fill:none;fill-rule:evenodd;stroke:#CCCC00;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-5' d='M 172.929,67.3853 L 152.076,65.8639' style='fill:none;fill-rule:evenodd;stroke:#CCCC00;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <path class='bond-5' d='M 152.076,65.8639 L 131.224,64.3426' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /> <text dominant-baseline='central' text-anchor='end' x='37.9012' y='88.4136' style='font-size:16px;font-style:normal;font-weight:normal;fill-opacity:1;stroke:none;font-family:sans-serif;fill:#0000FF' ><tspan>H</tspan><tspan style='baseline-shift:sub;font-size:12px;'>2</tspan><tspan>N</tspan></text> <text dominant-baseline='central' text-anchor='start' x='174.538' y='70.2691' style='font-size:16px;font-style:normal;font-weight:normal;fill-opacity:1;stroke:none;font-family:sans-serif;fill:#CCCC00' ><tspan>S</tspan></text> </svg>"

const MoleculeSVG = ({smiles}) => {
    const [jsx, setJsx] = useState(svgStringDefault);

    const convertSVG = async (svg) => {
        const jsxSvg = await svgToJsx(svg);
        setJsx(jsxSvg);
    }

    const getSVGString = async (smiles) => {
        const svgString = await fetchMoleculeSVG({smiles})
        convertSVG(svgString);
    }

    useEffect(() => {
        const svgString = getSVGString(smiles);
      }, []);

    return (
        <>
            <SVG src={jsx} />
        </>
    )
}

export default MoleculeSVG;