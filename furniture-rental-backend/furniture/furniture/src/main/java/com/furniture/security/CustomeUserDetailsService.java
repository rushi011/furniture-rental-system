package com.furniture.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furniture.dao.AuthenticationDao;
import com.furniture.entity.Auth;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomeUserDetailsService implements UserDetailsService {

	private final AuthenticationDao authenticationDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Auth user = authenticationDao.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid Email!!"));
		return new CustomUserDetails(user);
	}

}
