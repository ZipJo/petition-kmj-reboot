import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { createClient } from 'contentful';

const credentials = {
    space: 'x8e4wq40h3z1',
    accessToken: 'MxQZOJRs_zNZ3bXkonW-aAP0UA9OXIwYyNW2M18GleQ',
};

export const client = createClient(credentials);

// returns the entry or false if something went wrong
export async function getEntry(entryID) {
    let retVal = false;
    await client
        .getEntry(entryID)
        .then((entry) => {
            retVal = entry;
            return true;
        })
        .catch((err) => console.error(entryID, err));
    return retVal;
}

// returns the asset or false if something went wrong
export async function getAsset(assetID) {
    let retVal = false;
    await client
        .getAsset(assetID)
        .then((entry) => {
            retVal = entry;
            return true;
        })
        .catch((err) => console.error(assetID, err));
    return retVal;
}

// mapping from contentful-IDs to something more managable
export const CF = {
    assets: {
        logo: '2tJSFVbXNcS1TTeOQmgj3E',
    },
    entries: {
        videoAnimation: '4RTJm9cKBi8eR7pZSLxdrz',
        demand: '3No7vRFDLgIlZrAYz1D3Fp',
        reasoning: '2ryFY6pwp3hczZPo4aMn3s',
        sixReasons: '362huyXZ1rbO2V17Y98jFk',
        howto: '7BXvHRIzkGwvr1iklvO6jV',
        why: '5J4Y98woR5KSMihU44Tmhz',
        chance: '5eWwtetrfgmi2Ov6Pkajy',
    },
};

// returns a responsive picture node with the given parameters
export function getPictureNode(props) {
    const {
        title, description, file, sizes, className,
    } = props;
    file.url = `https:${file.url}`;
    const { contentType, url } = file;
    const isJpg = (contentType === 'image/jpg');
    const isPng = (contentType === 'image/png');

    const picture = document.createElement('picture');

    const imageProps = {
        quality1x: isJpg ? '&q=85' : '',
        quality2x: isJpg ? '&q=35' : '',
        fileMod: '',
        width1x: sizes.default.w ? `&w=${sizes.default.w}` : '',
        width2x: sizes.default.w ? `&w=${sizes.default.w * 2}` : '',
        height1x: sizes.default.h ? `&h=${sizes.default.h}` : '',
        height2x: sizes.default.h ? `&h=${sizes.default.h * 2}` : '',
    };

    // Set source Element for each breakpoint, try and use webp, when possible
    if (isJpg || isPng) {
        imageProps.fileMod = isJpg ? '&fl=progressive&fm=jpg' : '&fm=png';
        const breakpoints = {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        };

        const breakpointSizes = Object.keys(sizes).filter((key) => Object.keys(breakpoints).includes(key));
        breakpointSizes.forEach((size) => {
            const webpSource = document.createElement('source');
            const imgSource = document.createElement('source');

            const nextBreakpoint = breakpointSizes[breakpointSizes.findIndex((i) => i === size) + 1];
            const mediaQuery = `(min-width: ${breakpoints[size]}px)${nextBreakpoint ? ` and (max-width: ${breakpoints[nextBreakpoint] - 1}px)` : ''}`;
            const { quality1x, quality2x, fileMod } = imageProps;

            const w1x = sizes[size].w ? `&w=${sizes[size].w}` : '';
            const w2x = sizes[size].w ? `&w=${sizes[size].w * 2}` : '';
            const h1x = sizes[size].h ? `&h=${sizes[size].h}` : '';
            const h2x = sizes[size].h ? `&h=${sizes[size].h * 2}` : '';

            webpSource.setAttribute('media', mediaQuery);
            imgSource.setAttribute('media', mediaQuery);

            webpSource.setAttribute('type', 'image/webp');
            imgSource.setAttribute('type', contentType);

            const webpSrcSet = `${url}?fit=fill&fm=webp${h1x}${quality1x}${w1x},
            ${url}?fit=fill&fm=webp${h2x}${quality2x}${w2x} 2x`;
            const imgSrcSet = `${url}?fit=fill${fileMod}${h1x}${quality1x}${w1x},
            ${url}?fit=fill${fileMod}${h2x}${quality2x}${w2x} 2x`;

            webpSource.setAttribute('srcSet', webpSrcSet);
            imgSource.setAttribute('srcSet', imgSrcSet);

            picture.appendChild(webpSource);
            picture.appendChild(imgSource);
        });

        // set source for default breakpoint
        const webpSource = document.createElement('source');
        const imgSource = document.createElement('source');

        const {
            quality1x, quality2x, fileMod, width1x, width2x, height1x, height2x,
        } = imageProps;

        webpSource.setAttribute('type', 'image/webp');
        imgSource.setAttribute('type', contentType);

        const webpSrcSet = `${url}?fit=fill&fm=webp${height1x}${quality1x}${width1x},
        ${url}?fit=fill&fm=webp${height2x}${quality2x}${width2x} 2x`;
        const imgSrcSet = `${url}?fit=fill${fileMod}${height1x}${quality1x}${width1x},
        ${url}?fit=fill${fileMod}${height2x}${quality2x}${width2x} 2x`;

        webpSource.setAttribute('srcSet', webpSrcSet);
        imgSource.setAttribute('srcSet', imgSrcSet);

        picture.appendChild(webpSource);
        picture.appendChild(imgSource);

        // set img Element
        const imgElement = document.createElement('img');

        const imgSrc = `${url}?fit=fill${fileMod}${height1x}${quality1x}${width1x}`;

        imgElement.setAttribute('title', title);
        imgElement.setAttribute('alt', description);
        imgElement.setAttribute('src', imgSrc);
        if (className) imgElement.setAttribute('class', className);

        picture.appendChild(imgElement);
    }

    return picture;
}

export function setContent() {
    document.querySelectorAll('[data-content]').forEach(async (element) => {
        const selector = element.getAttribute('data-content').split('.');
        const entry = await getEntry(CF.entries[selector[0]]);
        element.innerHTML = typeof entry.fields[selector[1]] === 'string' ? entry.fields[selector[1]] : documentToHtmlString(entry.fields[selector[1]]);
    });
}
