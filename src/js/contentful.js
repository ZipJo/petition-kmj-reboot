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
        .catch((err) => console.err(entryID, err));
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
