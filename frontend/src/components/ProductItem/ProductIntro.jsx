
const ProductIntro = ({productDetail, products}) => {
    const EssentialFeatures = () => {
        if (!products.description?.essentialFeatures?.length) return null;
        return (
            <div>
                <h2 style={{marginBottom: '125px'}}>Essential features</h2>
                <div className={productDetail.essentialGrid}>
                    {products.description?.essentialFeatures?.map((feature, index) => (
                        <div key={index} className={productDetail.essentialItem}>
                            <h2>{feature.title}</h2>
                            <p>{feature.content}</p>
                        </div>
                    ))}
                </div>
            </div>
                    
        )
    }

    return (
        <div className={productDetail.introProduct}>
            {(products.category === 'espresso-machine' || products.category === 'grinder-machine' || products.category === 'accessories' ) && (
                <div>
                    <h2>{products.description?.introText?.[0].title}</h2>
                    <p style={{textAlign: 'justify', textIndent: '3em'}}>{products.description?.introText?.[0].content}</p>
                    <img src={products.lifestyleImages?.[0]} alt="" style={{ width:'1905px', margin: '130px 0 130px -110px'}}/>
                    {products.description?.highlightFeatures?.map((feature, index) => (
                        <div key={index} className={productDetail.featureItem}>
                            <h2>{feature.title}</h2>
                            <p style={{marginBottom: '85px'}}>{feature.content}</p>
                        </div>
                    ))}
                    
                    {products.lifestyleImages?.length === 4 && (
                        <div>
                            <div style={{display: 'flex', gap: '45px', padding: '45px 0 130px 0'}}> 
                                <img src={products.lifestyleImages?.[1]} alt="" />
                                <img src={products.lifestyleImages?.[2]} alt="" />
                            </div>
                            {EssentialFeatures()}
                            <img src={products.lifestyleImages?.[3]} alt="" style={{marginLeft:'-110px', width:'1905px'}}/>
                        </div>
                    )}
                    {products.lifestyleImages?.length === 5 && (
                        products.category === 'grinder-machine' ? (
                            <div>
                                <div style={{ display: 'flex',padding:'45px 0 130px 0', gap: '45px' }}>
                                    <img src={products.lifestyleImages?.[1]} alt="" />
                                    <img src={products.lifestyleImages?.[2]} alt="" />
                                    <img src={products.lifestyleImages?.[3]} alt="" />
                                </div>
                                {EssentialFeatures()}
                                <img src={products.lifestyleImages?.[4]} alt="" style={{ marginLeft:'-110px', width:'1905px' }} />
                            </div>
                        ) : (
                            <div>
                                <div style={{ display: 'grid', gap:'45px', padding:'45px 0 130px 0', gridTemplateColumns:'1fr 1fr' }}>
                                    <img src={products.lifestyleImages?.[1]} alt="" />
                                    <img src={products.lifestyleImages?.[2]} alt="" />
                                    <img src={products.lifestyleImages?.[3]} alt="" />
                                </div>
                                {EssentialFeatures()}
                                <img src={products.lifestyleImages?.[4]} alt="" style={{ marginLeft:'-110px', width:'1905px' }} />
                            </div>
                        )
                    )}

                    {products.lifestyleImages?.length === 6 && (
                        <div>
                            <div style={{display: 'grid', gap: '45px', padding: '45px 0 130px 0', gridTemplateColumns: '1fr 1fr'}}> 
                                <img src={products.lifestyleImages?.[1]} alt="" />
                                <img src={products.lifestyleImages?.[2]} alt="" />
                                <img src={products.lifestyleImages?.[3]} alt="" />
                                <img src={products.lifestyleImages?.[4]} alt="" />
                            </div>
                            {EssentialFeatures()}
                            <img src={products.lifestyleImages?.[5]} alt="" style={{marginLeft:'-110px', width:'1905px'}}/>
                        </div>
                    )}

                    {products.lifestyleImages?.length === 7 && (
                        <div>
                            <div style={{display: 'grid', gap: '45px', padding: '45px 0 50px 0', gridTemplateColumns: '1fr 1fr'}}> 
                                <img src={products.lifestyleImages?.[1]} alt="" />
                                <img src={products.lifestyleImages?.[2]} alt="" />
                            </div>
                            <div style={{display: 'flex', gap: '25px'}}>
                                <img src={products.lifestyleImages?.[3]} alt="" />
                                <img src={products.lifestyleImages?.[4]} alt="" />
                                <img src={products.lifestyleImages?.[5]} alt="" />
                            </div>
                            {EssentialFeatures()}
                            <img src={products.lifestyleImages?.[6]} alt="" style={{marginLeft:'-110px', width:'1905px'}}/>
                        </div>
                    )}

                </div>
            )}

        </div>
    );  
}

export default ProductIntro;