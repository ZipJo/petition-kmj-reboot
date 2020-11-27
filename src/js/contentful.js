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
    const { stuff } = props;
    const picture = document.createElement('picture');
    `<picture>
    <source type="image/webp" srcSet="https://contentful.com/test.jpg?fit=fill&fm=webp&h=500&q=85&w=500,
    https://contentful.com/test.jpg?fit=fill&fm=webp&h=1000&q=35&w=1000 2x,
    https://contentful.com/test.jpg?fit=fill&fm=webp&h=1500&q=25&w=1500 3x" />
    <source type="image/jpeg" srcSet="https://contentful.com/test.jpg?fit=fill&fl=progressive&fm=jpg&h=500&q=85&w=500,
    https://contentful.com/test.jpg?fit=fill&fl=progressive&fm=jpg&h=1000&q=35&w=1000 2x,
    https://contentful.com/test.jpg?fit=fill&fl=progressive&fm=jpg&h=1500&q=25&w=1500 3x" />
    <img src="https://contentful.com/test.jpg?fit=fill&fl=progressive&fm=jpg&h=500&q=85&w=500" class="react-contentful-image" />
    </picture>`;
    return picture;
}
