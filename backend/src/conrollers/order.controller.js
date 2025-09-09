export const createOrder = (req, res) => {
    // [{ udon, karaage, ramen }]
    const { items } = req.body;
    if (!items) {
        return res
        .status(404)
        .send({errorMessage: "No items found"})
    }

    const totalSum = items.reduce((acc, item) => acc + item.price, 0);

    // send a response back to the frontend
    res.status(201).send({
        msg: "Order successfully added",
        order: items,
        totalSum
    });
};