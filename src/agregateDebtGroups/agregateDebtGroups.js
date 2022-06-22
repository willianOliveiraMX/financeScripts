const { module_debt_group } = require('../models/debt_group');
const { module_debt } = require('../models/debt');

exports.agregateDebtGroups = async function(connection = {}, token_chatid) {

    const getDebtGroups = async () => {
        const DebtGroup = module_debt_group(connection);

        const list = await DebtGroup.findAll({ where: { isvalid: true } });
        return list.map(item => {
            item.dataValues
            return {
                ...item.dataValues,
                description: item.dataValues.description.toLowerCase().replace(' ', '')
            }
        });
    };

    const getFilteredDebtsGroup = (dataValues) => {
        const filteredList = [];

        dataValues.forEach(value => {
            const newValue = {
                ...value,
                description: value.description.toLowerCase().replace(' ', '')
            }

            const isAlreadyAdd = filteredList.find(element => element.description === newValue.description);
            if (isAlreadyAdd) return;

            filteredList.push(newValue);
        });

        return filteredList;
    }

    const getDebts = async () => {
        const Debt = module_debt(connection);

        const list = await Debt.findAll({ where: { isvalid: true, token_chatid: token_chatid} });
        return list.map(item => item.dataValues);
    };

    const listDebtsGroup = await getDebtGroups();
    const listDebts = await getDebts();

    const getRelationGroupDebt = () => {
        const debtsGroupFiltered = getFilteredDebtsGroup(listDebtsGroup);
        const relations = [];
        let unrelated = [];
        
        listDebts.forEach((currentDebt) => {
            currentDebt.description = currentDebt.description.toLowerCase().replace(' ', '');

            const currentDebtGroup = debtsGroupFiltered.find(element => element.description === currentDebt.description);
            if (currentDebtGroup) {
                const isRelationAdd = relations.find(relation => relation.description === currentDebtGroup.description);

                if (isRelationAdd) {
                    isRelationAdd.debts = [...isRelationAdd.debts, currentDebt]
                    return;
                };

                relations.push({
                    ...currentDebtGroup,
                    debts: [
                        currentDebt
                    ]
                });
                return;
            }
            unrelated = [...unrelated ,currentDebt];
        });

        const getUnrelatedGroups = () => {
            let newDebts = [];
            unrelated.forEach(element => {
                const isAdd = newDebts.find(d => d.description === element.description);
                if (isAdd) {
                    isAdd.debts = [
                        ...isAdd.debts,
                        element
                    ]
                    return;
                };

                newDebts = [...newDebts, {
                    ...element,
                    debts: [element]
                }];
            });
            return newDebts;
        };

        return [...relations, ...getUnrelatedGroups()];
    };
    return getRelationGroupDebt();
};
