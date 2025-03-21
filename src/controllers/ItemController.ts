import Item from "../models/Item";

export class ItemController {

    static async addItem(req, res, next) {
        const itemData = req.body;
        const files = req.files;
        try {
            // create product
            let item_data: any = {
                name: itemData.name,
                status: itemData.status,
                price: parseInt(itemData.price),
                category_id: itemData.category_id,
                store_id: itemData.store_id,
                // cover: path
            };
            if(itemData.description) item_data = {...item_data, description: itemData.description};
            if(itemData.specifications) item_data = {...item_data, specifications: itemData.specifications};
            if(itemData.sub_category_id) item_data = {...item_data, sub_category_id: itemData.sub_category_id};
            if(itemData.sku) item_data = {...item_data, sku: itemData.sku};
            if(itemData.price) item_data = {...item_data, price: itemData.price};
            if(itemData.stock_unit) item_data = {...item_data, stock_unit: itemData.stock_unit};
            if(itemData.variations) item_data = {...item_data, variations: itemData.variations};
            if(files)  {
                let images: any[] = [];
                images = files.map(x => x.path);
                item_data = { ...item_data, images };
            }
            const itemDoc = await new Item(item_data).save();
            res.send(itemDoc);
        } catch(e) {
            next(e);
        }
    }

    static async getProductsByCategory(req, res, next) {
        try {
            const category_id = req.query.category_id;
            const sub_category_id = req.query.sub_category_id;
            let query: any = {
                status: true,
                category_id
            };
            if(sub_category_id) {
                query = { ...query, sub_category_id };
            }
            const products = await Item.find(query);
            res.json({
                products
            });
        } catch(e) {
            next(e);
        }
    }

}