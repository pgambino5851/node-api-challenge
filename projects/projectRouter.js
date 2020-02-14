const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel')

router.get('/', (req, res) => {
    Projects.get().then(Projects => {
        res.status(200).json(Projects);
    })
    .catch(error => {
        res.status(500).json({error})
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
})

router.get('/:id/projectActions', validateProjectId, (req, res) => {
    let {id} = req.params
    Projects.getProjectActions(id).then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post("/", validateProject,(req, res) => {
    let project = req.body
    Projects.insert(project).then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.delete("/:id", validateProjectId, (req, res) => {
    let {id} = req.params;
    Projects.remove(id).then(project => {
        res.status(200).json({message: "project has been nuked."})
    })
    .catch(error => {
        res.status(200).json(error)
    })
})

router.put("/:id", validateProjectId, validateProject, (req, res) => {
    let {id} = req.params;
    let changes = req.body
    Projects.update(id, changes).then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

function validateProjectId(req, res, next) {
    Projects.get(req.params.id).then(project => {
      if(project){
        req.project = project;
        next();
      } else {
        res.status(400).json({message: "Invalid project id"});
        next();
      }
    })
  }

  function validateProject(req, res, next) {
    let body = req.body;
    if(body){
      req.project= body
      next();
    }
    else {
      console.log("POST BODY:", body)
      res.status(400).json({message: "Missing required text field"})
    }
  }


module.exports = router;
