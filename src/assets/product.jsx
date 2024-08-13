const products = [
    {
        id: 1,
        name: 'Dell Inspiron 15',
        description: 'A powerful and reliable laptop with Intel i5 processor.',
        price: 599.99,
        image: 'https://images.jdmagicbox.com/quickquotes/images_main/dell-laptops-11-06-2021-002-227393979-p9c7w.jpg',
        specifications: 'Processor: Intel i5, RAM: 8GB, Storage: 256GB SSD, Screen Size: 15.6 inches',
        reviews: ['Great performance!', 'Value for money.', 'Highly recommend.']
    },
    {
        id: 2,
        name: 'Logitech MX Keys',
        description: 'A sleek and comfortable keyboard with backlit keys.',
        price: 99.99,
        image: 'https://rukminim2.flixcart.com/image/850/1000/l5jxt3k0/keyboard/multi-device-keyboard/j/7/x/mx-keys-mechanical-logitech-original-imagg7ftgwqk3zc3.jpeg?q=90&crop=false',
        specifications: 'Connectivity: Bluetooth, Battery Life: 10 days, Backlight: Yes, Layout: Full size',
        reviews: ['Typing feels great!', 'Solid build quality.', 'Perfect for long hours.']
    },
    {
        id: 3,
        name: 'Samsung Galaxy S21',
        description: 'Experience the next-gen smartphone with the Samsung Galaxy S21.',
        price: 799.99,
        image: 'https://m.media-amazon.com/images/I/81cHpJNr07L._AC_UF1000,1000_QL80_.jpg',
        specifications: 'Processor: Exynos 2100, RAM: 8GB, Storage: 128GB, Camera: 64MP Triple Camera',
        reviews: ['Amazing camera quality.', 'Super fast performance.', 'Worth every penny.']
    },
    {
        id: 4,
        name: 'Nike Air Max 270',
        description: 'Comfortable and stylish sneakers for everyday wear.',
        price: 150.00,
        image: 'https://images-cdn.ubuy.co.in/65443263206eb4663030bdff-nike-unisex-air-max-270-g-road-running.jpg',
        specifications: 'Color: Black/White, Size: Various, Material: Mesh/Synthetic, Sole: Air Max',
        reviews: ['Very comfortable!', 'Looks great.', 'Perfect for running.']
    },
    {
        id: 5,
        name: 'Le Creuset Dutch Oven',
        description: 'A versatile and durable Dutch oven for all your cooking needs.',
        price: 350.00,
        image: 'https://images-cdn.ubuy.co.in/633abe50ccd7461db77e793e-le-creuset-enameled-cast-iron-signature.jpg',
        specifications: 'Material: Cast Iron, Capacity: 5.5 qt, Color: Cherry Red, Oven Safe: Yes',
        reviews: ['Cooks evenly.', 'Beautiful design.', 'High quality.']
    },
    {
        id: 6,
        name: 'Sony WH-1000XM4',
        description: 'Industry-leading noise-cancelling headphones with superior sound quality.',
        price: 349.99,
        image: 'https://m.media-amazon.com/images/I/31JulV2yBjL._AC_.jpg',
        specifications: 'Noise Cancellation: Yes, Battery Life: 30 hours, Connectivity: Bluetooth, Weight: 254g',
        reviews: ['Unmatched noise cancellation.', 'Excellent sound quality.', 'Very comfortable.']
    },
    {
        id: 7,
        name: 'KitchenAid Stand Mixer',
        description: 'A powerful and versatile stand mixer for your kitchen.',
        price: 429.99,
        image: 'https://www.kitchenaid.in/is/image/content/dam/global/kitchenaid/countertop-appliance/portable/images/hero-KSM150PSER.tif?id=W22mx1&fmt=jpg&dpr=off&fit=constrain,1&wid=300&hei=291',
        specifications: 'Power: 325W, Capacity: 5 qt, Color: Empire Red, Attachments: Dough Hook, Whisk',
        reviews: ['Makes baking easy!', 'Sturdy and reliable.', 'A must-have for bakers.']
    },
    {
        id: 8,
        name: 'Adidas Ultraboost 21',
        description: 'High-performance running shoes with responsive cushioning.',
        price: 180.00,
        image: 'https://rukminim2.flixcart.com/image/850/1000/kl175ow0/shoe/k/r/r/8-kyq93-adidas-ftwwht-cblack-syello-original-imagy8qyhry73tyk.jpeg?q=90&crop=false',
        specifications: 'Color: Core Black/White, Size: Various, Material: Primeknit, Cushioning: Boost',
        reviews: ['Extremely comfortable.', 'Great for long runs.', 'Highly durable.']
    },
    {
        id: 9,
        name: 'HP Envy 13',
        description: 'A sleek and portable laptop with powerful performance.',
        price: 899.99,
        image: 'https://images-cdn.ubuy.co.in/65214f96e30f9d21000945a2-hp-envy-13-3-4k-ultra-hd-touch-screen.jpg',
        specifications: 'Processor: Intel i7, RAM: 16GB, Storage: 512GB SSD, Screen Size: 13.3 inches',
        reviews: ['Super lightweight.', 'Fast and responsive.', 'Excellent build quality.']
    },
    {
        id: 10,
        name: 'Canon EOS R6',
        description: 'A high-performance mirrorless camera with advanced features.',
        price: 2499.99,
        image: 'https://x.imastudent.com/content/0040770_canon-eos-r6-mark-ii-mirrorless-camera-with-24-105mm-f4-l-is-usm-lens_500.jpeg',
        specifications: 'Sensor: Full Frame 20MP, Video: 4K 60fps, Connectivity: Wi-Fi, Battery Life: 510 shots',
        reviews: ['Incredible image quality.', 'Fast autofocus.', 'Perfect for professionals.']
    }
];
export default products;  