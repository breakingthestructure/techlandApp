const GLOBAL = require('../Globals');

const getDetailApartment = () => (
    fetch(`${GLOBAL.API_URL}/project/get-apartment/1396`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getDetailApartment;
