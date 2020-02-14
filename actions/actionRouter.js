const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
    Actions.get().then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({error})
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
})

function validateActionId(req, res, next) {
    Actions.get(req.params.id).then(action => {
      if(action){
        req.action = action;
        next();
      } else {
        res.status(400).json({message: "Invalid action id"});
        next();
      }
    })
  }


module.exports = router;
