const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const categorymodel = require("./model/categorymodel");
const subcatmodel = require('./model/subcateorymodel');
const productModel = require('./model/Productmodel');
const CustomerModel = require('./model/Customermodel');
const CardModel = require('./model/CardModel');

const user = require('./model/UserModel');
const userordermodel = require("./model/userOrderModel");
const orderdetailmodel = require("./model/orderDetailModel");


const app = express();
const connect = mongoose.connect("mongodb://127.0.0.1:27017/MyDB");
connect.then(() => {
    console.log("connection done");
});
connect.catch(() => {
    console.log("connection not done");
});
app.use(express.static("cat-pic"));
app.use(express.static("sub_catpics"));
app.use(express.static("product_pics"));


app.use(cors());
app.use(express.json());

app.get("/category", async (req, res) => {
    const re = await categorymodel.find();
    res.json(re);
});
app.get("/category/:id", async (req, res) => {
    const re = await categorymodel.find({ _id: req.params.id });
    res.json(re);
});
const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "cat-pic");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const uploadpic = multer({
    storage: mystorage,
});
app.post("/category", uploadpic.single("categorypic"), async (req, res) => {
    const re = new categorymodel({
        categoryname: req.body.categoryname,
        categorypic: req.file.filename,
    });
    await re.save();
    res.json({ msg: "record saved" });
});
app.delete("/category", async (req, res) => {
    const re = await categorymodel.findOneAndDelete({ _id: req.body.cid });
    res.json({ msg: "record delete" });
});
app.put("/category", async (req, res) => {
    const re = await categorymodel.findByIdAndUpdate(
        { _id: req.body.cid },
        {
            categoryname: req.body.categoryname,
        }
    );
    await re.save();
    res.send({ msg: "record update" });
});
const mystorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "sub_catpics");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const uploadsubcatpic = multer({
    storage: mystorage1,
});
//subcategory
app.post(
    "/subcategory",
    uploadsubcatpic.single("subcategorypic"),
    async (req, res) => {
        const re = new subcatmodel({
            categoryid: req.body.categoryid,
            subcategoryname: req.body.subcategoryname,
            subcategorypic: req.file.filename,
        });
        await re.save().then(() => {
            console.log("data save successfully")
        })
        res.json({ msg: "record saved" });
    }
);


app.patch('/subcategory', async (req, res) => {
    const re = await subcatmodel.find({ categoryid: req.body.categoryid });
    res.json(re)
});
// app.patch('/subcategory', async (req, res) => {
//     const re = await subcatmodel.find({ categoryid: req.body.categoryid });
//     res.json(re)
// });
app.delete('/subcategory', async (req, res) => {
    const re = await subcatmodel.findOneAndDelete({ _id: req.body.subcatid });
    res.json({ msg: "data deleted" });
});
app.get("/subcategory/:id", async (req, res) => {
    const re = await subcatmodel.find({ _id: req.params.id });
    res.json(re);
});

app.put("/subcategory", async (req, res) => {
    const re = await subcatmodel.findByIdAndUpdate(
        { _id: req.body.catid1 },
        {
            subcategoryname: req.body.subcategoryname,
        }
    );
    res.send({ msg: "record update" });
});


//product

const mystorage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "product_pics");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const uploadproductpic = multer({
    storage: mystorage2,
});

app.post(
    "/product",
    uploadproductpic.single("productpic"),
    async (req, res) => {
        const re = new productModel({
            subcategoryid: req.body.subcatid,
            productname: req.body.pname,
            productpic: req.file.filename,
            price: req.body.price,
            offerprice: req.body.offerprice,
            desc: req.body.desc
        });
        await re.save().then(() => {
            console.log("data save successfully")
        })
        res.json({ msg: "record saved" });
    }
);


app.patch('/product', async (req, res) => {
    const re = await productModel.find({ subcategoryid: req.body.subcatid });
    res.json(re)
});
app.get('/product/:id', async (req, res) => {
    const re = await productModel.find({ _id: req.params.id })
    res.json(re);
})


app.put("/product", async (req, res) => {
    const re = await productModel.findOneAndUpdate(
        { _id: req.body.subcategoryid },
        {
            productname: req.body.productname,
        }
    );
    res.send({ msg: "record update" });
});

app.delete('/product/:id', async (req, res) => {
    const re = await productModel.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "record deleted" })

})


// register
app.post('/register', async (req, res) => {
    const User = new user(req.body);
    await User.save().then(() => console.log("registration successufully completed"));
    res.json({ msg: "data send" })
})

//login
app.patch('/register', async (req, res) => {
    const re = await user.find({ name: req.body.username, password: req.body.password });
    if (re.length > 0) {
        res.send({ msg: "valid user" })
    }
    else res.send({ msg: "invalid user" });
});
// customer
app.post('/customer/register', async (req, res) => {
    const Customer = new CustomerModel(req.body);
    await Customer.save().then(() => console.log("customer registration successufully completed"));
    res.json({ msg: "register successfull" })
})
app.patch('/customer/register', async (req, res) => {
    const re = await CustomerModel.find({ name: req.body.username, password: req.body.password });
    if (re.length > 0) {
        res.send({ msg: "valid user" })
    }
    else res.send({ msg: "invalid user" });
});
//card
app.post('/carddata',
    async (req, res) => {
        const re = await CardModel.find({ pid: req.body.pid })
        if (re.length > 0) {
            var qty = (parseInt(re[0].quantity) + 1) + "";


            await CardModel.findOneAndUpdate({ username: req.body.username, pid: req.body.pid }, { quantity: qty })
            res.json(re)

        }
        else {
            const card = new CardModel(req.body);
            await card.save().then(() => console.log("card save"));
            res.json({ msg: "card save successfully" })
        }
    })
app.patch('/carddata', async (req, res) => {
    const re = await CardModel.find({ username: req.body.username });
    res.json(re)
});
app.put('/carddata', async (req, res) => {
    var op = req.body.op;
    let qty = req.body.qty;
    if (op === "plus") {
        qty++;
    }
    else {
        qty--;
    }
    if (qty == 0) {
        const re = await CardModel.findOneAndDelete({ _id: req.body.pid });
    }
    await CardModel.findOneAndUpdate({ _id: req.body.pid }, { quantity: qty });
});
app.delete('/carddata', async (req, res) => {
    const re = await CardModel.findOneAndDelete({ pid: req.body.pid });
    res.json({ msg: "record deleted" })
})
app.post('/userorder', async (req, res) => {
    const ordermodel = new userordermodel({ ...req.body });
    await ordermodel.save().then(() => console.log("order would be  save"));
    res.json({ msg: "Order placed" })
    const re = await CardModel.find({ username: req.body.username });

    for (let i = 0; i < re.length; i++) {
        var model1 = new orderdetailmodel({
            username: req.body.name, productname: re[i].productname, productpic: re[i].productpic, price: re[i].offerprice, orderno: re[i]._id, quantity: re[i].quantity
        })
        await model1.save();
    }
    await CardModel.deleteMany({ username: req.body.username });

})

app.get('/userorder', async (req, res) => {
    const re = await userordermodel.find()
    res.json(re);
})
app.get('/userorder/:name', async (req, res) => {
    const re = await userordermodel.find({ username: req.params.name })
    res.json(re);
})
app.patch('/userorder', async (req, res) => {
    const re = await orderdetailmodel.find({ username: req.body.username })
    res.json(re);
})

app.listen(7000, () => {
    console.log("backend started");
});
