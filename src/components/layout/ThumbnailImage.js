import React from 'react';

import { isNotNullOrUndefined } from "../../utils/Utils";
import defaultBannerThumbnail from "../../media/images/higo-vehiculo-thumbnail-comp.png";

const defaultImgAlt = "Image";

export default class ThumbnailImage extends React.Component {

    render() {
        const imgAlt = isNotNullOrUndefined(this.props.alt) ? this.props.alt : defaultImgAlt;
        const imgSrc = (isNotNullOrUndefined(this.props.src)) ? this.props.src : defaultBannerThumbnail;

        return (
            <React.Fragment>
                <figure className="image is-3by2 has-background-dark">
                    <img src={imgSrc} alt={imgAlt}/>
                </figure>
            </React.Fragment>
        );
    }
}