import User from '../models/user.modal.js';
import jwt from 'jsonwebtoken';

// ------------- [GỬI MÃ OTP QUA EMAILJS] ------------- 
export const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Tạo mã OTP 6 số ngẫu nhiên dưới dạng chuỗi (String)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, otp, otpExpires });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
        }
        await user.save();

        // GỌI API EMAILJS 
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: process.env.EMAILJS_SERVICE_ID,
                template_id: process.env.EMAILJS_OTP_TEMPLATE_ID, 
                user_id: process.env.EMAILJS_PUBLIC_KEY,
                accessToken: process.env.EMAILJS_PRIVATE_KEY,
                template_params: {
                    to_email: email,
                    otp_code: otp 
                }
            })
        });

        if (response.ok) {
            res.status(200).json({ message: 'The OTP has been sent to your email!' });
        } else {
            const errorText = await response.text();
            throw new Error(`EmailJS Error: ${errorText}`);
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ------------- [XÁC THỰC OTP] ------------- 
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        
        // Ép kiểu String(otp) để tránh lỗi 400 do khác kiểu dữ liệu (số vs chữ)
        if (!user || user.otp !== String(otp)) {
            return res.status(400).json({ message: 'Invalid OTP code' });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'The OTP has expired' });
        }

        // Xóa OTP sau khi dùng
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,       
                email: user.email,     
                phone: user.phone,     
                address: user.address, 
                role: user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            
            if (req.body.email && req.body.email !== user.email) {
                const emailExists = await User.findOne({ email: req.body.email });
                if (emailExists) {
                    return res.status(400).json({ message: 'This email is already used by another account!' });
                }
                user.email = req.body.email;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role,
                token: req.headers.authorization.split(' ')[1], 
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};