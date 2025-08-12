package com.furniture.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furniture.dto.PaymentRequestDto;
import com.furniture.entity.Payment;
import com.furniture.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class RazorpayController {

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private PaymentService paymentService;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentRequestDto paymentRequest) throws RazorpayException {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", paymentRequest.getAmount() * 100); // amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "rental_receipt_" + System.currentTimeMillis());

        Order order = razorpayClient.orders.create(orderRequest);
        String orderId = order.get("id");

        // Save a Payment record with status PENDING
        Payment payment = new Payment();
        payment.setRazorpayOrderId(orderId);
        payment.setAmountPaid(paymentRequest.getAmount());
        payment.setStatus("PENDING");
        paymentService.savePayment(payment);

        Map<String, String> response = new HashMap<>();
        response.put("orderId", orderId);
        response.put("key", razorpayKeyId);

        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Payment verificationRequest) {
        String orderId = verificationRequest.getRazorpayOrderId();
        String paymentId = verificationRequest.getRazorpayPaymentId();
        String signature = verificationRequest.getRazorpaySignature();

        boolean isSignatureValid = paymentService.verifySignature(orderId, paymentId, signature);

        if (isSignatureValid) {
            // Update payment status in your database
            paymentService.updatePaymentStatus(orderId, "SUCCESS");
            return ResponseEntity.ok("Payment verified successfully");
        } else {
            paymentService.updatePaymentStatus(orderId, "FAILURE");
            return ResponseEntity.badRequest().body("Payment verification failed");
        }
    }
}