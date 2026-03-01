import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ProductAccordion = ({ products, productDetail }) => {
    // Lưu trữ danh sách các tab đang mở trong một mảng
    const [activeTabs, setActiveTabs] = useState([]);

    const toggleTab = (tabName) => {
        setActiveTabs((prevTabs) =>
            prevTabs.includes(tabName)
                ? prevTabs.filter((t) => t !== tabName) // Nếu đang mở thì đóng lại
                : [...prevTabs, tabName]               // Nếu đang đóng thì mở thêm
        );
    };
    return (
        <div>
            {products.category === "coffee-beans" ? null : (
            <div className={productDetail.techspecs}>
               
                <div className={productDetail.techspecs}>
                    <div className={productDetail.titleTech} onClick={() => toggleTab('techspecs')}>
                        <h3 style={{marginLeft: '45px', fontSize: '24px'}}>
                            Technical Specifications
                        </h3>
                        <span ><FontAwesomeIcon icon={faAngleDown} style={{marginRight: '25px', fontSize:'30px', transform: activeTabs === 'techspecs' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}} /></span>
                    </div>
                    
                    {products.category === "espresso-machine" &&  (
                    <div  className={`${productDetail.accordion_content} ${activeTabs.includes("techspecs") ? productDetail.show : ""}`}>
                        <div className={productDetail.accordion_inner}>
                            <table >
                                <tbody>
                                    <tr>
                                        <th> <label>Origin:</label> </th>
                                        <td>{products.techSpecs?.origin}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>H-W-D:</label> </th>
                                        <td>{products.techSpecs?.dimensions}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Material:</label> </th>
                                        <td>{products.techSpecs?.material}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Weight:</label> </th>
                                        <td>{products.techSpecs?.weight}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Voltage:</label> </th>
                                        <td>{products.techSpecs?.voltage}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Amperage:</label> </th>
                                        <td>{products.techSpecs?.amperage}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Element Wattage:</label> </th>
                                        <td>{products.techSpecs?.wattage}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Coffee Boiler:</label> </th>
                                        <td>{products.techSpecs?.coffeeBoiler}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Steam Boiler:</label> </th>
                                        <td>{products.techSpecs?.steamBoiler}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {products.category === "grinder-machine" &&  (
                    <div  className={`${productDetail.accordion_content} ${activeTabs.includes("techspecs") ? productDetail.show : ""}`}>
                        <div className={productDetail.accordion_inner}>
                            <table >
                                <tbody>
                                    <tr>
                                        <th> <label>Burrs:</label> </th>
                                        <td>{products.techSpecs?.burrs}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Hopper Capacity:</label> </th>
                                        <td>{products.techSpecs?.hopperCapacity}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>H-W-D:</label> </th>
                                        <td>{products.techSpecs?.dimensions}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Weight:</label> </th>
                                        <td>{products.techSpecs?.weight}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Grind Adjustment:</label> </th>
                                        <td>{products.techSpecs?.grindAdjustment}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Grinding Speed (rpm):</label> </th>
                                        <td>{products.techSpecs?.grindingSpeed}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Programmable Dose:</label> </th>
                                        <td>{products.techSpecs?.programmableDose ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Electrical Specifications (Single Phase):</label> </th>
                                        <td>{products.techSpecs?.voltage}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Element Wattage:</label> </th>
                                        <td>{products.techSpecs?.wattage}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {products.category === "accessories" &&  (
                    <div  className={`${productDetail.accordion_content} ${activeTabs.includes("techspecs") ? productDetail.show : ""}`}>
                        <div className={productDetail.accordion_inner}>
                            <table >
                                <tbody>
                                    <tr>
                                        <th> <label>Diameter:</label> </th>
                                        <td>{products.techSpecs?.diameter}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Materials:</label> </th>
                                        <td>{products.techSpecs?.material}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Distribution Side Maximum Depth:</label> </th>
                                        <td>{products.techSpecs?.distributionSideMaximumDepth}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Tamper Side Maximum Depth:</label> </th>
                                        <td>{products.techSpecs?.tamperSideMaximumDepth}</td>
                                    </tr>
                                    <tr>
                                        <th> <label>Approximate Weight:</label> </th>
                                        <td>{products.techSpecs?.ApproximateWeight}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {/* ======= Installation & pickup Instructions ======= */}
                    <div className={productDetail.titleTech} onClick={() => toggleTab('usage')} style={{backgroundColor: '#f2f2f2', marginBottom: '-10px'}}>
                        <h3>
                            Installation & Usage Instructions
                        </h3>
                        <span ><FontAwesomeIcon icon={faAngleDown} style={{marginRight: '25px', fontSize:'30px', transform: activeTabs === 'usage' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}} /></span>
                    </div>
                    <div  className={`${productDetail.accordion_content} ${activeTabs.includes("usage") ? productDetail.show : ""}`}>
                        <div className={productDetail.accordion_inner}>
                            <div style={{backgroundColor: '#f2f2f2', paddingTop: '20px', borderRadius: '0 0 20px 20px'}}>
                                <ul style={{ marginInline: '50px'}}>
                                    <li style={{marginTop: '30px', fontSize:'20px'}}>Download the product's user and installation manual file here - Download.</li>
                                    <li style={{marginTop: '10px', marginBottom: '40px',  fontSize:'20px' }}>If you still have questions about the product, please visit Help Desk for more details.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* ======= Pick up Time ======= */}
                    <div className={productDetail.titleTech} onClick={() => toggleTab('pickup')} style={{backgroundColor: '#f2f2f2', marginBottom: '-10px', marginTop: '20px'}}>
                        <h3>
                            Pick-up Time
                        </h3>
                        <span ><FontAwesomeIcon icon={faAngleDown} style={{marginRight: '25px', fontSize:'30px', transform: activeTabs === 'pickup' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}} /></span>
                    </div>
                    <div  className={`${productDetail.accordion_content} ${activeTabs.includes("pickup") ? productDetail.show : ""}`}>
                        <div className={productDetail.accordion_inner}>
                            <div style={{backgroundColor: '#f2f2f2', paddingTop: '20px', borderRadius: '0 0 20px 20px'}}>
                                <ul style={{ marginInline: '50px'}}>
                                    <li style={{marginTop: '30px', fontSize:'20px'}}>Inner City of Bien Hoa: Delivery in 1-2 working days.</li>
                                    <li style={{marginTop: '10px', fontSize:'20px' }}>Suburban and other provinces: Delivery in 3-5 working days.</li>
                                    <li style={{marginTop: '10px', marginBottom: '40px',  fontSize:'20px' }}>Other information: Please contact us or visit Delivery Policy.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* ======= Policy ======= */}
                    <div className={productDetail.titleTech} onClick={() => toggleTab('policy')} style={{backgroundColor: '#f2f2f2', marginBottom: '-10px', marginTop: '20px'}}>
                        <h3>
                            Policy
                        </h3>
                        <span ><FontAwesomeIcon icon={faAngleDown} style={{marginRight: '25px', fontSize:'30px', transform: activeTabs === 'policy' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}} /></span>
                    </div>
                    <div  className={`${productDetail.accordion_content} ${activeTabs.includes("policy") ? productDetail.show : ""}`}>
                        <div className={productDetail.accordion_inner}>
                            <div style={{backgroundColor: '#f2f2f2', paddingTop: '20px', borderRadius: '0 0 20px 20px'}}>
                                <ul style={{ marginInline: '50px'}}>
                                    <li style={{marginTop: '30px', fontSize:'20px'}}>Allow customers to exchange/return within 3 days of receipt if they are not satisfied or the product is not as expected.</li>
                                    <li style={{marginTop: '10px', fontSize:'20px' }}>Depending on the applicable conditions, guests can refund or exchange to another product at no cost.</li>
                                    <li style={{marginTop: '10px', marginBottom: '40px',  fontSize:'20px' }}>Please visit NABcoffeeshop Easy for more details.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
       
        
    );
}

export default ProductAccordion;