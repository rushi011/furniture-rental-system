package com.furniture.service;

import org.json.JSONObject; // <-- IMPORTANT: Make sure this import is present
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furniture.dao.PaymentDao;
import com.furniture.entity.Payment;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentDao paymentRepository;

    @Value("${razorpay.key.secret}")
    private String secret;

    @Override
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        try {
            // STEP 1: GATHER THE ARGUMENTS INTO A JSON OBJECT
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);

            // STEP 2: CALL THE METHOD WITH THE CORRECT ARGUMENTS (JSONObject, String)
            return Utils.verifyPaymentSignature(options, secret);

        } catch (RazorpayException e) {
            // Log the exception for debugging
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void updatePaymentStatus(String orderId, String status) {
        Payment payment = paymentRepository.findByRazorpayOrderId(orderId);
        if (payment != null) {
            payment.setStatus(status);
            paymentRepository.save(payment);
        }
    }
}