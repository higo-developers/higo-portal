import React from 'react';

import {isNotNullOrUndefined} from "../../utils/Utils";
import defaultBannerThumbnail from "../../media/images/higo-vehiculo-thumbnail-comp.png";

const ENDPOINT_IMAGES = `${process.env.REACT_APP_API_BASE_URL}/imagenes/`;
const DEFAULT_IMG_ALT = "Image";

export default class ThumbnailImage extends React.Component {

    render() {
        const imgAlt = isNotNullOrUndefined(this.props.alt) ? this.props.alt : DEFAULT_IMG_ALT;
        const imgSrc = (isNotNullOrUndefined(this.props.src)) ? `${ENDPOINT_IMAGES}${this.props.src}` : defaultBannerThumbnail;

        return (
            <React.Fragment>
                <figure className="image is-3by2 has-background-dark">
                    <img src={imgSrc} alt={imgAlt}/>
                </figure>
            </React.Fragment>
        );
    }
}