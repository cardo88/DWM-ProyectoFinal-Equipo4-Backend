const Product = require("../models/Product");

// exports.createProduct = async (req, res) => {

//     try {
//         let product;

//         // Creamos nuestro producto
//         product = new Product(req.body);

//         await product.save();
//         res.send(product);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error');
//     }
// }

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Manejar errores de validación
            const validationErrors = {};
            for (const field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            res.status(400).json({ errors: validationErrors });
        } else {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    }
}

exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find();
        res.json(products)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.updateProduct = async (req, res) => {

    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        product.nombre = nombre;
        product.categoria = categoria;
        product.ubicacion = ubicacion;
        product.precio = precio;

        product = await Product.findOneAndUpdate({ _id: req.params.id }, product, { new: true })
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.getProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Product.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}