package com.furniture.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component // a spring bean that can be injected in other spring beans , as dependency
@AllArgsConstructor
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String jwt = authHeader.substring(7); // Extract token

			// 🔍 Check if JWT is in valid format (has 2 dots)
			if (jwt.split("\\.").length == 3) {
				try {
					Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(jwt);
					SecurityContextHolder.getContext().setAuthentication(authentication);
					System.out.println("Saved auth token in Spring Security context.");
				} catch (Exception e) {
					System.err.println("JWT parsing failed: " + e.getMessage());
					// Optionally, you can clear the context or stop the filter chain here
				}
			} else {
				System.err.println("Invalid JWT format: " + jwt);
				// Optional: reject the request
				// response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT
				// format");
				// return;
			}
		}

		filterChain.doFilter(request, response); // continue the chain
	}

}
