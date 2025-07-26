import { Gallery } from '../models/Index.js';
import fs from 'fs';

export async function listGallery(req, res, next) {
    try { res.json(await Gallery.findAll({ order: [['id', 'DESC']] })); } catch (err) { next(err); }
}

export async function addGallery(req, res, next) {
    try {
        const record = await Gallery.create({ image_path: req.file.path, about: req.body.about });
        res.status(201).json(record);
    } catch (err) { next(err); }
}

export async function deleteGallery(req, res, next) {
    try {
        const img = await Gallery.findByPk(req.params.id);
        if (img) fs.unlinkSync(img.image_path);
        await img.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
}