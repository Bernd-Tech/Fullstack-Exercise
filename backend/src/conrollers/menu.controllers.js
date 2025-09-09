export const getMenuItem = (req, res) => {
    res.status(200).send({
        name: "Udon Curry Soup", 
        price: 12,
        spiceLevel: "middle",
        customerRating: 10
    });
}

const allMenuItems = [{
    name: "Udon Curry Soup", 
    price: 12,
    spiceLevel: "middle",
    customerRating: 10
},
{
    name: "Karaage", 
    price: 11,
    spiceLevel: "high",
    customerRating: 9.5
},
{
    name: "Takoyaki", 
    price: 9,
    spiceLevel: "low",
    customerRating: 6
}
]

export const getAllMenuItems = (req, res) => {
    res.status(200).send(allMenuItems)
}