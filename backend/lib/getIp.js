const getIPAddress = () => {
    const {networkInterfaces} = require('os')
    const nets = networkInterfaces()
    for (let name of Object.keys(nets)) {
        for (let net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address
            }
            else if (net.family === 'IPv4' && net.internal) {
                returnnet.address
            }
        }
    }
}
module.exports = getIPAddress