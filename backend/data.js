import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('Admin'),
            isAdmin:true
        },
        {
            name: 'Aviv',
            email: 'avivbarel1998@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin:false
        }
    ],
    products: [

        {
            name: "iPhone 13 pro max 256gb",
            slug: "iphone-13-pro-max",
            image: "/images/iphone-13-pro-max.jpg",
            description: "Iphone 13 pro max 256gb best iphone ever",
            price: 990,
            countInStock: 0,
            rating: 1,
            numReviews: 10,
        },
        {
            name: "iPhone 13 64gb",
            slug: "iphone-13",
            image: "/images/iphone-13.jpg",
            description: "Iphone 13with smaller screen",
            price: 700,
            countInStock: 12,
            rating: 2.5,
            numReviews: 15,
        },
        {
            name: "iPad pro 12.9 inch",
            slug: "ipad-pro-12-9",
            image: "/images/ipad-pro-12-9.jpg",
            description: "huge screen for an ipad ",
            price: 1200,
            countInStock: 5,
            rating: 4.5,
            numReviews: 8,
        },
        {
            name: "macbook pro 14 inch",
            slug: "macbook-pro-13",
            image: "/images/macbook-pro-14.jpg",
            description: "macbook pro with retina display",
            price: 2000,
            countInStock: 15,
            rating: 5,
            numReviews: 6,
        },
        {
            name: "airpods pro",
            slug: "airpods-pro",
            image: "/images/airpods-pro.jpg",
            description: "airpods pro best earphones",
            price: 200,
            countInStock: 5,
            rating: 3.5,
            numReviews: 4,
        },
    ]
}
export default data