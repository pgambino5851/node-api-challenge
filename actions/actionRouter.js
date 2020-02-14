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

router.post("/", validateAction,(req, res) => {
    let action = req.body
    Actions.insert(action).then(action => {
        res.status(200).json(action);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.delete("/:id", validateActionId, (req, res) => {
    let {id} = req.params;
    Actions.remove(id).then(action => {
        res.status(200).json({message: "Action has been nuked."})
    })
    .catch(error => {
        res.status(200).json(error)
    })
})

router.put("/:id", validateActionId, validateAction, (req, res) => {
    let {id} = req.params;
    let changes = req.body
    Actions.update(id, changes).then(action => {
        res.status(200).json(action);
    })
    .catch(error => {
        res.status(500).json(error);
    })
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

  function validateAction(req, res, next) {
    let body = req.body;
    if(body){
      req.action= body
      next();
    }
    else {
      console.log("POST BODY:", body)
      res.status(400).json({message: "Missing required text field"})
    }
  }


module.exports = router;
