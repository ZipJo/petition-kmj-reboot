/* eslint-disable no-console */
/**
 * ./config/ftp.config.js looks like this:
 * exports.ftpCredentials = {
 *     username: 'USERNAME',
 *     password: '**********',
 *     host: 'HOSTURL or IP',
 *     port: 21,
 * };
 */
const SftpClient = require('ssh2-sftp-client');
const path = require('path');
const { ftpCredentials } = require('./config/ftp.config');

async function main() {
    const client = new SftpClient('upload-test');
    const localRoot = path.join(__dirname, 'build');
    const remoteRoot = '/petition.klima-mitbestimmung.jetzt/';
    const remoteDest = `${remoteRoot}httpdocs/`;
    const remoteTemp = `${remoteRoot}temp/`;

    client.on('upload', (info) => {
        console.log(`Uploaded ${info.source}`);
    });

    try {
        await client.connect(ftpCredentials);
        await client.mkdir(remoteTemp, true);
        const rslt = await client.uploadDir(localRoot, remoteTemp);
        try {
            await client.rmdir(remoteDest, true);
        } catch (err) {
            console.error(err.message);
        }
        await client.rename(remoteTemp, remoteDest);
        return rslt;
    } finally {
        client.end();
    }
}

main()
    .then((msg) => {
        console.log(msg);
    })
    .catch((err) => {
        console.log(`main error: ${err.message}`);
    });
