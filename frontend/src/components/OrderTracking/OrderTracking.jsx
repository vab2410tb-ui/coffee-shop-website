
const OrderTracking = ({orderDetail, srcorderstyle}) => {
    return (
        <div className={srcorderstyle.orderinf}>
          <h3>ORDER INFOMATION</h3>
          <p style={{ marginBottom: '10px' }}>
            Order ID: <strong>{orderDetail.orderId}</strong>
          </p>
          <p>
            Order status: <strong>{orderDetail.status}</strong>
          </p>
          <div className={srcorderstyle.infgr}>
            <div className={srcorderstyle.infgr_box}>
              <h4>CUSTOMER INFORMATION</h4>
              <div>
                <p>Full name: {orderDetail.shippingInfo?.fullName}</p>
                <p>Phone: {orderDetail.shippingInfo?.phone}</p>
                <p>Email: {orderDetail.shippingInfo?.email}</p>
                <p>Address: {orderDetail.shippingInfo?.address}</p>
              </div>
            </div>
            <div className={srcorderstyle.infgr_box}>
              <h4>DELIVERY INFORMATION</h4>
              <div>
                <p>Full name: {orderDetail.shippingInfo?.fullName}</p>
                <p>Phone: {orderDetail.shippingInfo?.phone}</p>
                <p>Email: {orderDetail.shippingInfo?.email}</p>
                <p>Address: {orderDetail.shippingInfo?.address}</p>
              </div>
            </div>
            <div className={srcorderstyle.infgr_box}>
              <h4>PRODUCT LIST ({orderDetail.orderItems.length})</h4>
              <div style={{ overflowY: 'scroll', maxHeight: '200px' }}>
                {orderDetail.orderItems &&
                  orderDetail.orderItems.map((item, index) => (
                    <div key={index} className={srcorderstyle.infgr_prlist}>
                      <img src={item.image} alt="" width={90} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span>{item.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>{item.color}</span>
                        <span>Price: {new Intl.NumberFormat('vi-VN').format(item.price)} VND</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={srcorderstyle.infgr_box}>
              <h4>PAYMENT</h4>
              <div>
                <p>
                  Order Value:{new Intl.NumberFormat('vi-VN').format(orderDetail.totalPrice)} VND
                </p>
                <p>Discounts: 0 VND</p>
                <p>Delivery Fee: 0 VND</p>
                <p style={{ fontSize: '20px' }}>
                  <strong>
                    Total Amount: {new Intl.NumberFormat('vi-VN').format(orderDetail.totalPrice)}{' '}
                    VND
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
    );
}

export default OrderTracking;