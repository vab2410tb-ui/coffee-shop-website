import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faMap, faPhoneVolume} from "@fortawesome/free-solid-svg-icons";

import contact from "./contact.module.scss"

const ContactPage = () => {
    return (
        <div className={contact.container}>
            <h1>CONTACT</h1>

            <div className={contact.info}>
                <ul>
                    <li> 
                        <p> <FontAwesomeIcon icon={faEnvelope} style={{marginRight: '20px'}} /> Address: N1 (Street), Trang Dai Ward, Dong Nai, Viet Nam.</p>
                    </li>

                    <li> 
                        <p> <FontAwesomeIcon icon={faMap} style={{marginRight: '20px'}}/>Hotline: 1900.393.979 </p>
                    </li>

                    <li> 
                        <p> <FontAwesomeIcon icon={faPhoneVolume} style={{marginRight: '20px'}}/>Email: nabcfshop@gmail.com</p>
                    </li>
                </ul>
            </div>

            <div className={contact.input}>
                <div style={{marginInline: '60px'}}>
                    <h3>CONTACT</h3>
                    <p>Please fill in the required information so that we can best assist you.</p>
                    <div style={{display:'flex', flexDirection:'column', gap: '10px'}}>
                        <input style={{height: '60px'}} type="text" placeholder="Full Name:" />
                        <input style={{height: '60px'}} type="text" placeholder="Email:" />
                        <textarea style={{height: '200px'}} type="text" placeholder="Content:" />
                    </div>
                </div>
                <button>SEND</button>
            </div>

        </div>

    );
}

export default ContactPage;