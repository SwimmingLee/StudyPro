import {applies} from "../models"

export const create_apply = async function(req, res) {

    const result = await applies.create_apply(req.body)
    res.send(result)
}

export const delete_apply = async function(req, res) {
    const apply_id = req.params.apply_id
    
    const result = await applies.delete_apply(apply_id)
    res.send(result)
}

export const update_apply = async function(req, res) {
    const apply_id = req.params.apply_id

    const result = await applies.update_apply(apply_id, req.body)
    res.send(result)
}

export const read_applies = async function(req, res) {
    const study_id = req.body.study_id

    const result = await applies.read_applies(study_id)
    res.send(result)
}