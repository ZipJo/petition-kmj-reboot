/* eslint-disable no-console */
/**
 * ./config/ftp.config looks like this:
 * exports.ftpCredentials = {
 *     user: 'USERNAME',
 *     // Password optional, prompted if none given
 *     password: '**********',
 *     host: 'HOSTURL or IP',
 *     remoteRoot: 'probably /httpdocs/',
 *     port: 21,
 * };

 */
const FtpDeploy = require('ftp-deploy');
const { ftpCredentials } = require('./config/ftp.config');

const ftpConfig = {
    localRoot: './build',
    // upload everything including dot files
    include: ['*', '**/*', '.*'],
    // delete ALL existing files at destination before uploading (currently won't delete "."-files)
    deleteRemote: true,
    // Passive mode is forced
    forcePasv: true,
    // use ftp (mostly, because I can't get sftp to work)
    sftp: false,
    ...ftpCredentials,
};

const ftpDeploy = new FtpDeploy();

const verbose = (process.argv.includes('vb'));
if (verbose) {
    console.log('ftpConfig', ftpConfig);
    ftpDeploy.on('log', (data) => {
        console.log(data); // same data as uploading event
    });
    ftpDeploy.on('upload-error', (data) => {
        console.log(data.err); // data will also include filename, relativePath, and other goodies
    });
}

ftpDeploy
    .deploy(ftpConfig)
    .then((res) => console.log('finished:', res))
    .catch((err) => console.log(err));
