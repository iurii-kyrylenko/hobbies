const paging = require('../helpers/paging');

const getItems = (Model, req, res) =>
    paging.getPageItems(req => ({ userId: req.user._id }), Model, req, res);

const getItem = (Model, req, res) => {
    Model.findById(req.params.id, (err, item) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!item || !item.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
         }
        res.send(item);
    });
};

const addItem = (Model, req, res) => {
    const item = new Model(req.body);
    item.userId = req.user._id;
    item.save((err) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(201);
    });
};

const changeItem = (Model, req, res) => {
    Model.findById(req.params.id, (err, item) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!item || !item.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        item.setFromObject(req.body);
        item.save((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
        });
    });
};

const deleteItem = (Model, req, res) => {
    Model.findById(req.params.id, (err, item) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!item || !item.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        item.remove((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
         });
    });
};

const uploadItems = (Model, req, res) => {
    const data = JSON.parse(req.file.buffer);
    const tasks = [];
    for(var i = 0; i < data.length; i++) {
        var item = new Model(data[i]);
        item.userId = req.user._id;
        tasks.push(item.save());
    }
    Promise.all(tasks)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
};

const mongoose = require('mongoose');

module.exports = (modelName) => {
    const Model = mongoose.model(modelName);
    return {
        getItems: (req, res) => getItems(Model, req, res),
        getItem: (req, res) => getItem(Model, req, res),
        addItem: (req, res) => addItem(Model, req, res),
        changeItem: (req, res) => changeItem(Model, req, res),
        deleteItem: (req, res) => deleteItem(Model, req, res),
        uploadItems: (req, res) => uploadItems(Model, req, res)
    };
}
