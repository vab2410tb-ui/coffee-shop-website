import warranty from './warranty.module.scss'
const WarrantyPage = () => {
    return (
        <div className={warranty.container}>
            <h1>WARRANTY POLICY</h1>
            <p>At NabCoffeeShop, we pride ourselves on offering office furniture and peripherals that are designed and manufactured to the highest standards, to optimize your workspace. We are committed to replacing or repairing faulty products during the warranty period, with a period of up to 5 years for some product lines – ensuring peace of mind throughout use.</p>
            <div>
                <h2>
                    1. Scope of warranty application
                </h2>
                <ul>
                    <li style={{ textIndent: '2em'}}>1.1.  The warranty policy is only valid in the territory of Vietnam. Products used outside of this area will not be covered by the warranty.</li>
                    <li style={{ textIndent: '2em'}}>1.2.  The warranty applies to purchases made directly from HyperWork or an authorized dealer, provided proof of purchase (invoice, warranty card) is provided.</li>
                    <li style={{ textIndent: '2em'}}>1.3.  If the product was purchased from a third party, e-commerce platform (e.g., Shopee, Lazada), or an unauthorized seller, please contact the seller directly for assistance.</li>
                    <li style={{ marginLeft: '2em'}}>1.4.  The warranty will be void if:
                        <ul style={{listStyle:'disc', marginTop: '10px'}}>
                            <li>The original parts of the product are replaced.</li>
                            <li>The product is used with non-original accessories or equipment from NabCoffee.</li>
                            <li>The product is shipped outside Vietnam through a third-party service.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div>
                <h2>
                    2. Warranty Conditions
                </h2>
                <ul>
                    <li style={{ textIndent: '2em'}}>2.1. Customers need to notify the damage within 7 days of receiving the product, accompanied by an image or video sent to NabCoffeeShop via official support channels.</li>
                    <li style={{ textIndent: '2em'}}>2.2. The product must be used in accordance with HyperWork's user manual to ensure warranty benefits.</li>
                    <li style={{ marginLeft: '2em'}}>2.3. The warranty applies to defects arising from manufacturing or substandard materials, including:
                        <ul style={{listStyle:'disc', marginTop: '10px'}}>
                            <li>Technical failure of the table frame, motor, or controller.</li>
                            <li>Cracks, breaks, or machining errors on countertops, chairs, or other components.</li>
                            <li>Product structural failure due to manufacturing defects.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WarrantyPage;