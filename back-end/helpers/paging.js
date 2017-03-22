const getPageItems = (filter, Model, req, res) => {
    const itemsPerPage = 5;

    const queryBuilder = (req) => {
        let query = Model
            .find(filter(req))
            .select(Model.projectionFields)
            .sort(Model.sortFields);

        const term = req.query.term;

        if(term) {
            const re = new RegExp(term, 'i');
            const searchFields = Model.searchFields.split(' ');
            const searchExpressions = searchFields.map(field => {
                var exp = {};
                exp[field] = { $regex: re };
                return exp;
            });
            query = query.or(searchExpressions);
        }

        return query;
    };

    const getPagesCount = (itemsCount) => {
        if(!itemsCount) return 0;
        const int = Math.floor(itemsCount / itemsPerPage);
        const mod = itemsCount % itemsPerPage;
        return mod ? int + 1 : int;
    };

    const callbackBuilder = (res, pages) => {
        return (err, items) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.send({ items, pages });
        };
    };

    const page = req.query.page;

    if(page) {
        queryBuilder(req).count().then(count => {
            const itemsToSkip = itemsPerPage * (page - 1);
            queryBuilder(req)
                .skip(itemsToSkip)
                .limit(itemsPerPage)
                .exec(callbackBuilder(res, getPagesCount(count)));
        });
    } else {
        // get all items in one page
        queryBuilder(req)
        .exec(callbackBuilder(res, 1));
    }
};

module.exports = { getPageItems };
