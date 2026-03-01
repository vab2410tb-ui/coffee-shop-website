import warranty from './warranty.module.scss'
const WarrantyPage = () => {
    return (
        <div className={warranty.container}>
            <h1>WARRANTY POLICY</h1>
            <p>At NabCoffeeShop, we pride ourselves on offering office furniture and peripherals that are designed and manufactured to the highest standards, to optimize your workspace. We are committed to replacing or repairing faulty products during the warranty period, with a period of up to 5 years for some product lines – ensuring peace of mind throughout use.</p>
            {/* POLICY 1 */}
            <div>
                <h2>
                    1. Scope of warranty application
                </h2>
                <ul>
                    <li style={{ textIndent: '2em'}}>1.1.  The warranty policy is only valid in the territory of Vietnam. Products used outside of this area will not be covered by the warranty.</li>
                    <li style={{ textIndent: '2em'}}>1.2.  The warranty applies to purchases made directly from NabCoffee or an authorized dealer, provided proof of purchase (invoice, warranty card) is provided.</li>
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

            {/* POLICY 2 */}
            <div>
                <h2>
                    2. Warranty Conditions
                </h2>
                <ul>
                    <li style={{ textIndent: '2em'}}>2.1. Customers need to notify the damage within 7 days of receiving the product, accompanied by an image or video sent to NabCoffeeShop via official support channels.</li>
                    <li style={{ textIndent: '2em'}}>2.2. The product must be used in accordance with NabCoffee's user manual to ensure warranty benefits.</li>
                    <li style={{ marginLeft: '2em'}}>2.3. The warranty applies to defects arising from manufacturing or substandard materials, including:
                        <ul style={{listStyle:'disc', marginTop: '10px'}}>
                            <li>Technical failure of the table frame, motor, or controller.</li>
                            <li>Cracks, breaks, or machining errors on countertops, chairs, or other components.</li>
                            <li>Product structural failure due to manufacturing defects.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* POLICY 3 */}
            <div>
                <h2>
                    3. Cases not covered by the warranty
                </h2>
                <ul>
                    <li>The NabCoffeeShop warranty does not cover the following:</li>
                    <li>Natural wear and tear:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Slight scratches, fading, or ruffling of fabric hair due to daily use.</li>
                            <li>Changes in color or surface texture due to exposure to sunlight, high temperatures, or natural aging (especially with upholstery, mesh, and cushions).</li>
                        </ul>
                    </li>
                    <li>Misuse:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Damage caused by exceeding the rated load of the product (e.g., placing an excessive weight on a table or stand).</li>
                            <li>Damage caused by installation not in accordance with the instructions, unless performed by NabCoffee or an authorized partner.</li>
                        </ul>
                    </li>
                    <li>External Impact:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Damage caused by impact, drop, or accident.</li>
                            <li>Damage caused by use in an unsuitable environment (e.g., outdoor, warehousing, high humidity).</li>
                        </ul>
                    </li>
                    <li>Arbitrarily intervene:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Damage caused by arbitrary disassembly, repair, or alteration of the product structure.</li>
                            <li>Damage caused by the use of non-genuine accessories from NabCoffeeShop.</li>
                        </ul>
                    </li>
                    <li>Force majeure factors:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Damage caused by natural disasters (floods, fires), insects, or rodents.</li>
                        </ul>
                    </li>
                    <li>Chemical Damage:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Use of cleaning chemicals (alcohol, bleach, etc.) that damages the surface finish.</li>
                        </ul>
                    </li>
                    <li>Natural Properties:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Differences in wood grain or natural material texture are not considered manufacturing defects.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* POLICY 4 */}
            <div>
                <h2>
                    4. Warranty Process
                </h2>
                <div>
                    <li style={{ marginLeft: '2em'}}>
                        <ul style={{listStyle:'disc', marginTop: '10px'}}>
                            <li>Contact NabCoffeeShop via Website/Form/Zalo/Hotline when detecting damage.</li>
                            <li>Provide proof of purchase and images/videos illustrating product defects.</li>
                            <li>The NabCoffeeShop team will review and respond within [3-5 business days].</li>
                            <li>If approved, the product will be repaired or replaced free of charge under the warranty policy.</li>
                        </ul>
                    </li>
                </div>
            </div>

            {/* POLICY 5 */}
            <div>
                <h2>
                     5. Contact Support
                </h2>
                <ul>
                    <li > For any questions about the warranty policy or to request assistance, please contact us:
                        <ul style={{listStyle:'disc', marginTop: '10px', marginLeft: '2em'}}>
                            <li>Email: nabcfshop@gmail.com</li>
                            <li>Hotline: 1900.393.979</li>
                            <li>Address: N1 (Street), Trang Dai Ward, Dong Nai, Viet Nam.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WarrantyPage;