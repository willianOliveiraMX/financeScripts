const axios = require('axios');

exports.createGroups = async function createGroups(connection = {}, token_chatid, newGroups = []) {
    const baseURl = 'http://localhost:3000';

    for (let index = 0; index < newGroups.length; index++) {
        const element = newGroups[index];
        const req = await axios({
            method: 'POST',
            url: `${baseURl}/debt-group`,
            data: {
                description: element.description,
                token_chatid: token_chatid
            }
        });
        console.log('Created debt group:: \n', req.data);

        const { debts = [] } = element;

        for (let index = 0; index < debts.length; index++) {
            const debt = debts[index];
            const reqPut = await axios({
                method: 'PUT',
                url: `${baseURl}/debt/edit/${debt.id}`,
                data: {
                    groupid: req.data.id
                }
            });
            console.log('   Update debt with group:: \n', reqPut.data);
        }
    }
}